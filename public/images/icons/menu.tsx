interface IHome {
  color?: string;
  classes?: string;
  width?: number;
  height?: number;
}

function Menu({color, classes, width = 13, height = 14}: IHome) {
  return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 5.75H19.25" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.75 18.25H19.25" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.75 12H19.25" stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

  );
}

export default Menu;