import { Outlet } from "react-router-dom";
import { ShieldCheck, Phone, ArrowRight } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

const SCHEDULING_URL =
  "https://airtable.com/app3bo82kH3gBbh7D/pagam8AZIIRd6Xqew/form";
const PHONE = "(289) 257-7725";
const PHONE_TEL = "tel:+12892577725";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Alert bar */}
          <div className="bg-gradient-gold text-primary-foreground text-xs sm:text-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              <span className="font-medium">
                Coverage is confirmed before scheduling. Urgent:{" "}
                <a href={PHONE_TEL} className="underline underline-offset-2 font-semibold">
                  {PHONE}
                </a>
              </span>
            </div>
          </div>

          {/* Header with trigger */}
          <header className="sticky top-0 z-40 h-14 flex items-center justify-between gap-4 border-b border-border/60 bg-background/85 px-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <span className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Niagara Region Property Readiness
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={PHONE_TEL}
                className="hidden sm:inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 text-xs font-semibold"
              >
                <Phone className="h-3.5 w-3.5" /> {PHONE}
              </a>
              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-semibold text-primary-foreground shadow-gold border border-primary/30"
              >
                Schedule <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </header>

          <main className="flex-1 pb-24 md:pb-0">
            <Outlet />
          </main>

          {/* Sticky mobile call/quote bar */}
          <div className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom border-t border-border/80 bg-background/95 backdrop-blur">
            <div className="grid grid-cols-5 gap-2 p-2.5">
              <a
                href={PHONE_TEL}
                className="col-span-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-gold px-4 text-sm font-semibold text-primary-foreground shadow-gold border border-primary/30"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
              <a
                href={SCHEDULING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border-2 border-primary/60 bg-primary/10 px-2 text-sm font-semibold leading-tight"
              >
                Get a Quote <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
