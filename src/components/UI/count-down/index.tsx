import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';


interface IOfferItem {
  data: number,
}

const CountDown = ({data}: IOfferItem) => {
  const Complete = () => <span>დრო ამოიწურა !</span>;

// Renderer callback with condition
  const renderer = ({days, hours, minutes, seconds, completed}: any) => {

    if (completed) {
      // Render a completed state
      return <Complete/>;
    } else {
      // Render a countdown jsx
      return <span>{days} Days {hours}:{minutes}:{seconds}</span>;
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
