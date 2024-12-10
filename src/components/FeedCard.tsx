import google from "../assests/google.svg";
import image1 from "../assests/image1.png";
import image2 from "../assests/image2.png";
import heart from "../assests/heart.svg";
import navigation from "../assests/navigation.svg";
import Button from "./Button";

const FeedCard = ({ images, hashtags }: { images: string[], hashtags: string[] }) => {
  const displayImages =
    images && images.length > 0
      ? images
      : [image1, image2, image1, image2, image1, image2, image1];

  const renderImageLayout = () => {
    switch (displayImages.length) {
      case 1:
        return (
          <div className="w-full h-full">
            <div className="relative w-full h-full group overflow-hidden">
              <img
                src={displayImages[0]}
                alt="Single full-size"
                className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-full">
            <div className="row-span-2 relative group overflow-hidden">
              <img
                src={displayImages[0]}
                alt="Large left"
                className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
              />
            </div>
            <div className="relative group overflow-hidden">
              <img
                src={displayImages[1]}
                alt="Top right small"
                className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
              />
            </div>
            <div className="relative group overflow-hidden">
              <img
                src={displayImages[2]}
                alt="Bottom right small"
                className="w-full h-full object-cover 
                      group-hover:scale-105 group-hover:brightness-90
                      transition-all duration-300 ease-in-out rounded-xl"
              />
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
                <img
                  src={img}
                  alt={`Grid ${index + 1}`}
                  className="w-full h-full object-fill 
                        group-hover:scale-105 group-hover:brightness-90
                        transition-all duration-300 ease-in-out rounded-xl"
                />
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
    <section className="rounded-3xl bg-lilacPurple w-full p-4">
      <div className="flex gap-4 mb-4">
        <img
          src={google}
          alt="profile-pic"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-black font-semibold text-base">Aarav</p>
          <p className="text-[10px] font-normal text-black opacity-40">2 hours ago</p>
        </div>
      </div>
      <p className="text-xs font-normal">
        just arrived in New York City! Excited to explore the sights, sounds,
        and energy of this amazing place. 🗽
      </p>
      <div className="flex gap-1 mb-3">
      {
        hashtags.map((tag) => <p className="text-sm text-azureBlue" key={tag}>#{tag}</p>)
      }
      </div>
      <div className="relative w-full h-64 mx-auto">{renderImageLayout()}</div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-1 items-center">
          <img src={heart} alt="heart-image" width={16} height={16} />
          <p className="text-coralPink">67</p>
        </div>
        <Button
          text="Share"
          buttonStyle="bg-smokeGray text-black !gap-2 py-[6px]"
          leftIcon={navigation}
          textStyle="text-black"
        />
      </div>
    </section>
  );
};

export default FeedCard;
