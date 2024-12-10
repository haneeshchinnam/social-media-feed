import React from "react";
import { IButton } from "../interfaces";

const Button = ({
  text,
  buttonStyle,
  iconSize,
  leftIcon,
  rightIcon,
  textStyle,
  onClick
}: IButton) => {
  return (
    <button className={`flex items-center bg-charcoalBlack px-5 py-3 text-white rounded-3xl gap-4 ${buttonStyle}`} onClick={onClick}>
     { leftIcon && <img src={leftIcon} alt="left-icon" width={iconSize} height={iconSize} /> }
      <span className={`text-base font-bold ${textStyle}`}>{text}</span>
      { rightIcon && <img src={rightIcon} alt="left-icon" width={iconSize} height={iconSize} /> }
    </button>
  );
};

export default Button;
