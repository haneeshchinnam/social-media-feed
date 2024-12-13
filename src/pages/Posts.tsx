import { useEffect, useState } from "react";
import floatingButton from "../assests/add_floating_button.svg";
import { FeedCard } from "../components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils";
import { IPost, IUserProfile } from "../interfaces/Post";
import { useAppSelector } from "../providers/ReduxProvider";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const user = useAppSelector((state) => state.global.user)

  const getProfile = async () => {
    const { data } = await supabase.from("PROFILE").select("*").eq("id", user?.id);
    if(data) {
        setProfile(data[0])
    }
  }

  const getPosts = async () => {
    const { data, error } = await supabase.from("POSTS").select(
      `
    id,
    created_at,
    description,
    hashtags,
    user_id,
    PROFILE (
      name,
      profile_pic
    ),
    FILES (
      id,
      created_at,
      file_url,
      user_id,
      type
    )
  `
    );

    if (error) {
      console.error(error);
    } else {
      const mappedData = data.map((list) => ({
        id: list.id,
        profilePic: (
          list.PROFILE as unknown as {
            name: any;
            profile_pic: any;
          }
        ).profile_pic,
        images: list.FILES.map((file) => ({
          src: file.file_url,
          type: file.type,
        })),
        hashtags: list.hashtags.split(","),
        name: (
          list.PROFILE as unknown as {
            name: any;
            profile_pic: any;
          }
        ).name,
        desc: list.description,
        user_id: list.user_id
      }));
      setPosts(mappedData);
    }
  };

  useEffect(() => {
    getPosts();
    getProfile();
  }, []);

  return (
    <main className="w-screen flex  justify-center">
      <section className="m-4 max-w-[35rem]">
      <section className="flex gap-2 items-center">
        <button onClick={() => navigate("/profile", { state: { profile: profile, posts: posts.filter((l) => l.user_id) } })}>
          <img
            src={profile?.profile_pic}
            alt="pofile-pic"
            className="rounded-full object-cover w-12 h-12"
          />
        </button>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] text-semiTransparentBlack">Welcome Back</p>
          <p className="text-base text-black font-semibold">{profile?.name}</p>
        </div>
      </section>
      <p className="font-extrabold text-2xl py-4">Feeds</p>
      <div className="flex flex-col gap-1 h-[calc(100vh-13rem)] overflow-y-auto">
      {posts.map((post) => (
        <FeedCard
          key={post.id}
          hashtags={post.hashtags}
          images={post.images}
          desc={post.desc}
          name={post.name}
          profile_pic={post.profilePic}
        />
      ))}
      </div>
      <button
        className="absolute z-50 bottom-1 right-4 cursor-pointer"
        onClick={() => navigate("/create-post")}
      >
        <img src={floatingButton} alt="floating-button" />
      </button>
      </section>
    </main>
  );
};

export default Posts;
