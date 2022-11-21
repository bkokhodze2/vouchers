import React, {useEffect, useRef, useState} from "react";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import Image from "next/image";
// @ts-ignore
import {ICONS} from "public/images";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {Pagination, Navigation, Lazy} from "swiper";
import OfferItem from "../../../blocks/offer-item";

interface IOfferSlider {
  nav?: boolean
  loop?: boolean
  data: any;
}

export default function OfferSlider({nav = true, loop = true, data}: IOfferSlider) {

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiper = useRef() as any;


  if (!data) {
    return <p className={"text-[red]"}>error</p>
  }

  useEffect(() => {

  }, [swiper])

  return (
      <div className={"relative hidden sm:block"}>
        {
            nav && <>
							<div className={"offerSliderPrev"} ref={prevRef} onClick={() => swiper.current.swiper.slidePrev()}><Image
									src={ICONS.prev} alt={"prev icon"}/></div>
							<div className={"offerSliderNext"} ref={nextRef} onClick={() => swiper.current.swiper.slideNext()}><Image
									src={ICONS.next} alt={"next icon"}/></div>
						</>
        }
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            breakpoints={{
              // when window width is >= 640px
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,

              },
            }}
            onInit={(core) => {
              swiper.current = core.el
            }}
            navigation={{
              prevEl: prevRef.current ? prevRef.current : undefined,
              nextEl: nextRef.current ? nextRef.current : undefined,
            }}
            freeMode={true}
            loopFillGroupWithBlank={true}
            loop={loop}
            lazy={true}
            modules={[Pagination, Navigation, Lazy]}
            className="offerSlider"
        >
          {data?.map((item: object, index: number) => {
            return <SwiperSlide key={index}>
              <OfferItem data={item}/>
            </SwiperSlide>
          })}

        </Swiper>
      </div>
  );
}
