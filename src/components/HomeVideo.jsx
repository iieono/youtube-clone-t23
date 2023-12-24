import React from "react";
import { Link } from "react-router-dom";
import ChannelImage from "../assets/channeldefault.png"

function HomeVideo({ videoProp }) {
  const video = videoProp;
  console.log(video);
  function formatNumber(num) {
    if (num >= 1000000000) {
      return formatResult(num / 1000000000) + "B";
    } else if (num >= 1000000) {
      return formatResult(num / 1000000) + "M";
    } else if (num >= 1000) {
      return formatResult(num / 1000) + "K";
    } else {
      return num.toString();
    }
  }

  function formatResult(value) {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  }

  return (
    <Link to={`/video/${video.video_id}`} className="border border-transparent hover:border-blue-300 p-1 rounded shadow-sm max-w-maxg">
      <div className="relative p-1 cursor-pointer">
        <img
          src={video.thumbnails[2].url}
          alt="Video Thumbnail"
          className="w-full rounded-lg"
        />
        <p className="absolute bottom-2 right-2 rounded-md bg-black px-2 text-center text-sm">
          {video?.video_length}
        </p>
      </div>
      <div className="flex gap-1 mt-1 ">
        <div className="sm:w-2/12 p-1 flex justify-center">
          <img
            src={ChannelImage}
            className="rounded-full w-10 h-10 md:w-11 md:h-11"
          />
        </div>
        <div className="sm:w-10/12">
          <h2 className="text-lg cursor-pointer my-1 leading-5">
            {video?.title}
          </h2>
          <Link to={`/video/${video.channel_id}`} className="text-gray-400 ">{video?.author}</Link>
          <p className="text-gray-400 text-sm">
            <span>{formatNumber(video?.number_of_views)} views</span>
            <span> • </span>
            <span>{video?.published_time}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HomeVideo;
