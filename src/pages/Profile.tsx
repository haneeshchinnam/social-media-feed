import floatingButton from "../assests/add_floating_button.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "../components";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="flex flex-col text-white">
      <div className="w-full absolute top-16 z-50 cursor-pointer">
        <button className="text-white" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <div
        className="relative w-full h-60 bg-cover bg-center rounded-b-xl"
        style={{
          backgroundImage: `url(${location.state?.profile?.cover_pic})`,
        }}
      >
        <div className="absolute bottom-[-50px] left-16 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
            <img
              src={location.state?.profile?.profile_pic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-1 w-full flex justify-end px-3">
        <button
          className="px-6 py-2 text-black bg-white rounded-full border border-gray-300"
          onClick={() =>
            navigate("/edit-profile", { state: location.state.profile })
          }
        >
          Edit Profile
        </button>
      </div>

      <div className="mx-3">
        <p className="text-xl text-black font-extrabold">
          {location.state?.profile?.name}
        </p>
        <p className="text-sm text-semiTransparentBlack">
          {location.state?.profile?.bio}
        </p>
        <p className="text-xl text-black mt-6 font-semibold">My Posts</p>

        <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 3xl:grid-cols-12 gap-4 h-[calc(100vh-28rem)] overflow-y-auto">
          {location.state.posts.map((post: any) => (
            <PostCard
            key={post.id}
              type={post.images[0].type}
              count={post.images.length}
              pic={post.images[0].src}
              desc={post.desc}
            />
          ))}
        </div>
        <button
          className="absolute z-50 bottom-1 right-4"
          onClick={() => navigate("/create-post")}
        >
          <img src={floatingButton} alt="floating-button" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
