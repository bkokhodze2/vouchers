interface IHome {
  color?: string;
  classes?: string;
  width?: number;
  height?: number;
}

function home({color, classes, width = 13, height = 14}: IHome) {
  return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
            stroke="#383838" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
            stroke="#383838" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

  );
}

export default home;