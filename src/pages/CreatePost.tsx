import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReusableInput } from "../components";
import { supabase } from "../utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../providers/ReduxProvider";
import VideoUpload from "../components/VideoUpload";

const validate = (value: string): string => {
  if (!value) return "Field is required.";
  return "";
};

const CreatePost = () => {
  const [desc, setDesc] = useState<string>("");
  const [hashtags, setHashtags] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File[]>([]);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.global.user);

  const CDN_URL =process.env.REACT_APP_CDN_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { data, error } = await supabase
        .from("POSTS")
        .insert([
          {
            id: uuidv4(),
            description: desc,
            hashtags: hashtags,
            user_id: user?.id ?? "",
          },
        ])
        .select("*");

      if (error) console.error(error);
      else console.log("Inserted:", data);

      if (data) {
        const links = await videoFile.map(async (v) => await uploadVideo(v));

        Promise.all(links).then((resolvedLinks) => {
          resolvedLinks.forEach(async (link) => {
            if (link) {
              const resp = await supabase
                .from("FILES")
                .insert([
                  {
                    id: uuidv4(),
                    post_id: data[0].id,
                    user_id: user?.id ?? "",
                    file_url: link.path,
                    type: link.type.split("/").includes("video"),
                  },
                ])
                .select("*");
              if (resp.error) {
                console.log("error", resp.error);
              } else {
                console.log("uploaded", link);
              }
            }
          });
        }).then(() => setTimeout(() => navigate("/posts"), 500));
      }
      
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadVideo = async (video: File) => {
    const filePath = `${user?.id}/${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, video, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("error upload", error);

      throw error;
    }

    return { path: `${CDN_URL}/${data.path}`, type: video.type };
  };

  return (
    <div className="max-w-md mt-10 p-6 bg-white rounded-lg justify-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <VideoUpload setVideoFile={setVideoFile} videoFile={videoFile} />
        <ReusableInput
          type="name"
          label="Description"
          name="description"
          placeholder="Enter Description"
          validate={(value) => {
            setDesc(value);
            return validate(value);
          }}
        />
        <ReusableInput
          type="name"
          label="Hashtags"
          name="hashtags"
          placeholder="Enter tags with commas"
          validate={(value) => {
            setHashtags(value);
            return validate(value);
          }}
        />
        <button
          type="submit"
          className="w-full bg-charcoalBlack text-white p-2 rounded mt-4 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
