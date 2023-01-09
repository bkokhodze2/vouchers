interface ILari {
  color?: string;
  classes?: string;
}

function Insta({color, classes}: ILari) {
  return (
      <svg className={`${classes}`} width="13" height="20" viewBox="0 0 13 20" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1 8V12H4V19H8V12H11L12 8H8V6C8 5.73478 8.10536 5.48043 8.29289 5.29289C8.48043 5.10536 8.73478 5 9 5H12V1H9C7.67392 1 6.40215 1.52678 5.46447 2.46447C4.52678 3.40215 4 4.67392 4 6V8H1Z"
            stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

  );
}

export default Insta;