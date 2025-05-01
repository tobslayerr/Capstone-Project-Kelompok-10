import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Caraousel = () => {
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      const dummyData = [
        { id: 1, src: "/images/image1.jpg" },
        { id: 2, src: "/images/image2.jpg" },
        { id: 3, src: "/images/image3.jpg" },
      ];
      setImages(dummyData);
    };
    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    adaptiveHeight: false,
  };

  return (
    <div className="px-2">
      <div className="relative w-full max-w-6xl mx-auto mt-28 overflow-hidden rounded-2xl">
        <div className="w-full h-[150px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[300px]">
          <Slider {...settings} ref={sliderRef} className="w-full h-full">
            {images.map((image) => (
              <div key={image.id} className="h-full">
                <img
                  src={image.src}
                  alt={`Slide ${image.id}`}
                  className="w-full h-[150px] sm:h-[300px] md:h-[250px] lg:h-[300px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 text-white p-3 md:p-4 rounded-full hover:bg-black transition duration-300 hover:opacity-80 active:scale-90"
        >
          <FaChevronLeft size={15} className="font-bold" />
        </button>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 text-white p-3 md:p-4 rounded-full hover:bg-black transition duration-300 hover:opacity-80 active:scale-90"
        >
          <FaChevronRight size={15} className="font-bold" />
        </button>
      </div>
    </div>
  );
};

export default Caraousel;
