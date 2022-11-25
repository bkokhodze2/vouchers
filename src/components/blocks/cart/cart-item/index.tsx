import React, {useEffect, useState} from "react"
// @ts-ignore
import {ICONS} from "public/images";
import Image from "next/image";
import Quantity from "../../../UI/quantity";
import Lari from "../../../../../public/images/icons/lari";
import {IMAGES} from "../../../../../public/images";
import _ from "lodash";
import {changeIsPoint, removeFromCart} from "../../../slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Link from "next/link";

interface ICartItem {
  id?: number,
  data?: any,
  getCount?: any,
}

const CartItem = ({data, getCount}: ICartItem) => {
  const cart = useSelector((state: any) => state.cart);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [quantityInCart, setQuantityInCart] = useState<number>(0);
  const [freeQuantity, setFreeQuantity] = useState<number>(0);

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

  useEffect(() => {

    const quantityCart = cart.cartItems.filter((e: any) => {
      return _.get(e, '[0].additionalInfo[0].genericTransactionTypeId', 0) === _.get(data, '[0].additionalInfo[0].genericTransactionTypeId', 0)
    })

    setQuantityInCart(quantityCart?.reduce((prevValue: any, currValue: any) => prevValue + currValue?.cartQuantity, 0))
    setFreeQuantity((_.get(data, '[0].additionalInfo[0].limitQuantity', 0) - _.get(data, '[0].additionalInfo[0].soldQuantity', 0) - quantityInCart));

  }, [cart, data, quantityInCart])


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

  let companySlug = _.get(data, '[0].additionalInfo[0].provider.name', "").replaceAll(' ', '-');
  let voucherSlug = _.get(data, '[0].additionalInfo[0].genericTransactionTypeId', 1);

  console.log("c-v", companySlug, voucherSlug)

  return (

      <div
          className={"p-[16px] md:p-[16px] xl:p-[30px] pr-4 xl:pr-[68px] flex bg-[#FFFFFF] rounded-0 ph:rounded-2xl"}>
        <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
          <div
              className={"w-full cursor-pointer max-w-[148px] min-w-[148px] sm:max-w-[170px] sm:min-w-[170px] xl:max-w-[240px] xl:min-w-[240px] lg:mr-[30px] md:mr-[16px] mr-[8px] relative"}>
            <LazyLoadImage src={_.get(data, '[0].additionalInfo[0].attachments[0].path', IMAGES.offerItem.src)}
                           alt={"product image"}
                           loading={"lazy"}
                           className={"rounded-xl w-full h-full max-h-[157px] min-h-[114px]  lg:min-h-[157px] max-w-[148px] min-w-[148px] sm:max-w-[170px] sm:min-w-[170px] xl:max-w-[240px] xl:min-w-[240px]"}
                           style={{objectFit: "cover"}}/>
          </div>
        </Link>
        <div className={"flex flex-col w-full"}>
          <div className={"flex cursor-pointer justify-between"}>
            <Link href={`/company/${companySlug}/voucher/${voucherSlug}`}>
              <h2 className={"text-[#383838] font-bold text-[14px] lg:text-[22px] md:text-base aveSofBold"}>{_.get(data, '[0]additionalInfo[0].provider.name', "")}</h2>
            </Link>
            <div
                onClick={() => handleRemoveFromCart(data)}
                className={"items-center min-w-[24px] cursor-pointer flex md:hidden"}>
              <Image
                  src={ICONS.trash}
                  quality={70}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  alt={"trash icon"}
                  width={24}
                  height={24}/>
            </div>
          </div>

          <p className={"text-base mt-[18px] text-[#38383899] hidden md:flex aveSofRegular"}>
            {_.get(data, '[0]additionalInfo[0].subTitles[0].description', "")}
          </p>

          <div className={"mt-[12[px] md:mt-[28px] flex justify-between items-center 2xl:items-end"}>
            <div
                className={"flex-col flex md:flex-row items-start md:items-center w-full md:justify-items-start justify-between"}>
              <div className={"mt-[11px] md:mt-[0px]"}>
                <Quantity freeQuantity={freeQuantity}
                          quantityInCart={quantityInCart}
                          getCount={getCount} data={data}
                          currentQuantity={data.cartQuantity} isPoint={isChecked}/>
              </div>
              <div className={"flex w-full items-center md:justify-start justify-between mt-[11px] md:mt-[0px]"}>
                <div className={"flex flex-col items-start md:items-center justify-center lg:ml-8 ph:ml-4 ml-1.5"}>
                  <p className={"text-[14px] text-[#383838b3] text-center whitespace-nowrap aveSofRegular"}>Total
                    price</p>
                  <div className={"flex items-center"}>

                    {
                      data.isPoint ? <p
                          className={"text-[#E35A43] text-[18px] ml-[5px] aveSofMedium"}>
                      <span className={"mr-1"}>
                        <Image
                            src={IMAGES.coin}
                            quality={100}
                            blurDataURL={IMAGES.placeholder.src}
                            loading={"lazy"}
                            width={16}
                            height={16}
                            alt={"coin icon"}
                        />
                      </span>
                        {_.get(data, '[0].entries[0].entryAmount', 0) * _.get(data, '[0].entries[0].multiplier', 0) * data.cartQuantity}
                      </p> : <>
                        <Lari color={"#E35A43"}/>
                        <p
                            className={"text-[#E35A43] text-[18px] ml-[5px] aveSofMedium"}>{_.get(data, '[0].entries[0].entryAmount', 0) * data.cartQuantity}
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
                     className={"w-[58px] min-w-[58px] h-[28px] rounded-[100px] lg:ml-[40px] ph:ml-4 ml-1.5 relative flex items-center p-[2px] cursor-pointer justify-between"}>
                  <p
                      className={"z-10 text-[14px] font-bold transition ml-[5px] pt-1 pb-[2px] flex justify-center items-center"}>
                    <Image
                        src={IMAGES.coin}
                        quality={100}
                        blurDataURL={IMAGES.placeholder.src}
                        loading={"lazy"}
                        width={16}
                        height={16}
                        alt={"coin icon"}
                    />
                  </p>
                  <div style={{
                    left: data.isPoint ? "2px" : "30px",
                    transition: "0.2s",
                    backgroundColor: isDisabled ? "#7a7575" : "#E35A43"
                  }}
                       className={"absolute left-[2px] transition duration-200 w-[25px] h-[24px] bg-[#E35A43] rounded-[40px]"}/>
                  <Lari color={`${data.isPoint ? '#383838' : '#FFFFFF'}`} classes={"z-10 mr-[7px]"}/>
                </div>
              </div>


            </div>
            <div
                onClick={() => handleRemoveFromCart(data)}
                className={"items-center min-w-[24px] cursor-pointer hidden md:flex"}>
              <Image
                  src={ICONS.trash}
                  quality={70}
                  blurDataURL={IMAGES.placeholder.src}
                  loading={"lazy"}
                  alt={"trash icon"}
                  width={24}
                  height={24}/>
              <p className={"text-[#383838] ml-[10px] font-[500] aveSofMedium"}>Delete</p>
            </div>
          </div>
        </div>
      </div>


  )
}

export default CartItem;
