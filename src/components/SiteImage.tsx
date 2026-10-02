import { useState } from "react";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function SiteImage({
  src,
  alt,
  className = "aspect-[4/3]",
  imageClassName = "object-cover",
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
}: SiteImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <img
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full transition-opacity duration-500 ${imageClassName} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}