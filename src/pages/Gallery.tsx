import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import beforeAfterBedroomBlue from "@/assets/before-after-bedroom-blue.png.asset.json";
import beforeAfterBedroomRose from "@/assets/before-after-bedroom-rose.png.asset.json";
import beforeAfterPiano from "@/assets/before-after-piano.png.asset.json";
import beforeAfterLounge from "@/assets/before-after-lounge.png.asset.json";
import beforeAfterHallway from "@/assets/before-after-hallway.png.asset.json";

const beforeAfterGallery = [
  {
    title: "Bedroom reset",
    impact: "From visibly unfinished to crisp, guest-ready presentation.",
    image: beforeAfterBedroomBlue.url,
    alt: "Before and after comparison of a short-term rental bedroom reset with straightened bedding and styled pillows",
    featured: true,
  },
  {
    title: "Full bed remake",
    impact: "A cleaner visual finish that reads ready at a glance.",
    image: beforeAfterBedroomRose.url,
    alt: "Before and after comparison of a pink bedroom with wrinkled bedding transformed into a neatly made bed",
  },
  {
    title: "Living room styling",
    impact: "Soft furnishings and layout details make the space feel intentional.",
    image: beforeAfterLounge.url,
    alt: "Before and after comparison of a lounge area with added throws and cushions for a more polished guest setup",
  },
  {
    title: "Amenity corner",
    impact: "An overlooked area becomes a usable, welcoming moment.",
    image: beforeAfterHallway.url,
    alt: "Before and after comparison of a hallway nook transformed into a styled seating area",
  },
  {
    title: "Detail refresh",
    impact: "Even secondary rooms look maintained, not forgotten.",
    image: beforeAfterPiano.url,
    alt: "Before and after comparison of a piano area with added styling and decor for a finished look",
  },
];

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="relative h-10 w-10 shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-gold shadow-gold" />
      <div className="absolute inset-[1px] rounded-[7px] flex items-center justify-center bg-background">
        <span className="font-serif text-base gold-text">NT</span>
      </div>
    </div>
    <div className="leading-tight">
      <div className="font-serif text-base">Niagara Turnover Co.</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Property Readiness
      </div>
    </div>
  </div>
);

export default function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <a href="/" className="flex items-center"><Logo /></a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </a>
        </div>
      </header>

      <main className="section-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(36_55%_40%/0.35)] bg-[hsl(43_65%_58%/0.10)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[hsl(var(--gold-deep))]">
              <Sparkles className="h-3 w-3" />
              Before & After
            </div>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl ink max-w-3xl">
            The impact should be <span className="text-[hsl(var(--gold-deep))]">obvious in seconds.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base ink-muted max-w-2xl">
            These real room resets show the difference between a property that feels unfinished and one that reads clean, cared for, and ready the moment a guest walks in.
          </p>

          {/* Mobile: swipeable carousel */}
          <div className="mt-8 lg:hidden">
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
              aria-label="Before and after gallery carousel"
            >
              <CarouselContent className="-ml-3">
                {beforeAfterGallery.map((item, index) => (
                  <CarouselItem key={item.title} className="pl-3 basis-[88%] sm:basis-[70%]">
                    <figure className="paper-card overflow-hidden shadow-elegant h-full">
                      <div className="aspect-[4/3] overflow-hidden bg-[hsl(36_25%_92%)]">
                        <img
                          src={item.image}
                          alt={item.alt}
                          width={900}
                          height={675}
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                          {...(index === 0 ? { fetchpriority: "high" as const } : {})}
                          sizes="(max-width: 640px) 88vw, 70vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <figcaption className="p-4">
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--gold-deep))]">Before → After</div>
                        <h3 className="mt-1.5 font-serif text-lg ink">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed ink-muted">{item.impact}</p>
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex gap-1.5" role="tablist" aria-label="Gallery slides">
                  {beforeAfterGallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => api?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--gold-deep))] focus-visible:ring-offset-2 ${
                        i === current
                          ? "w-6 bg-[hsl(var(--gold-deep))]"
                          : "w-1.5 bg-[hsl(36_25%_75%)]"
                      }`}
                      aria-label={`Go to slide ${i + 1} of ${beforeAfterGallery.length}`}
                      aria-current={i === current ? "true" : undefined}
                      role="tab"
                      aria-selected={i === current}
                      tabIndex={i === current ? 0 : -1}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs ink-muted tabular-nums" aria-live="polite" aria-atomic="true">
                    {current + 1} / {beforeAfterGallery.length}
                  </span>
                  <CarouselPrevious
                    className="static translate-y-0 min-h-11 min-w-11 h-11 w-11"
                    aria-label="Previous before and after slide"
                  />
                  <CarouselNext
                    className="static translate-y-0 min-h-11 min-w-11 h-11 w-11"
                    aria-label="Next before and after slide"
                  />
                </div>
              </div>
            </Carousel>
            <p className="mt-3 text-center text-xs ink-muted">
              Swipe or use arrow keys to browse
            </p>
          </div>

          {/* Desktop: bento grid */}
          <div className="mt-10 hidden gap-4 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto]">
            {beforeAfterGallery.map((item, index) => {
              const featured = index === 0;
              return (
                <figure
                  key={item.title}
                  className={featured
                    ? "paper-card group overflow-hidden shadow-elegant lg:col-span-7 lg:row-span-2"
                    : "paper-card group overflow-hidden shadow-elegant lg:col-span-5"
                  }
                >
                  <div className={featured ? "aspect-[4/3] overflow-hidden" : "aspect-[16/10] overflow-hidden"}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={featured ? 1080 : 800}
                      height={featured ? 810 : 500}
                      loading={featured ? "eager" : "lazy"}
                      decoding="async"
                      {...(featured ? { fetchpriority: "high" as const } : {})}
                      sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <figcaption className="flex items-start justify-between gap-4 p-5 sm:p-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--gold-deep))]">Before → After</div>
                      <h3 className="mt-2 font-serif text-xl ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed ink-muted max-w-[44ch]">{item.impact}</p>
                    </div>
                    <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(36_25%_80%)] bg-white/70 text-[hsl(var(--gold-deep))]">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
