import React from "react";
import { ShareModalProps } from "../interfaces/CustomModal";
import ShareIcon from "./ShareIcon";
import twitter from "../assests/twitter.svg";
import facebook from "../assests/facebook.svg";
import reddit from "../assests/reddit.svg";
import discord from "../assests/discord.svg";
import whatsapp from "../assests/whatsapp.svg";
import messanger from "../assests/messenger.svg";
import telegram from "../assests/telegram.svg";
import instagram from "../assests/instagram.svg";
import copy from "../assests/copy.svg";

const CustomModal = ({ isOpen, onClose, onShare }: ShareModalProps) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
          <div className="p-6">
            <div className=" flex justify-between items-center">
              <h2 className="text-xl font-bold">Share post</h2>
              <button
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 my-4">
              <ShareIcon
                icon={twitter}
                iconColor={"bg-powderBlue"}
                title="Twitter"
              />
              <ShareIcon
                icon={facebook}
                iconColor={"bg-powderBlue"}
                title="Facebook"
              />
              <ShareIcon
                icon={reddit}
                iconColor={"bg-powderBlue"}
                title="Reddit"
              />
              <ShareIcon
                icon={discord}
                iconColor={"bg-powderBlue"}
                title="Discord"
              />
              <ShareIcon
                icon={whatsapp}
                iconColor={"bg-powderBlue"}
                title="WhatsApp"
              />
              <ShareIcon
                icon={messanger}
                iconColor={"bg-powderBlue"}
                title="Messanger"
              />
              <ShareIcon
                icon={telegram}
                iconColor={"bg-powderBlue"}
                title="Telegram"
              />
              <ShareIcon
                icon={instagram}
                iconColor={"bg-powderBlue"}
                title="Instagram"
              />
            </div>
            <h2 className="mb-2">Page Link</h2>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-mistGray text-darkGray"
                value="https://www.arnav/feed"
                readOnly
              />
              <button
                className="absolute right-4 top-3"
                onClick={async () =>
                  await navigator.clipboard.writeText("fgdd")
                }
              >
                <img src={copy} alt="copy" color="text-lightGray" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
