import { CSSProperties } from "react";

export type PictureSource = {
  sources: {
    avif?: { src: string; w: number; h: number }[];
    webp?: { src: string; w: number; h: number }[];
    jpg?: { src: string; w: number; h: number }[];
  };
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

const toSrcSet = (entries?: { src: string; w: number }[]) =>
  entries?.map((e) => `${e.src} ${e.w}w`).join(", ");

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
  const avif = toSrcSet(image.sources.avif);
  const webp = toSrcSet(image.sources.webp);
  const jpg = toSrcSet(image.sources.jpg);
  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      <img
        src={image.img.src}
        srcSet={jpg}
        sizes={sizes}
        alt={alt}
        width={width ?? image.img.w}
        height={height ?? image.img.h}
        loading={loading}
        // @ts-expect-error - fetchpriority is valid HTML attribute, React types lag
        fetchpriority={fetchPriority}
        decoding={decoding}
        className={className}
        style={style}
      />
    </picture>
  );
};
