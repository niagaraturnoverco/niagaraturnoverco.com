/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

declare module "*&as=picture" {
  const value: {
    sources: {
      avif?: { src: string; w: number; h: number }[];
      webp?: { src: string; w: number; h: number }[];
      jpg?: { src: string; w: number; h: number }[];
    };
    img: { src: string; w: number; h: number };
  };
  export default value;
}
