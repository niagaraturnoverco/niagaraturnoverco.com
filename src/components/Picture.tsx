import { CSSProperties } from "react";

export type PictureSource = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

type Props = {
  image: PictureSource;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  width?: number;
  height?: number;
};

export const Picture = ({
  image,
  alt,
  sizes = "100vw",
  className,
  style,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
  width,
  height,
}: Props) => {
  const sources = image.sources ?? {};
  // Prefer avif → webp → jpeg/png order; fall back srcSet uses last available.
  const orderedTypes = Object.keys(sources).sort((a, b) => {
    const rank = (t: string) =>
      t.includes("avif") ? 0 : t.includes("webp") ? 1 : 2;
    return rank(a) - rank(b);
  });
  const fallbackSrcSet =
    sources["image/jpeg"] || sources["image/png"] || sources["image/webp"];

  return (
    <picture>
      {orderedTypes
        .filter((t) => t !== "image/jpeg" && t !== "image/png")
        .map((type) => (
          <source key={type} type={type} srcSet={sources[type]} sizes={sizes} />
        ))}
      <img
        src={image.img.src}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        width={width ?? image.img.w}
        height={height ?? image.img.h}
        loading={loading}
        // @ts-expect-error fetchpriority is a valid HTML attribute; React types lag
        fetchpriority={fetchPriority}
        decoding={decoding}
        className={className}
        style={style}
      />
    </picture>
  );
};
