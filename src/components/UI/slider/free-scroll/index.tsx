import React, {useRef, useState} from "react";

import OfferItem from "../../../blocks/offer-item";
import {SwiperSlide} from "swiper/react/swiper-react";

interface IOfferSlider {
  nav?: boolean
  loop?: boolean
  miniHeight?: boolean
  data: any;
}

export default function FreeScroll({data, miniHeight}: any) {

  if (!data) {
    return <p className={"text-[red]"}>error</p>
  }

  return (
      <div className={"relative overflow-x-scroll w-full flex visible sm:hidden space-x-3 pl-3 "}>
        {data?.map((item: object, index: number) => {
          return <div key={index} className={"w-full max-w-[254px] min-w-[254px] "}>
            <OfferItem data={item} key={index} miniHeight={miniHeight}/>
          </div>
        })}
      </div>
  );
}
