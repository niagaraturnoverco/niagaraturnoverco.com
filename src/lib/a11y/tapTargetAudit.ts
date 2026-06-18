/**
 * Dev-only accessibility audit: flags interactive elements whose
 * tap target falls below the 46×46 px minimum.
 *
 * Runs in development only. Output is printed to the browser console
 * as a collapsed group + table so it's easy to spot before deploy.
 *
 * Threshold is exported so it can be tuned in one place.
 */
export const TAP_TARGET_MIN_PX = 46;

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "[role='button']",
  "[role='link']",
  "[role='menuitem']",
  "[role='tab']",
  "input:not([type='hidden']):not([type='checkbox']):not([type='radio'])",
  "select",
  "textarea",
  "summary",
].join(",");

export type TapTargetIssue = {
  element: HTMLElement;
  label: string;
  width: number;
  height: number;
  selector: string;
};

const cssPath = (el: Element): string => {
  if (el.id) return `#${el.id}`;
  const parts: string[] = [];
  let node: Element | null = el;
  while (node && node.nodeType === 1 && parts.length < 4) {
    let part = node.tagName.toLowerCase();
    const cls = (node.getAttribute("class") || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join(".");
    if (cls) part += `.${cls}`;
    parts.unshift(part);
    node = node.parentElement;
  }
  return parts.join(" > ");
};

const isVisible = (el: HTMLElement): boolean => {
  if (!el.isConnected) return false;
  const cs = getComputedStyle(el);
  if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return false;
  if (el.offsetWidth === 0 || el.offsetHeight === 0) return false;
  return true;
};

const labelFor = (el: HTMLElement): string => {
  const aria = el.getAttribute("aria-label");
  if (aria) return aria.trim();
  const text = (el.textContent || "").trim().replace(/\s+/g, " ");
  if (text) return text.slice(0, 60);
  const title = el.getAttribute("title");
  if (title) return title.trim();
  return `<${el.tagName.toLowerCase()}>`;
};

export const auditTapTargets = (
  root: ParentNode = document,
  min = TAP_TARGET_MIN_PX,
): TapTargetIssue[] => {
  const issues: TapTargetIssue[] = [];
  const nodes = root.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR);
  nodes.forEach((el) => {
    if (!isVisible(el)) return;
    // Skip elements nested inside another interactive ancestor —
    // the outer element provides the real tap target.
    const ancestor = el.parentElement?.closest(INTERACTIVE_SELECTOR);
    if (ancestor && ancestor !== el) return;
    const rect = el.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (h < min || w < min) {
      issues.push({
        element: el,
        label: labelFor(el),
        width: w,
        height: h,
        selector: cssPath(el),
      });
    }
  });
  return issues;
};

let scheduled = false;
let lastFingerprint = "";

const report = () => {
  scheduled = false;
  const issues = auditTapTargets();
  const fingerprint = issues
    .map((i) => `${i.selector}:${i.width}x${i.height}`)
    .join("|");
  if (fingerprint === lastFingerprint) return;
  lastFingerprint = fingerprint;

  if (issues.length === 0) {
    // eslint-disable-next-line no-console
    console.info(
      `%c✓ a11y tap-target audit%c all interactive elements ≥ ${TAP_TARGET_MIN_PX}px`,
      "background:#1f7a3a;color:#fff;padding:2px 6px;border-radius:3px;font-weight:600",
      "color:inherit",
    );
    return;
  }

  /* eslint-disable no-console */
  console.groupCollapsed(
    `%c⚠ a11y tap-target audit%c ${issues.length} element${
      issues.length === 1 ? "" : "s"
    } under ${TAP_TARGET_MIN_PX}px — fix before deploy`,
    "background:#b8860b;color:#000;padding:2px 6px;border-radius:3px;font-weight:600",
    "color:inherit",
  );
  console.table(
    issues.map((i) => ({
      label: i.label,
      size: `${i.width}×${i.height}`,
      selector: i.selector,
    })),
  );
  issues.forEach((i) => {
    console.log(
      `%c${i.width}×${i.height}px %c${i.label}`,
      "color:#b8860b;font-weight:600",
      "color:inherit",
      i.element,
    );
  });
  console.groupEnd();
  /* eslint-enable no-console */
};

const schedule = () => {
  if (scheduled) return;
  scheduled = true;
  // Wait for layout to settle (post-route change, post-image load, etc.)
  window.setTimeout(report, 600);
};

/**
 * Install the dev-only audit. Safe to call multiple times — it
 * no-ops in production builds and self-debounces.
 */
export const installTapTargetAudit = (): (() => void) | void => {
  if (!import.meta.env.DEV) return;
  if (typeof window === "undefined") return;

  // Initial run after first paint
  if (document.readyState === "complete") {
    schedule();
  } else {
    window.addEventListener("load", schedule, { once: true });
  }

  // Re-audit on route changes (history API + back/forward)
  const origPush = history.pushState;
  const origReplace = history.replaceState;
  history.pushState = function (...args) {
    const r = origPush.apply(this, args);
    schedule();
    return r;
  };
  history.replaceState = function (...args) {
    const r = origReplace.apply(this, args);
    schedule();
    return r;
  };
  window.addEventListener("popstate", schedule);
  window.addEventListener("resize", schedule);

  // Re-audit when the DOM changes substantially
  const mo = new MutationObserver(() => schedule());
  mo.observe(document.body, { childList: true, subtree: true });

  // Expose a manual trigger for one-off checks from devtools
  (window as unknown as { __auditTapTargets?: typeof auditTapTargets }).__auditTapTargets =
    auditTapTargets;

  return () => {
    mo.disconnect();
    window.removeEventListener("popstate", schedule);
    window.removeEventListener("resize", schedule);
    history.pushState = origPush;
    history.replaceState = origReplace;
  };
};
