import { API } from "@/api";
import { dp, dp1, dp2, dp3 } from "@/assets";
import { ArrowLeft, ListFilter, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const NewChats = ({ createNewChat, data, setAddUsers }) => {
  const [list, setList] = useState([]);

  const formatData = (data) => {
    if (data) {
      const arr = [];
      data.map((i) => {
        const obj = {};
        obj.src = i?.profilePicture;
        obj.name =
          i?.username?.slice(0, 1).toUpperCase() + i?.username?.slice(1);
        obj.lastSeen = "Today at 5:30 PM";
        obj.userData = i;
        arr.push(obj);
      });
      setList(arr);
    }
  };
  useEffect(() => {
    console.log(data);
    formatData(data);
  }, [data]);

  return (
    <div className="bg-[#111b21] max-w-[15vw] min-w-[15vw]  h-full">
      {/* banner */}
      <div className=" min-h-[9vh] text-gray-400 bg-[#343f46] flex justify-start gap-6 px-4 py-2 items-end">
        <ArrowLeft
          onClick={() => setAddUsers(false)}
          className="cursor-pointer"
        />
        <p className="text-lg font-semibold">New chat</p>
      </div>

      {/* filter */}
      <div className="flex items-center justify-center h-12 w-full p-2 text-gray-600">
        <div className="bg-[#343f46] flex py-2  rounded-xl justify-between px-4 items-center w-full">
          <Search size={15} />
          <input
            className="ml-2 text-xs flex-1 bg-[#343f46] outline-none text-gray-600"
            placeholder="Search or start new chat"
          />
        </div>
        <ListFilter className="ml-2 hover: cursor-pointer" size={20} />
      </div>

      {/* details  */}
      {list.map((i, index) => {
        return (
          // <div
          //   className="flex flex-col justify-center "
          //   key={index}
          // >
          <div
            className="flex min-w-[15vh] items-center hover:bg-[#343f46] cursor-pointer  p-2 space-y-1 overflow-y-auto "
            onClick={() => createNewChat(i?.userData)}
            key={index}
          >
            <Image
              src={i?.src || dp1}
              alt=""
              height={250}
              width={250}
              className="rounded-full h-8 w-8"
            />
            <div className="flex flex-1 justify-start items-start ml-2">
              <div className="text-sm font-semibold text-white">{i?.name}</div>
              {/* <div className="text-xs text-gray-600">{i?.lastSeen}</div> */}
            </div>
            <div className="flex-1 flex justify-end">
              <div className="h-3 w-3 bg-green-500 rounded-full self-end mr-1"></div>
            </div>
          </div>
          // </div>
        );
      })}
    </div>
  );
};

export default NewChats;
