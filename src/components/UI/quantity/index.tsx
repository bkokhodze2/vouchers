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


function Quantity({getCount, currentQuantity, data}: any) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(currentQuantity)

  const handleAddToCart = (product: any) => {
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
      <div className={"rounded-xl bg-[#EEEEEE] h-[48px] w-full flex items-center"}>
        <div className={"rounded-[10px] bg-[white] h-full w-full py-1 flex items-center"}>
          <div onClick={() => handleDecreaseCart(data)}
               className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
            <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#EEEEEE]"}/>
          </div>
          <div className={"flex flex-col w-full justify-center items-center text-center"}>
            <p className={"text-[#383838] text-base"}>Quantity</p>
            <p className={"text-[#383838] text-base font-bold"}>{currentQuantity}</p>
          </div>
          <div onClick={() => handleAddToCart(data)}
               className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
            <div
                className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838] after:content-[''] after:min-w-[12.5px] after:h-[1.5px] after:bg-[#383838] after:rounded after:rotate-90 after:absolute"}/>
          </div>
        </div>
      </div>
  );
}

export default Quantity;
