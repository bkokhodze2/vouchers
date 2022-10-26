interface ILari {
  color?: string;
  classes?: string;
}

function Watch({color, classes}: ILari) {
  return (
      <svg className={`${classes}`} width="20" height="20" viewBox="0 0 20 20" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z"
            stroke={color} strokeWidth="1.5"/>
        <path d="M10 5.03442V9.99994L12.4828 12.4827" stroke={color} strokeWidth="1.5"/>
      </svg>
  );
}

export default Watch;