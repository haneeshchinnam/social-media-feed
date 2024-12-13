import image1 from "../assests/heart.svg";
import { IPostProfile } from "../interfaces";
import Video from "./Video";

const PostCard = ({ count, desc, type, pic }: IPostProfile) => {
  
  return (
    <div className="rounded-xl h-48 relative w-40">
      {type ? <Video src={pic} /> : <img src={pic} alt="image1" className="h-48 w-40 rounded-xl" />}
      <p className="absolute top-2 right-1 z-10 w-6 h-5 bg-white rounded-[10px] text-[10px] flex justify-center items-center text-black">
        1/{count}
      </p>
      <p className="ml-2 text-sm font-semibold text-white absolute bottom-8 l-2">
        {desc}
      </p>
      <div className="ml-2 bottom-4 absolute flex gap-1 items-center">
       <img src={image1} alt="heart-image" width={16} height={16} />
        <p className="text-xs text-white">67</p>
      </div>
    </div>
  );
};

export default PostCard;
