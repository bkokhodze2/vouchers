import React, {useEffect, useState} from "react";

function Quantity({getCount}: any) {

  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() => {
    getCount(quantity)
  }, [quantity])

  return (
      <div className={"rounded-xl bg-[#EEEEEE] h-[48px] w-full flex items-center"}>
        <div className={"rounded-[10px] bg-[white] h-full w-full py-1 flex items-center"}>
          <div onClick={() => setQuantity((prevState: number) => prevState - 1)}
               className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
            <div className={"min-w-[12.5px] h-[1.5px] rounded bg-[#EEEEEE]"}/>
          </div>
          <div className={"flex flex-col w-full justify-center items-center text-center"}>
            <p className={"text-[#383838] text-base"}>Quantity</p>
            <p className={"text-[#383838] text-base font-bold"}>{quantity}</p>
          </div>
          <div onClick={() => setQuantity((prevState: number) => prevState + 1)}
               className={"cursor-pointer rounded-[50%] h-6 w-6 flex items-center justify-center"}>
            <div
                className={"min-w-[12.5px] h-[1.5px] rounded bg-[#383838] after:content-[''] after:min-w-[12.5px] after:h-[1.5px] after:bg-[#383838] after:rounded after:rotate-90 after:absolute"}/>
          </div>
        </div>
      </div>
  );
}

export default Quantity;
