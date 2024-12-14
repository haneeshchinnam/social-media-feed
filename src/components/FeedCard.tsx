import navigation from "../assests/navigation.svg";
import Button from "./Button";
import Video from "./Video";

const FeedCard = ({
  images,
  hashtags,
  desc,
  name,
  profile_pic,
  onShare,
  onClick
}: {
  images: { src: string; type: boolean }[];
  hashtags: string[];
  desc: string;
  name: string;
  profile_pic: string;
  onShare: () => void
  onClick: () => void
}) => {
  const displayImages = images;

  const renderImageLayout = () => {
    switch (displayImages.length) {
      case 1:
        return (
          <div className="w-full h-full">
            <div className="relative w-full h-full group overflow-hidden">
              {displayImages[0].type ? (
                <Video src={displayImages[0].src} />
              ) : (
                <img
                  src={displayImages[0].src}
                  alt="Single full-size"
                  className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
            <div className="row-span-2 relative group overflow-hidden">
              {displayImages[0].type ? (
                <Video src={displayImages[0].src} />
              ) : (
                <img
                  src={displayImages[0].src}
                  alt="Large left"
                  className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
                />
              )}
            </div>
            <div className="relative group overflow-hidden">
              {displayImages[1].type ? (
                <Video src={displayImages[1].src} />
              ) : (
                <img
                  src={displayImages[1].src}
                  alt="Top right small"
                  className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
                />
              )}
            </div>
            <div className="relative group overflow-hidden">
              {displayImages[2].type ? (
                <Video src={displayImages[2].src} />
              ) : (
                <img
                  src={displayImages[2].src}
                  alt="Bottom right small"
                  className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
                />
              )}
            </div>
          </div>
        );

      case 2:
      case 4:
      default:
        return (
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            {displayImages.slice(0, 4).map((img, index) => (
              <div key={index} className="relative group overflow-hidden">
                {img.type ? (
                  <Video src={img.src} />
                ) : (
                  <img
                    src={img.src}
                    alt={`Grid ${index + 1}`}
                    className="w-full h-full object-fill 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
                  />
                )}
              </div>
            ))}
            {displayImages.length > 4 && (
              <div
                className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full 
                    w-10 h-10 flex items-center justify-center text-sm font-bold"
              >
                +{displayImages.length - 4}
              </div>
            )}
          </div>
        );
    }
  };
  return (
    <section className="rounded-3xl bg-lilacPurple w-full p-4 flex flex-col items-start">
      <div className="flex gap-4 mb-4">
        <img
          src={profile_pic}
          alt="profile-pic"
          width={40}
          height={40}
          className="rounded-full cursor-pointer"
        />
        <div className="flex flex-col items-start">
          <p className="text-black font-semibold text-base">{name}</p>
          <p className="text-[10px] font-normal text-black opacity-40">
            2 hours ago
          </p>
        </div>
      </div>
      <p className="text-xs font-normal flex-wrap text-start">
        {desc}
      </p>
      <div className="flex flex-wrap gap-1 mb-3">
        {hashtags.map((tag) => (
          <p className="text-sm text-azureBlue" key={tag}>
            #{tag}
          </p>
        ))}
      </div>
      <div className="relative w-full h-64 mx-auto" onClick={onClick}>{renderImageLayout()}</div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-1 items-center">
        </div>
        <Button
          text="Share"
          buttonStyle="bg-smokeGray text-black !gap-2 py-[6px]"
          leftIcon={navigation}
          textStyle="text-black"
          onClick={onShare}
        />
      </div>
    </section>
  );
};

export default FeedCard;
