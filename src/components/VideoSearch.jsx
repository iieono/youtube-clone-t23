import React from 'react'
import ChannelDefault from '../assets/channeldefault.png'
import { Link } from 'react-router-dom';

function VideoSearch({ video }) {
    console.log(video)

    function getLastSpaceIndex(text) {
        if (text.length > 200) {
          text = text.substring(0, 200);
        }
      
        const lastSpaceIndex = text.lastIndexOf(' ');
      
        return lastSpaceIndex;
      }
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
    <Link to={`/video/${video.video_id}`} className='flex w-full rounded-lg'>
          <div className='w-1/2 sm:w-2/6 p-3 relative flex'>
            <img src={video?.thumbnails[0]?.url}
            className='rounded-lg'/>
            <p className="absolute bottom-4 sm:right-8 right-5 rounded-md bg-black px-2 text-center text-sm">
          {video?.video_length}
        </p>
          </div>
          <div className='w-1/2 sm:w-4/6 p-2 flex flex-col gap-2'>
            <p className='font-bold'>{video?.title}</p>
            <p className='text-sm text-gray-400'>
              <span>{formatNumber(video?.number_of_views)} views</span>
              <span> • </span>
              <span>{video?.published_time}</span>
            </p>
            <div className='flex h-6 gap-2'>
              <img
              className='w-6 rounded-full'
               src={ChannelDefault} />
              <Link to={`/channel/${video.channel_id}`} className='text-gray-400'>{video?.author}</Link>
            </div>
            <p className='text-gray-400 text-sm'>{video?.description.slice(0, getLastSpaceIndex(video?.description))}</p>
          </div>
      </Link>
  )
}

export default VideoSearch