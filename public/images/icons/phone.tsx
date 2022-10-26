interface ILari {
  color?: string;
  classes?: string;
}

function Phone({color, classes}: ILari) {
  return (
      <svg className={`${classes}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.14286 1H2.63636C1.73262 1 1 1.73262 1 2.63636C1 11.6738 8.32625 19 17.3636 19C18.2673 19 19 18.2673 19 17.3636V13.8571L15.1429 11.2857L13.1428 13.2857C12.7955 13.6331 12.2763 13.7411 11.8398 13.5157C11.0996 13.1332 9.89833 12.4147 8.7143 11.2857C7.50195 10.1297 6.79163 8.88412 6.43512 8.13048C6.23532 7.70804 6.35099 7.22044 6.68141 6.89002L8.7143 4.85714L6.14286 1Z"
            stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

  );
}

export default Phone;