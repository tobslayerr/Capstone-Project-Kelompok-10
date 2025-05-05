import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Caraousel = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-[1280px] h-40 overflow-hidden rounded-lg md:h-full">
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 -translate-y-1/2 left-3 z-20 bg-white/40 transition-colors duration-300 ease-in-out hover:bg-white rounded-full p-2 shadow active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute top-1/2 -translate-y-1/2 right-3 z-20 bg-white/40 transition-colors duration-300 ease-in-out hover:bg-white rounded-full p-2 shadow active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div className="flex-[0_0_100%]" key={index}>
              <img
                src={slide}
                alt={`Slide ${index}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-black/30 px-3 py-1 rounded-full flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-1 rounded-full transition ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Caraousel;