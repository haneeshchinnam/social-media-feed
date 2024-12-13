import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import edit from "../assests/edit.svg";
import { Button, ReusableInput } from "../components";
import { supabase } from "../utils";
import { IProfile } from "../interfaces";
import { useAppSelector } from "../providers/ReduxProvider";

const validate = (value: string): string => {
  if (!value) return "Field is required.";
  return "";
};

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const user = useAppSelector((state) => state.global.user);
  const CDN_URL = process.env.REACT_APP_CDN_URL;

  const handleProfileFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileFile(file);
    }
  };

  const handleCoverFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverFile(file);
    }
  };

  const handleButtonClick = () => {
    if (profileRef.current) {
      profileRef.current.click();
    }
  };

  const handleCoverButtonClick = () => {
    if (coverRef.current) {
      coverRef.current.click();
    }
  };

  const backgroundImage = useMemo(
    () =>
      coverFile
        ? URL.createObjectURL(coverFile)
        : location.state?.cover_pic
        ? location.state?.cover_pic
        : "https://via.placeholder.com/100",
    [coverFile, location.state?.cover_pic]
  );

  async function upsertProfile(profile: IProfile) {
    const { data, error } = await supabase
      .from("PROFILE")
      .upsert(profile, { onConflict: "id" }).select("*");

    if (error) {
      console.error("Error upserting profile:", error);
    } else {
      console.log("Profile upserted successfully:", data);
      navigate("/posts", { replace: true })
    }
  }

  const uploadFile = async (image: File) => {
    const filePath = `${user?.id}/${uuidv4()}`;

    console.log("filepath", filePath, user);
    

    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("error upload", error);

      throw error;
    }

    return { path: `${CDN_URL}/${data.path}`, type: image.type };
  };

  const handleSubmit = async () => {
    let profile, cover;
    if (profileFile) {
      profile = await uploadFile(profileFile);
    }
    if (coverFile) {
      cover = await uploadFile(coverFile);
    }
    await upsertProfile({
      id: user?.id ?? uuidv4(),
      bio,
      ...(coverFile && {cover_pic: cover?.path ?? ""}),
      name,
      ...(profileFile && {profile_pic: profile?.path ?? ""}),
    });
  };

  useEffect(() => {
    setName(location.state?.name ?? "");
    setBio(location.state?.bio ?? "");
  }, [location.state]);

  return (
    <div>
      <div className="w-full absolute top-16 z-50">
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
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute bottom-[-50px] left-16 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                profileFile
                  ? URL.createObjectURL(profileFile)
                  : location.state?.profile_pic
                  ? location.state?.profile_pic
                  : "https://via.placeholder.com/100"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <button
          className="bg-gray rounded-full h-7 w-7 flex justify-center items-center absolute left-[84px] top-[250px] z-50"
          onClick={handleButtonClick}
        >
          <img src={edit} alt="edit-icon" />

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleProfileFileChange}
            className="hidden"
            ref={profileRef}
          />
        </button>
      </div>
      <button
        className="bg-gray rounded-full h-7 w-7 flex justify-center items-center absolute right-5 top-56 z-50"
        onClick={() => handleCoverButtonClick()}
      >
        <img src={edit} alt="edit-icon" />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleCoverFileChange}
          className="hidden"
          ref={coverRef}
        />
      </button>

      <div className="m-4 mt-14 h-">
        <ReusableInput
          type="name"
          label="Name"
          name="name"
          placeholder="Enter your Name"
          validate={(value) => {
            setName(value);
            return validate(value);
          }}
          val={name}
        />
        <ReusableInput
          type="name"
          label="Bio"
          name="bio"
          placeholder="Enter your bio"
          validate={(value) => {
            setBio(value);
            return validate(value);
          }}
          val={bio}
        />
        <section className="w-full flex justify-center">
          <Button
            text="Save"
            buttonStyle="w-80 absolute bottom-10 justify-center"
            onClick={handleSubmit}
          />
        </section>
      </div>
    </div>
  );
};

export default EditProfile;
