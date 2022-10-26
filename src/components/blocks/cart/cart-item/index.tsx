import React, {useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image";
import Quantity from "../../../UI/quantity";
import Lari from "../../../../../public/images/icons/lari";
import {IMAGES} from "../../../../../public/images";

interface ICartItem {
  id?: number,
  name?: string,
  imgPath?: string,
  price?: number
  getCount?: any,
}

const CartItem = ({
                    id,
                    getCount,
                    imgPath,
                    name = "Campus Alba Castello Mare Hotel & Wellness Resort",
                    price
                  }: ICartItem) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
      <div className={"p-[30px] pr-[68px] flex bg-[#d9d9d933] rounded-2xl"}>
        <div className={"w-full max-w-[240px] max-h-[150px] mr-[30px]"}>
          <Image src={IMAGES.offerItem} alt={"product image"} className={"rounded-xl"}
                 style={{objectFit: "cover"}}/>
        </div>
        <div className={"flex flex-col w-full"}>
          <h2 className={"text-[#383838] font-bold text-[22px]"}>ASSA RESTAURANT</h2>
          <p className={"text-base mt-[18px] text-[#38383899]"}>From 80 lari, hotel apartments in the Orbi
            hotel network
            in Batumi</p>

          <div className={"mt-[28px] flex justify-between items-end"}>
            <div className={"flex items-center"}>
              <Quantity getCount={getCount}/>
              <div className={"flex flex-col items-center justify-center ml-8"}>
                <p className={"text-[14px] text-[#383838b3] text-center whitespace-nowrap"}>Total price</p>
                <div className={"flex items-center"}><Lari color={"#E35A43"}/><p
                    className={"text-[#E35A43] text-[18px] ml-[5px]"}>99.99</p>
                </div>
              </div>
              <div onClick={() => setIsChecked(!isChecked)}
                   className={"w-[58px] min-w-[58px] h-[28px] rounded-[100px] ml-[40px] bg-[#3838381a] relative flex items-center p-[2px] cursor-pointer justify-between"}>
                <p style={{color: isChecked ? '#FFFFFF' : '#383838'}}
                   className={"z-10 text-[14px] font-bold transition ml-[10px] pb-[2px]"}>p</p>
                <div style={{left: isChecked ? "2px" : "25px", transition: "0.2s"}}
                     className={"absolute left-[2px] transition duration-200 w-[30px] h-[24px] bg-[#E35A43] rounded-[40px]"}/>
                <Lari color={`${isChecked ? '#383838' : '#FFFFFF'}`} classes={"z-10 mr-[8px]"}/>
              </div>

            </div>
            <div
                onClick={() => {
                  console.log("delete")
                }}
                className={"flex items-center cursor-pointer"}>
              <Image src={ICONS.trash} alt={"trash icon"} width={24} height={24}/>
              <p className={"text-[#383838] ml-[10px] font-[500]"}>Delete</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CartItem;
