import { API } from "@/api";
import { dp, dp1, dp2, dp3 } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ActiveChats = ({ setValue, value }) => {
  const getAllChats = async () => {
    try {
      const res = await API.getAllChats();
      console.log(res?.data?.data);
      formatData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [list, setList] = useState([1]);

  const formatData = (data) => {
    if (data) {
      const arr = [];
      data.map((i) => {
        const obj = {};
        obj.src = i?.Participants[0]?.user?.profilePicture;
        obj.name =
          i?.Participants[0]?.user?.username?.slice(0, 1).toUpperCase() +
          i?.Participants[0]?.user?.username?.slice(1);
        obj.lastSeen = "Today at 5:30 PM";
        obj.lastMessage = i?.Messages[0] || "";
        let x = i?.Participants[0]?.user;
        x.chatId = i?.id;
        obj.userData = x;
        arr.push(obj);
      });
      console.log(arr);
      setList(arr);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div>
      {list.map((i, index) => {
        return (
          <div
            className="flex flex-col justify-center space-y-1 -mx-2 overflow-y-auto"
            key={index}
          >
            <div
              className={`flex flex-row items-center hover:bg-[#343f46] ${
                i?.userData?.chatId == value?.chatId && "bg-[#343f46]"
              } cursor-pointer  p-2`}
              onClick={() => setValue(i?.userData)}
            >
              <Image
                src={i?.src || dp1}
                alt=""
                height={250}
                width={250}
                className="rounded-full h-8 w-8"
              />
              <div className="flex flex-col justify-start items-start ml-2 text-gray-600">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm flex-1 font-semibold text-white">
                    {i?.name}
                  </p>
                  <p className="text-xs ">{i?.lastSeen}</p>
                </div>
                <p className="text-xs ">{i?.lastMessage?.content || ""} ...</p>
              </div>
              {/* <div className="flex-1 flex justify-end">
            <div className="h-3 w-3 bg-green-500 rounded-full self-end mr-1"></div>
          </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveChats;
