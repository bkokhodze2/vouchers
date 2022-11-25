import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slider from "/public/images/images/mainSlider.webp"

// import required modules
import {Lazy, Navigation, Pagination} from "swiper";

export default function Slider() {

  return (
      <>
        <Swiper
            spaceBetween={30}
            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            draggable={true}
            loop={true}
            navigation={true}
            lazy={true}
            modules={[Pagination, Navigation, Lazy]}
            className="mySwiper"
        >

          {[1, 2, 3, 4, 5].map((e, index) => {
            return <SwiperSlide key={index}>
              <img src={slider.src}
                   placeholder="blur"
                   loading={"lazy"}
                   className={"rounded-[0px] md:rounded-xl"}
                   alt={"slider image"}/>
            </SwiperSlide>
          })}


        </Swiper>
      </>
  );
}
