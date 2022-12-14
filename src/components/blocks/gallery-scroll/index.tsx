import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import 'react-indiana-drag-scroll/dist/style.css'
// import {Image} from 'antd';
import _ from "lodash";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Lazy, Mousewheel, Pagination} from "swiper";

const GalleryScroll = ({data}: any) => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = [
    ..._.get(data, '[0]additionalInfo[0].attachments', [])
  ]

  const Slide1 = ({idx, data}: any) => {
    return <div
        key={idx}
        className={"min-w-[880px] max-w-[880px] relative  h-[546px] relative !ml-0 cursor-pointer"}
        style={{marginLeft: `${idx === 0 ? '50px' : '0px'}`}}>
      <img
          src={_.get(data, 'path', [])}
          onClick={() => {
            setIsOpen(true)
            setPhotoIndex(idx)
          }}
          className={"!object-cover h-full min-w-[880px] max-w-[880px] w-full h-[546px] rounded-xl"}
          alt={"voucher photo"}/>
    </div>
  }

  const Slide4 = ({idx, data}: any) => {
    return <div key={idx + "slide4"} className={"min-w-[1008px] grid grid-rows-2 grid-cols-2 gap-[28px] "}>

      {[1, 2, 3, 4].map((e, index) => {
        return images[idx + index + 1] &&
						<div key={idx + index + "four"}
						     className={"h-[258px] max-h-[258px] w-[490px] max-w-[490px] relative cursor-pointer"}>
							<img
									onClick={() => {
                    setIsOpen(true)
                    setPhotoIndex(idx + index + 1)
                  }}
									src={_.get(images, `[${idx + index + 1}].path`, [])}
									className={"object-cover h-full w-full rounded-xl w-[490px] h-[258px]"}
									alt={"voucher photo"}/>
						</div>
      })}

    </div>
  }

  // @ts-ignore

  const runCallback = (cb) => {
    return cb();
  }


  useEffect(() => {

  }, [])

  return (
      <div className={"w-full overflow-x-auto"}>
        <div className={"py-8 h-[610px] hidden md:flex select-none"}>
          {
              isOpen && <Lightbox
									mainSrc={images[photoIndex].path}
									nextSrc={images[(photoIndex + 1) % images.length].path}
									prevSrc={images[(photoIndex + images.length - 1) % images.length].path}
									onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % images.length)
                  }
									onMovePrevRequest={() =>
                      setPhotoIndex(
                          (photoIndex + images.length - 1) % images.length
                      )
                  }
									onCloseRequest={() => setIsOpen(false)}
							/>
          }

          <Swiper
              direction={"horizontal"}
              slidesPerView={"auto"}
              freeMode={true}
              scrollbar={true}
              // mousewheel={true}
              lazy={true}
              modules={[FreeMode, Mousewheel, Lazy]}
              className="gallery"
          >
            {
              runCallback(() => {
                const galleryItem = [];
                for (let i = 0; i < images.length; i = i + 5) {
                  galleryItem.push(
                      <div key={i + "l"} className={"flex"}>
                        <SwiperSlide key={i + "f"} className={"min-w-[880px] max-w-[880px] mr-[30px]"}
                                     style={{marginLeft: `${i === 0 ? '50px' : '0px'}`}}
                        >
                          <Slide1 idx={i} data={images[i]}/>
                        </SwiperSlide>
                        {i + 1 < images.length &&
														<SwiperSlide key={i + "d"} className={"min-w-[1008px] max-w-[1008px] mr-[30px]"}>
															<Slide4 idx={i} data={images[i]}/>
														</SwiperSlide>}
                      </div>
                  );
                }
                return galleryItem;
              })
            }

          </Swiper>

        </div>

        <div className={"flex h-[226px] ph:h-[400px] flex md:hidden"}>

          <Swiper
              direction={"horizontal"}
              pagination={true}
              spaceBetween={12}
              lazy={true}
              modules={[Pagination, Lazy]}
              className="mySwiper detailsSwiper"
          >
            {images.map((e, index) => {
              return <SwiperSlide key={"swiper" + index}>
                <LazyLoadImage
                    src={_.get(images, `[${index}].path`, [])}
                    className={"object-cover h-full w-full w-full h-[226px] ph:h-[400px] max-h-[226px] ph:max-h-[400px]"}
                    alt={"voucher photo"}/>
              </SwiperSlide>
            })}
          </Swiper>

        </div>

      </div>
  )
}

export default GalleryScroll;
