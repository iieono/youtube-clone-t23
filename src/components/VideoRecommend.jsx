import React from "react";
import ChannelDefault from "../assets/channeldefault.png"
import { Link } from "react-router-dom";

function VideoRecommend({video}) {
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
    <Link to={`/video/${video.video_id}`} className="p-2 flex gap-2 w-full cursor-pointer hover:bg-stone-700 rounded-lg">
      <div className="w-2/6">
        <img
          src={video.thumbnails[0].url}
          alt="video thumbnail"
          className="w-full h-fit"
        />
      </div>
      <div className="w-4/6 flex flex-col gap-1">
        <p className="text-sm font-semibold">{video?.title?.slice(0, 20)}</p>
        <Link to={`/channel/${video.channel_id}`} className="text-sm cursor-pointer ">{ video?.author }</Link>
        <p className="text-xs text-gray-400">
          <span>{formatNumber(video?.number_of_views)} views</span>
          <span> • </span>
          <span>{video?.published_time}</span>
        </p>
      </div>
    </Link>
  );
}

export default VideoRecommend;
