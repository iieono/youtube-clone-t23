import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HomeVideo from '../components/HomeVideo'
import { useSelector, useDispatch } from "react-redux";
import { selectInteract } from "../store/slices/interactSlice";

function ChannelDetails() {
  const interact = useSelector(selectInteract);
  const { id } = useParams()
  const [channel, setChannel] = useState(null)
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelDetailsResult = await getChannel();
        console.log('Channel details:', channelDetailsResult);
  
        await new Promise(resolve => setTimeout(resolve, 500));
  
        const videoRecResult = await getVideos();
        console.log('Video recommendations:', videoRecResult);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [id]);
  

  const getVideos = async ()=>{
    const options = {
      method: 'GET',
      url: 'https://youtube-v2.p.rapidapi.com/channel/videos',
      params: {
        channel_id: id
      },
      headers: {
        'X-RapidAPI-Key': interact.API_KEY_YT,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setVideos(response.data.videos)
    } catch (error) {
      console.error(error);
    }
  }

  const getChannel = async()=>{
    const options = {
      method: 'GET',
      url: 'https://youtube-v2.p.rapidapi.com/channel/details',
      params: {
        channel_id: id
      },
      headers: {
        'X-RapidAPI-Key': interact.API_KEY_YT,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setChannel(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='h-full w-full flex flex-col p-5 gap-2 overflow-auto'>
      <div className='flex flex-col h-1/3'>
        <img 
          className='h-full object-center object-cover rounded-lg'
        src={channel?.banner[0]?.url || 'data:image/jpeg;base64,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'} />
      </div>
      <div className='flex gap-5 p-3'>
        <div className=''>
          <img 
          className='rounded-full w-20 h-20 sm:w-32 sm:h-32'
          src={channel?.avatar[0]?.url} />
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold'>{channel?.title}</p>
          <p className='text-gray-400'>
            <span>{channel?.subscriber_count}</span>
            {/* <span> - </span> */}
          </p>
          <p className='rounded-full bg-white p-2 text-center text-black cursor-pointer'>Subscribe</p>
        </div>
      </div>
      <hr className='m-2' />
      <div class={`${
        interact.sidebar ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4":
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      }`}
      >
        {videos && videos.map((video)=>{
          return(
            <HomeVideo videoProp={video} />
          )
        })}
      </div>
    </div>
  )
}

export default ChannelDetails