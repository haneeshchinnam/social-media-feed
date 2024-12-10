import React from "react";
import image1 from "../assests/image1.png";
import heart from "../assests/heart.svg";

const PostCard = () => {
  return (
    <div className="rounded-xl h-48 relative w-40">
      <img src={image1} alt="image1" className="h-48 w-40" />
      <p className="absolute top-2 right-1 z-10 w-6 h-5 bg-white rounded-[10px] text-[10px] flex justify-center items-center">
        1/2
      </p>
      <p className="ml-2 text-sm font-semibold text-white absolute bottom-8 l-2">
        Design meet
      </p>
      <div className="ml-2 bottom-4 absolute flex gap-1 items-center">
        <img src={heart} alt="heart-image" width={16} height={16} />
        <p className="text-xs text-white">67</p>
      </div>
    </div>
  );
};

export default PostCard;
