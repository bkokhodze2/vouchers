interface IButton {
  text: string;
  textColor?: string;
  textSize?: number;
  bgColor?: string;
  height?: number;
  classes?: string;
}

function Button({text, classes, textColor = "#FFFFFF", textSize = 16, height = 48, bgColor = "#8338EC"}: IButton) {

  return (
      <div
          style={{backgroundColor: bgColor, height: height}}
          className={`h-[${height}px] rounded-xl w-min px-10 flex justify-center items-center cursor-pointer ${classes}`}>
        <p style={{color: textColor, fontSize: textSize}}
           className={`text-[${textColor}] !text-[14px] md:!text-[${textSize}px] font-normal whitespace-nowrap`}

        >{text}</p>
      </div>
  );
}

export default Button;
