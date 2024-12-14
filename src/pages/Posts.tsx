import { useEffect, useRef, useState } from "react";
import floatingButton from "../assests/add_floating_button.svg";
import { CustomModal, FeedCard } from "../components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils";
import { IPost, IUserProfile } from "../interfaces/Post";
import { useAppSelector } from "../providers/ReduxProvider";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const user = useAppSelector((state) => state.global.user);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, link: '' })
  const limit = 20;
  const lastPostRef = useRef(null);

  const getProfile = async () => {
    const { data } = await supabase
      .from("PROFILE")
      .select("*")
      .eq("id", user?.id);
    if (data) {
      setProfile(data[0]);
    }
  };

  const getPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    let query = supabase
      .from("POSTS")
      .select(
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
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (lastPostRef.current) {
      query = query.lt("created_at", lastPostRef.current);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error.message);
      setLoading(false);
      return;
    }

    if (data.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
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
        user_id: list.user_id,
        created_at: list.created_at,
      }));

      setPosts((prevPosts) => {
        const allPosts = [...prevPosts, ...mappedData];
        const uniquePosts = allPosts.filter(
          (post, index, self) =>
            self.findIndex((p) => p.id === post.id) === index
        );
        return uniquePosts;
      });

      lastPostRef.current = data[data.length - 1]?.created_at;
    }

    setLoading(false);
  };

  const observerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (observerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        observerRef.current || {};
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        hasMore && getPosts();
      }
    }
  };

  const shareToPlatform = (platform: string, link: string) => {
    const encodedLink = encodeURIComponent(link)
    const shareURLs = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedLink}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
      reddit: `https://www.reddit.com/submit?url=${encodedLink}`,
      discord: `https://discord.com/channels/@me`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedLink}`,
      messenger: `https://www.messenger.com/share?link=${encodedLink}`,
      telegram: `https://t.me/share/url?url=${encodedLink}`,
      instagram: null,
    };

    const url = shareURLs[platform as keyof typeof shareURLs];
    if (url) {
      window.open(url, "_blank");
    } else {
      alert(
        "Instagram does not support direct link sharing. Use the app instead."
      );
    }
  };

  useEffect(() => {
    const container = observerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShare = (link: string) => setModal({ isOpen: true, link })

  return (
    <main className="w-screen flex">
      <section className="m-4 max-w-[35rem]">
        <section className="flex gap-2 items-center justify-start w-full">
          <button
            onClick={() =>
              navigate("/profile", {
                state: {
                  profile: profile,
                  posts: posts.filter((l) => l.user_id === user?.id),
                },
              })
            }
          >
            <img
              src={profile?.profile_pic}
              alt="pofile-pic"
              className="rounded-full object-cover w-12 h-12"
            />
          </button>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] text-semiTransparentBlack">
              Welcome Back
            </p>
            <p className="text-base text-black font-semibold">
              {profile?.name}
            </p>
          </div>
        </section>
        <p className="font-extrabold text-2xl py-4">Feeds</p>
        <div
          className="flex flex-col gap-2 h-[calc(100vh-13rem)] overflow-y-auto no-scrollbar"
          ref={observerRef}
        >
          {posts.map((post) => (
            <button key={post.id}>
              <FeedCard
                hashtags={post.hashtags}
                images={post.images}
                desc={post.desc}
                name={post.name}
                profile_pic={post.profilePic}
                onShare={() => onShare(`${window.location.origin}/post/${post.id}`)}
                onClick={() => navigate(`/post/${post.id}`)}
              />
            </button>
          ))}
          {loading && <p>Loading...</p>}
        </div>
        <button
          className="absolute z-50 bottom-1 right-4 cursor-pointer"
          onClick={() => navigate("/create-post")}
        >
          <img src={floatingButton} alt="floating-button" />
        </button>
      </section>
      <CustomModal isOpen={modal.isOpen} link={modal.link} onClose={() => setModal({ isOpen: false, link: "" })} onShare={shareToPlatform} />
    </main>
  );
};

export default Posts;
