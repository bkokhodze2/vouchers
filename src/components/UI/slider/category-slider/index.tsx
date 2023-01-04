import React from "react"
// @ts-ignore
import 'react-indiana-drag-scroll/dist/style.css'
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

// import required modules
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import Link from "next/link";

const CategorySlider = ({data}: any) => {

  return (
      <Swiper
          direction={"horizontal"}
          slidesPerView={"auto"}
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
          breakpoints={{
            320: {
              spaceBetween: 16,
            },
            640: {
              spaceBetween: 16,
            },
            // when window width is >= 768px
            768: {
              spaceBetween: 30,
            },
            1280: {
              spaceBetween: 30,
            },
          }}
          modules={[FreeMode]}
          className="category"
      >
        <SwiperSlide>
          <Link href={"/category/2"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white]  max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div className={"bg-purple w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.bag.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>ტურიზმი</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/category/3"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white] max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div
                  className={"bg-[#7B92DC] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.beauty.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>სილამაზე</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/category/4"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white] max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div
                  className={"bg-[#F5CE5A] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.food.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>კვება</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/category/5"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white] max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div
                  className={"bg-[#8338EC] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.entertainment.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>გართობა</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/category/11"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white] max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div
                  className={"bg-[#56971F] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.children.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>საბავშვო</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/category/10"}>
            <div
                className={"cursor-pointer flex justify-center flex-col bg-[white]max-w-[166px] min-w-[166px] max-h-[198px] md:max-w-[230px] md:min-w-[230px] md:max-h-[268px] bg-[white] rounded-xl items-center pb-6 relative overflow-hidden"}>
              <div
                  className={"bg-[#E35A43] w-[400px] h-[400px] rounded-[50%] absolute -top-[170%] md:-top-[110%]"}/>
              <div className={"mt-1 w-full h-auto z-10 flex justify-center"}>
                <img src={IMAGES.education.src}
                     placeholder="blur"
                     style={{
                       objectFit: "cover"
                     }}
                     className={"!w-[106px] md:!w-[174px] h-full z-50"}
                     loading={"lazy"}
                     alt={"bag image"}/>
              </div>
              <h4 className={"font-bold z-10 text-[18px] text-[#383838] mt-1 flex-1 aveSofBold"}>განათლება</h4>
              <p className={"font-[400] z-10 text-base text-[#38383880] mt-2 aveSofRegular"}>203 შეთავაზება</p>
            </div>
          </Link>
        </SwiperSlide>

      </Swiper>
  )
}

export default CategorySlider;
