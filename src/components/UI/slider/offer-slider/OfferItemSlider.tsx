import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slider from "/public/images/images/mainSlider.png"

// import required modules
import {Pagination} from "swiper";

export default function OfferItemSlider() {

  return (
      <>
        <Swiper
            slidesPerView={1}

            pagination={{
              dynamicBullets: true,
              clickable: true,
            }}
            draggable={true}
            loop={false}
            modules={[Pagination]}
            navigation={false}
            className="OfferItemSlider "
        >
          {/*<img src={img.src} alt={"slider img"} className={"object-cover w-full h-auto rounded-xl"}/>*/}
          <SwiperSlide className={""}>
            {/*<Image src={slider.src} layout='fill' priority={true} className={"rounded-xl"} alt={"slider image"}/>*/}
            <img src={slider.src} alt={"slider img"} className={"  rounded-xl bg-no-repeat"}/>
          </SwiperSlide>

          <SwiperSlide>
            {/*<Image src={slider.src} layout='fill' priority={true} className={"rounded-xl"} alt={"slider image"}/>*/}
            <img src={slider.src} alt={"slider img"} className={"w-full h-auto rounded-xl bg-no-repeat"}/>
          </SwiperSlide>

        </Swiper>
      </>
  );
}
