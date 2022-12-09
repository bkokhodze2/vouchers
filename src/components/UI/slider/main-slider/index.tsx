import React from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slider1 from "/public/images/images/main-slider/1.webp"
import slider2 from "/public/images/images/main-slider/2.webp"
import slider3 from "/public/images/images/main-slider/3.webp"
import slider4 from "/public/images/images/main-slider/4.webp"
import slider5 from "/public/images/images/main-slider/5.webp"
import slider6 from "/public/images/images/main-slider/6.webp"

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

          {/*{[1, 2, 3, 4, 5].map((e, index) => {*/}
          {/*  return <SwiperSlide key={index}>*/}
          {/*    <img src={slider.src}*/}
          {/*         placeholder="blur"*/}
          {/*         loading={"lazy"}*/}
          {/*         className={"rounded-[0px] md:rounded-xl"}*/}
          {/*         alt={"slider image"}/>*/}
          {/*  </SwiperSlide>*/}
          {/*})}*/}

          <SwiperSlide key={1}>
            <img src={slider1.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>
          <SwiperSlide key={2}>
            <img src={slider2.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>
          <SwiperSlide key={3}>
            <img src={slider3.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>
          <SwiperSlide key={4}>
            <img src={slider4.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>
          <SwiperSlide key={5}>
            <img src={slider5.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>
          <SwiperSlide key={6}>
            <img src={slider6.src}
                 placeholder="blur"
                 loading={"lazy"}
                 className={"rounded-[0px] md:rounded-xl"}
                 alt={"slider image"}/>
          </SwiperSlide>


        </Swiper>
      </>
  );
}
