interface IHome {
  color?: string;
  classes?: string;
  width?: number;
  height?: number;
}

function BarHeart({color, classes, width = 13, height = 14}: IHome) {
  return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M11.9938 5.8985C10.1944 3.8208 7.19378 3.2619 4.93922 5.16446C2.68468 7.06701 2.36727 10.2479 4.13778 12.4982L11.9938 20L19.8499 12.4982C21.6204 10.2479 21.3417 7.047 19.0484 5.16446C16.7551 3.28192 13.7933 3.8208 11.9938 5.8985Z"
              stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

  );
}

export default BarHeart;