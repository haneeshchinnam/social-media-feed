import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../utils";

const Post = () => {
  const params = useParams();

  const [files, setFiles] = useState<
    {
      id: string;
      url: string;
      type: boolean;
    }[]
  >([]);
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    type: boolean;
  } | null>(null);

  const getFiles = async () => {
    const { data, error } = await supabase
      .from("FILES")
      .select("*")
      .eq("post_id", params.id);
    if (error) {
      console.error("Error fetching files:", error);
      return null;
    }

    return data.map((l) => ({
      id: l.id as string,
      url: l.file_url as string,
      type: l.type as boolean,
    }));
  };

  const closeFullScreen = () => setSelectedFile(null);

  useEffect(() => {
    const temp = getFiles();
    Promise.resolve(temp).then((l) => l ? setFiles(l) : null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="w-full absolute top-16 z-50">
        <button className="text-black" onClick={() => navigate(-1)}>
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
      <div className="flex flex-col gap-4 mt-10 h-full overflow-y-auto pl-4 pb-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="rounded overflow-hidden cursor-pointer"
            onClick={() => setSelectedFile({ url: file.url, type: file.type })}
          >
            {file.type ? (
              <video
                className="w-72 h-72 object-cover"
                preload="metadata"
                muted
              >
                <source src={file.url} type="video/mp4" />
              </video>
            ) : (
              <img
                src={file.url}
                alt={`file-${file.id}`}
                className="w-72 h-72 object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {selectedFile && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeFullScreen}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold"
              onClick={closeFullScreen}
            >
              ✕
            </button>

            {selectedFile.type ? (
              <video
                src={selectedFile.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <img
                src={selectedFile.url}
                alt="fullscreen-file"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
