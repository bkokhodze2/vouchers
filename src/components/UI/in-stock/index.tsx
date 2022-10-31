import {useCallback, useMemo, useState} from "react";

interface IInStock {
  max?: number
  current?: number
}

function InStock({max = 101, current = 52}: IInStock) {
  const [arr, setArr] = useState({})

  const calculatePercentage = () => {
    return (((current === null ? 0 : current) / max) * 100).toFixed(1)
  };

  const width = useMemo(calculatePercentage, [max, current]);

  return (
      <div className={"flex flex-1 flex justify-end items-center"}>
        <div className={"flex flex-1 flex justify-end items-center"}>
          <div className={"flex flex-1 items-center h-2 w-full max-w-[120px] relative rounded-[8px] bg-[#3838380d]"}>
            <div style={{width: `${width}%`}}
                 className={`h-1 rounded-[8px] bg-purple transition transition-all w-[0%]`}></div>
          </div>
          <p className={"ml-1"}>{current === null ? 0 : current}/{max}</p>
        </div>
      </div>
  );
}

export default InStock;
