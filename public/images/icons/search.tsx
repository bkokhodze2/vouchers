interface IHome {
  color?: string;
  classes?: string;
  width?: number;
  height?: number;
}

function search({color, classes, width = 13, height = 14}: IHome) {
  return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19 19L14.3448 14.3448L19 19ZM1 8.75862C1 4.47365 4.47365 1 8.75862 1C13.0436 1 16.5172 4.47365 16.5172 8.75862C16.5172 13.0436 13.0436 16.5172 8.75862 16.5172C4.47365 16.5172 1 13.0436 1 8.75862Z"
            stroke="#383838" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

  );
}

export default search;