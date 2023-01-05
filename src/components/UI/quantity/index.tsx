import React, {useState} from "react";

import {useDispatch} from "react-redux";
import {addToCart, decreaseCart,} from "../../slices/cartSlice";
import {notification} from "antd";
// @ts-ignore
import {ICONS} from "public/images";

interface IQuantity {
  getCount: any,
  freeQuantity: number,
  quantityInCart: number,
  currentQuantity: number,
  data: any,
  isPoint: boolean
}

function Quantity({freeQuantity, getCount, quantityInCart, currentQuantity, data, isPoint}: IQuantity) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(currentQuantity)

  const handleAddToCart = (product: any) => {

    if (freeQuantity > 0) {
      dispatch(addToCart(product));

      // notification['success']({
      //   message: 'რაოდენობა გაიზარდა',
      // });
    } else {
      notification['error']({
        message: 'რაოდენობა არ არის',
      });
    }

  };

  const handleDecreaseCart = (product: any) => {

    dispatch(decreaseCart(product));

    // notification['success']({
    //   message: 'რაოდენობა შემცირდა',
    // });

  };


  return (
      <div className={"rounded-xl bg-[#EEEEEE] h-[32px] md:h-[48px] w-full flex items-center"}>
        <div
            className={"rounded-[10px] bg-[#EEEEEE] h-full w-full py-0 md:py-1 pl-0 mr-0 md:pr-1 flex items-center"}>
          <p className={"text-[#383838b3] text-base 2xl:mx-6 mx-3 hidden md:flex aveSofRegular"}>რაოდენობა</p>

          <div className={"flex h-full items-center bg-[white] rounded-[10px]"}>
            <div onClick={() => handleDecreaseCart(data)}
                 className={"cursor-pointer rounded-[50%] h-full min-w-[40px] 2xl:min-w-[56px] flex items-center justify-center"}>

              {/*{currentQuantity === 1 ? <Image*/}
              {/*    src={ICONS.trash}*/}
              {/*    quality={70}*/}
              {/*    loading={"lazy"}*/}
              {/*    alt={"trash icon"}*/}
              {/*    width={18}*/}
              {/*    height={18}/> : <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838]"}/>}*/}
              <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838]"}/>
            </div>
            <div className={"flex flex-col w-full justify-center items-center text-center mx-[5px]"}>
              <p className={"text-[#383838]  text-base font-bold aveSofMedium"}>{currentQuantity}</p>
            </div>
            <div onClick={() => handleAddToCart(data)}
                 className={`plus ${freeQuantity > 0 && 'active'} cursor-pointer rounded-[50%] h-full min-w-[40px] 2xl:min-w-[56px] flex items-center justify-center`}>
              <div
                  style={{
                    backgroundColor: freeQuantity > 0 ? "#383838" : "#EEEEEE",
                  }}
                  className={"after min-w-[12.5px] h-[1.5px] rounded bg-[#383838] "}/>
            </div>
          </div>

        </div>
      </div>
  );
}

export default Quantity;
