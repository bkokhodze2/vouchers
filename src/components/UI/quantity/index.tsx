import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../slices/cartSlice";
import {notification} from "antd";

interface IQuantity {
  getCount: any,
  currentQuantity: number,
  data: any,
  isPoint: boolean
}

function Quantity({getCount, currentQuantity, data, isPoint}: IQuantity) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(currentQuantity)

  const handleAddToCart = (product: any) => {


    // let obj = {
    //   ...product,isPoint
    // }


    dispatch(addToCart(product));

    notification['success']({
      message: 'რაოდენობა გაიზარდა',
    });

  };

  const handleDecreaseCart = (product: any) => {

    dispatch(decreaseCart(product));

    notification['success']({
      message: 'რაოდენობა შემცირდა',
    });
  };

  // useEffect(() => {
  //   getCount(quantity)
  // }, [quantity])

  return (
      <div className={"rounded-xl bg-[#EEEEEE] h-[32px] md:h-[48px] w-full flex items-center"}>
        <div
            className={"rounded-[10px] bg-[#EEEEEE] h-full w-full py-0 md:py-1 pl-0 mr-0 md:pl-6 md:pr-1 flex items-center"}>
          <p className={"text-[#383838b3] text-base mr-6 hidden md:flex"}>Quantity</p>

          <div className={"flex h-full items-center bg-[white] rounded-[10px] px-[12px] md:px-4"}>
            <div onClick={() => handleDecreaseCart(data)}
                 className={"cursor-pointer rounded-[50%] h-full min-w-[24px] flex items-center justify-center"}>
              <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#EEEEEE]"}/>
            </div>
            <div className={"flex flex-col w-full justify-center items-center text-center mx-[14px] md:mx-6"}>
              <p className={"text-[#383838] text-base font-bold"}>{currentQuantity}</p>
            </div>
            <div onClick={() => handleAddToCart(data)}
                 className={"cursor-pointer rounded-[50%] h-full min-w-[24px] flex items-center justify-center"}>
              <div
                  className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838] after:content-[''] after:min-w-[12.5px] after:h-[1.5px] after:bg-[#383838] after:rounded after:rotate-90 after:absolute"}/>
            </div>
          </div>

        </div>
      </div>
  );
}

export default Quantity;
