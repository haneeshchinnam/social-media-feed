import React from "react";

const ShareIcon = ({
  icon,
  iconColor,
  title,
  onClick,
}: {
  icon: string;
  iconColor: string;
  title: string;
  onClick?: () => null;
}) => {
  return (
    <button className="flex flex-col items-center gap-2" onClick={onClick}>
      <div
        className={`w-16 h-16 rounded-full flex justify-center items-center ${iconColor}`}
      >
        <img src={icon} alt={icon + " alt"} width={"w-6"} height={"h-6"} />
      </div>
      <p className="text-xs text-darkGray">{title}</p>
    </button>
  );
};

export default ShareIcon;
