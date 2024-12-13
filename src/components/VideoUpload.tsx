import React, {  } from "react";
import { useAppSelector } from "../providers/ReduxProvider";

interface IVideoUploadProps {
  videoFile: File[];
  setVideoFile: React.Dispatch<React.SetStateAction<File[]>>;
}

const VideoUpload = ({ setVideoFile, videoFile }: IVideoUploadProps) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const fileArray = Array.from(files ?? []);

    setVideoFile(fileArray);

    fileArray.forEach((file) => {
      console.log("Selected file:", file.name);
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Upload Files</h1>

      <input
        type="file"
        accept="image/*, image/png, image/jpeg, image/gif, image/bmp, image/webp, image/tiff,
video/*, video/mp4, video/avi, video/mkv, video/mov, video/wmv, video/flv, video/webm, video/mpeg
"
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
};

export default VideoUpload;
