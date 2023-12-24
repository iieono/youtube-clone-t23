import React, { useEffect, useState } from 'react'
import VideoSearch from '../components/VideoSearch'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { selectInteract } from "../store/slices/interactSlice";


function SearchResults() {
  const interact = useSelector(selectInteract);
  const [videos, setVideos] = useState([])
  const { searchvalue } = useParams()
  useEffect(()=>{
    getVideos()
  },[searchvalue])

  const getVideos = async () =>{
    const options = {
      method: 'GET',
      url: 'https://youtube-v2.p.rapidapi.com/search/',
      params: {
        query: searchvalue,
        lang: 'en',
        order_by: 'this_month',
        country: 'us'
      },
      headers: {
        'X-RapidAPI-Key': interact.API_KEY_YT,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    };
    console.log(options)
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setVideos(response.data.videos)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='p-5 w-full flex flex-col gap-2'>
      {videos && videos.map((video)=>{
        return(
          <VideoSearch video={video} />
        )
      })}
    </div>
  )
}

export default SearchResults