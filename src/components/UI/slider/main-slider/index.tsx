import React, {useRef, useState} from "react";
// Import Swiper React components

import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slider from "../../../../../public/images/images/mainSlider.png"

// import required modules
import {Pagination, Navigation} from "swiper";
import _ from "lodash";
import {IMAGES} from "../../../../../public/images";

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
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >

          {[1, 2, 3, 4, 5].map((e, index) => {
            return <SwiperSlide key={index}>
              <img src={slider.src}
                  // layout='fill'
                  // quality={50}
                  // blurDataURL={IMAGES.placeholder.src}
                   placeholder="blur"
                   loading={"lazy"}
                  // priority={true}
                   className={"rounded-xl rounded-xl"}
                   alt={"slider image"}/>
            </SwiperSlide>
          })}


        </Swiper>
      </>
  );
}
