import React from 'react';
import Countdown from 'react-countdown';


interface IOfferItem {
  data: number,
}

const CountDown = ({data}: IOfferItem) => {
  const Complete = () => <span className={"aveSofRegular"}>დრო ამოიწურა !</span>;

// Renderer callback with condition
  const renderer = ({days, hours, minutes, seconds, completed}: any) => {

    if (completed) {
      // Render a completed state
      return <Complete/>;
    } else {
      // Render a countdown jsx
      return <span
          className={"sm:text-base text-[14px] font-[500] aveSofMedium"}>{days} დღე {hours}:{minutes}:{seconds}</span>;
    }
  };

  return (
      <Countdown
          date={data}
          renderer={renderer}
      />
  )
}
export default CountDown;
