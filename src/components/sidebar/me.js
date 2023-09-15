import { dp, dp1 } from "@/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, Pencil } from "lucide-react";
import Cookies from "js-cookie";
import { API } from "@/api";
const Me = ({ setProfile }) => {
  const [classHidden, setClassHidden] = useState("hidden");
  const [opacity, setOpacity] = useState("");
  const [me, setMe] = useState();
  const id = Cookies.get("id");
  const getMe = async () => {
    try {
      const res = await API.me(id);
      setMe(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, [id]);

  const showUpdate = () => {
    console.log("e");
    setClassHidden("");
    setOpacity("opacity-20 ");
  };
  const hideUpdate = () => {
    console.log("w");
    setClassHidden("hidden");
    setOpacity("");
  };

  const updateProfilePic = () => {
    console.log("function tw bana bharway");
  };

  return (
    <div className="bg-[#343f46] max-w-[15vw] min-w-[15vw]  h-full">
      {/* banner */}
      <div className=" min-h-[9vh] text-gray-400 flex justify-start gap-6 px-4 py-2 items-end">
        <ArrowLeft
          onClick={() => setProfile(false)}
          className="cursor-pointer"
        />
        <p className="text-lg font-semibold">Profile</p>
      </div>
      {/* pic */}
      <div className="flex flex-col items-center   w-full relative min-h-[14vh]">
        <div
          className={`h-36 w-36 rounded-full   overflow-hidden absolute  -bottom-6 cursor-pointer ${opacity}`}
          onMouseOver={showUpdate}
          onMouseOut={hideUpdate}
        >
          <Image
            src={me?.avatar || dp1}
            alt="Avatar"
            className="h-full w-full "
          />
        </div>
        <div
          className={`absolute ${classHidden} top-14 left-30 flex flex-col font-semibold justify-center items-center cursor-pointer`}
          onMouseOver={showUpdate}
          onMouseOut={hideUpdate}
          onClick={updateProfilePic}
        >
          <Camera color="white" />
          <p className="text-center text-sm text-gray-400">
            CHANGE PROFILE
            <br /> PHOTO
          </p>
        </div>
      </div>
      {/* details  */}
      <div className="mt-16 px-5">
        {/* username */}
        <div>
          <h1 className="text-[#00a884] mb-2">Your name</h1>
          <div className="flex justify-between">
            {/* input */}
            <p className="text-gray-400">~{me?.username}</p>
            <Pencil
              size={20}
              fill="#9ca3af"
              stroke="#343f46"
              className="cursor-pointer"
              onClick={() => console.log("function tw bana bharway")}
            />
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            This is not your username or pin. This name will be visible to your
            <br />
            "Krlete Hain" contacts.
          </p>
        </div>
        {/* about */}
        <div className="mt-8">
          <div className="flex justify-between">
            <h1 className="text-[#00a884] mb-2">About</h1>
            {/* input */}
            <Pencil
              size={20}
              fill="#9ca3af"
              stroke="#343f46"
              className="cursor-pointer"
              onClick={() => console.log("function tw bana bharway")}
            />
          </div>
          <p className="text-gray-400 text-sm">~{me?.bio}</p>
        </div>

        {/* Number */}
        <div className="mt-8">
          <h1 className="text-[#00a884] mb-2">Contact</h1>
          <div className="flex justify-between">
            {/* input */}
            <p className="text-gray-400 text-sm">~{me?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me;
