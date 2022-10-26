import React, {useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image"

import img from "/public/images/images/offerItem.png"
import Link from "next/link";
import Lari from "../../../../public/images/icons/lari";

import "antd/dist/antd.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

import InStock from "../../UI/in-stock";
import OfferItemSlider from "../../UI/slider/offer-slider/OfferItemSlider";
import slider from "../../../../public/images/images/mainSlider.png";
import Test from "../../UI/slider/offer-slider/Test";
// import CountDown from "../../UI/count-down";
import _ from 'lodash';

import dynamic from 'next/dynamic'

const CountDown = dynamic(
    () => import('../../UI/count-down'),
    {ssr: false}
)

interface IOfferItem {
  data: any,
}

const OfferItem = ({data}: IOfferItem) => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState<boolean>(false);

  let companySlug = _.get(data, 'additionalInfo[0].provider.name', "").replaceAll(' ', '-');
  let voucherSlug = data?.title?.replaceAll(' ', '-');


  // if (!data?.additionalInfo[0]) {
  //   return
  // }

  const InnerSlider = () => {
    return <div className="carousel-wrapper h-[220px]" onClick={(e) => {
      e.stopPropagation()
    }}>
      <Carousel infiniteLoop showThumbs={false} swipeable={true} className={"h-[220px]"}>

        {
          _.get(data, 'additionalInfo[0]?.attachments', []).length === 0 ? <div>
                <img src={slider?.src} alt={"slider img"}
                     className="carousel-wrapper !h-[220px] object-cover rounded-t-xl"/>
              </div> :
              _.get(data, 'additionalInfo[0]?.attachments', []).map((item: any, index: number) => {
                return <div key={index}>
                  <img src={item?.path} alt={"slider img"}
                       className="carousel-wrapper !h-[220px] object-cover rounded-t-xl"/>
                </div>
              })
        }

      </Carousel>
    </div>
  }

  return (
      <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
        <div className={"flex flex-col items-start bg-[transparent] relative select-none"}>

          <div className={"h-[40px] z-10 bg-orange absolute top-5 left-4 px-[21px] rounded-[100px] flex items-center"}>
            <p className={"text-[white] text-base"}>- {_.get(data, 'additionalInfo[0].percentage', 0)}
              %</p>
          </div>

          <div onClick={(e) => {
            e.stopPropagation()
          }}
               className={"w-12 h-12 z-10 rounded-[50%] bg-[white] opacity-[0.5] absolute top-4 right-4 flex justify-center items-center"}>
            <Image src={ICONS.heartBlue} alt={"heart icon"}/>
          </div>

          {/*h-[220px] w-full max-w-[360px] flex*/}
          <div className={"h-full h-[220px] w-full max-w-[360px] relative relative "}>
            {/*<OfferItemSlider/>*/}
            {/*<img src={slider.src} alt={"slider img"} className={"object-cover rounded-xl bg-no-repeat"}/>*/}

            <InnerSlider/>

            {/*<Test/>*/}

          </div>

          <div className={"flex flex-col w-full bg-[white] px-[20px] pb-[24px] rounded-b-xl"}>
            <p className={"text-clip overflow-hidden text-start mt-3 font-bold leading-[27px] text-[#383838] text-[22px] min-h-[54px] textDots2"}>{data?.title}</p>
            <div className={"flex flex-row space-x-3 items-center mt-3"}>
              <p className={"font-bold text-[#E35A43] text-[21px] flex items-center"}>
                <Lari color={"#E35A43"}
                      classes={"mr-[5px]"}/>
                {_.get(data, 'additionalInfo[0].servicePrice', 0)}
              </p>
              <p className={"text-[#7B92DC] text-sm "}>
                <span
                    className={"text-[#383838] text-[12px] mr-[8px]"}>OR</span>
                {_.get(data, 'entries[0].entryAmount', 0) * _.get(data, 'entries[0].multiplier', 0)} P
              </p>

            </div>
            <p className={"text-[#38383899] text-start text-base leading-[23px] font-[400] mt-3 textDots2 min-h-[47px]"}>
              {_.get(data, 'additionalInfo[0].subTitles[0].description', "")}
            </p>
            <div className={"flex justify-between w-full mt-3"}>
              <p className={"text-purple text-base font-[500] mr-5"}>
                <CountDown data={data?.useEndDate}/>
              </p>
              <InStock max={_.get(data, 'additionalInfo[0].limitQuantity', 0)}
                       current={_.get(data, 'additionalInfo[0].soldQuantity', 0)}/>
            </div>
          </div>

        </div>
      </Link>
  )
}

export default OfferItem;
