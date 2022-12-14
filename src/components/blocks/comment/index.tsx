import React from "react"
import {Rate} from "antd"
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Image from "next/image"


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
              <p className={"text-base font-bold aveSofBold"}>{userName}</p>
              <div className={"flex items-center"}>
                {rate && <Rate disabled defaultValue={rate} className={"text-[16px] h-[20px] lg:mb-1.5 mb-0"}/>}
                <span className={"ml-2 text-sm font-bold aveSofBold"}>{rate}.0</span>
              </div>
            </div>
          </div>
          <div>
            <p className={"text-[#38383899] lg:text-sm text-[12px] aveSofRegular"}>{date}</p>
          </div>
        </div>
        {/*user*/}
        {/*comment*/}
        <div className={"bg-[white] rounded-xl p-4 lg:p-6 mt-3"}>
          <p className={"aveSofRegular"}>
            {comment}
          </p>
        </div>
        {/*comment*/}

      </div>
  )
}

export default Comment;
