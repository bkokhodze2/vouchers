import React, {useEffect, useState} from "react"
import Rate from "antd/lib/rate";
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"

import img from "/public/images/images/offerItem.png"
import Link from "next/link";
import Lari from "../../../../public/images/icons/lari";


interface IOfferItem {
  id?: number,
  userName?: string,
  imgPath?: string,
  rate?: number,
  date?: string
  comment?: string
}

const Comment = ({
                   id,
                   imgPath,
                   userName = "Natia k.",
                   rate = 0,
                   date = "25 June, 2020",
                   comment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                 }: IOfferItem) => {


  return (
      <div className={"flex flex-col "}>
        {/*user*/}
        <div className={"flex justify-between items-center"}>
          <div className={"flex items-center"}>
            <div className={"mr-3 flex justify-center items-center"}>
              <Image src={IMAGES.detailsImg}
                     quality={70}
                     blurDataURL={IMAGES.placeholder.src}
                     placeholder="blur"
                     loading={"lazy"}
                     alt={"user avatar icon"}
                     width={40}
                     height={40}
              />
            </div>
            <div>
              <p className={"text-base font-bold"}>{userName}</p>
              <div className={"flex items-center"}>
                {rate && <Rate disabled defaultValue={rate} className={"text-[16px] h-[20px] mb-1.5"}/>}
                <span className={"ml-2 text-sm font-bold"}>{rate}.0</span>
              </div>
            </div>
          </div>
          <div>
            <p className={"text-[#38383899]"}>{date}</p>
          </div>
        </div>
        {/*user*/}
        {/*comment*/}
        <div className={"bg-[white] rounded-xl p-6 mt-3"}>
          <p>
            {comment}
          </p>
        </div>
        {/*comment*/}

      </div>
  )
}

export default Comment;
