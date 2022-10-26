import React, {useRef, useState} from "react";
// Import Swiper React components

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

import slider from "../../../../../public/images/images/mainSlider.png";


export default function OfferItemSlider() {

  return (
      <div className="carousel-wrapper h-[220px]" onClick={(e) => {
        e.stopPropagation()
      }}>
        <Carousel infiniteLoop showThumbs={false} swipeable={true} className={"h-[220px]"}>
          <div>
            <img src={slider.src} alt={"slider img"}
                 className="carousel-wrapper !h-[220px] object-cover rounded-xl"/>
          </div>
          <div>
            <img src={slider.src} alt={"slider img"}
                 className="carousel-wrapper !h-[220px] object-cover rounded-xl"/>
          </div>
          <div>
            <img src={slider.src} alt={"slider img"}
                 className="carousel-wrapper !h-[220px] object-cover rounded-xl"/>
          </div>
          <div>
            <img src={slider.src} alt={"slider img"}
                 className="carousel-wrapper !h-[220px] object-cover rounded-xl"/>
          </div>
          <div>
            <img src={slider.src} alt={"slider img"}
                 className="carousel-wrapper !h-[220px] object-cover rounded-xl"/>
          </div>

        </Carousel>
      </div>
  );
}
