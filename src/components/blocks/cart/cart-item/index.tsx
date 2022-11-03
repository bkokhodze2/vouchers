import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image";
import Quantity from "../../../UI/quantity";
import Lari from "../../../../../public/images/icons/lari";
import {IMAGES} from "../../../../../public/images";
import _ from "lodash";
import {removeFromCart, changeIsPoint} from "../../../slices/cartSlice";


import {useDispatch, useSelector} from "react-redux";
import slider from "../../../../../public/images/images/mainSlider.png";

interface ICartItem {
  id?: number,
  name?: string,
  imgPath?: string,
  price?: number
  getCount?: any,
}

const CartItem = ({data, getCount}: any) => {
  const cart = useSelector((state: any) => state.cart);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);


  console.log("data11", _.get(data, '[0].additionalInfo[0].attachments[0].path', []))


  useEffect(() => {
    let count = 0;
    cart.cartItems.map((elem: any, index: number) => {

      if (_.get(elem, '[0].additionalInfo[0].genericTransactionTypeId', 0) === _.get(data, '[0].additionalInfo[0].genericTransactionTypeId', 0)) {
        count++;

        if (count > 1) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }

    })
  }, [cart])

  const dispatch = useDispatch();

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const changePoint = (product: any) => {
    if (!isDisabled) {
      dispatch(changeIsPoint(product));
    }
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
      <div className={"p-[30px] pr-[68px] flex bg-[#d9d9d933] rounded-2xl"}>
        <div className={"w-full max-w-[240px] mr-[30px]"}>
          <Image src={_.get(data, '[0].additionalInfo[0].attachments[0].path', IMAGES.offerItem.src)}
                 alt={"product image"}
              // layout={"fill"}
                 quality={60}
                 blurDataURL={_.get(data, '[0].additionalInfo[0].attachments[0].path', IMAGES.offerItem.src)}
                 placeholder="blur"
                 loading={"lazy"}
                 width={240}
                 height={146}
                 className={"rounded-xl w-full max-w-[240px] max-h-[150px]"}
                 style={{objectFit: "cover"}}/>
        </div>
        <div className={"flex flex-col w-full"}>
          <h2 className={"text-[#383838] font-bold text-[22px]"}>{_.get(data, '[0].title', "")}</h2>
          <p className={"text-base mt-[18px] text-[#38383899]"}>
            {_.get(data, '[0]additionalInfo[0].subTitles[0].description', "")}
          </p>

          <div className={"mt-[28px] flex justify-between items-end"}>
            <div className={"flex items-center"}>
              <Quantity getCount={getCount} data={data} currentQuantity={data.cartQuantity} isPoint={isChecked}/>
              <div className={"flex flex-col items-center justify-center ml-8"}>
                <p className={"text-[14px] text-[#383838b3] text-center whitespace-nowrap"}>Total price</p>
                <div className={"flex items-center"}>

                  {
                    data.isPoint ? <p
                        className={"text-[#E35A43] text-[18px] ml-[5px]"}>
                      <span className={"mr-1"}>P</span>
                      {_.get(data, '[0].entries[0].entryAmount', 0) * _.get(data, '[0].entries[0].multiplier', 0) * data.cartQuantity}
                    </p> : <>
                      <Lari color={"#E35A43"}/><p
                        className={"text-[#E35A43] text-[18px] ml-[5px]"}>{_.get(data, '[0].entries[0].entryAmount', 0) * data.cartQuantity}
                    </p>
                    </>
                  }

                </div>
              </div>
              <div onClick={() => changePoint(data)}
                   style={{
                     backgroundColor: isDisabled ? "#ababab1a" : "#3838381a",
                     cursor: isDisabled ? "not-allowed" : "pointer"
                   }}
                   className={"w-[58px] min-w-[58px] h-[28px] rounded-[100px] ml-[40px] relative flex items-center p-[2px] cursor-pointer justify-between"}>
                <p style={{color: data.isPoint ? '#FFFFFF' : '#383838'}}
                   className={"z-10 text-[14px] font-bold transition ml-[10px] pb-[2px]"}>p</p>
                <div style={{
                  left: data.isPoint ? "2px" : "25px",
                  transition: "0.2s",
                  backgroundColor: isDisabled ? "#7a7575" : "#E35A43"
                }}
                     className={"absolute left-[2px] transition duration-200 w-[30px] h-[24px] bg-[#E35A43] rounded-[40px]"}/>
                <Lari color={`${data.isPoint ? '#383838' : '#FFFFFF'}`} classes={"z-10 mr-[8px]"}/>
              </div>

            </div>
            <div
                onClick={() => {
                }}
                className={"flex items-center cursor-pointer"}>
              <Image
                  src={ICONS.trash}
                  quality={70}
                  blurDataURL={ICONS.trash}
                  placeholder="blur"
                  loading={"lazy"}
                  alt={"trash icon"}
                  width={24}
                  height={24}/>
              <p className={"text-[#383838] ml-[10px] font-[500]"} onClick={() => handleRemoveFromCart(data)}>Delete</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CartItem;
