import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeVideo from "../components/HomeVideo";
import { useSelector, useDispatch } from "react-redux";
import { selectInteract } from "../store/slices/interactSlice";

function Home() {
  const interact = useSelector(selectInteract);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    handleTrending();
  }, []);

  const handleTrending = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v2.p.rapidapi.com/trending/',
      params: {
        lang: 'en',
        country: 'us',
        section: 'Now'
      },
      headers: {
        'X-RapidAPI-Key': interact.API_KEY_YT,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.videos);
      setVideos(response.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-5">
      <div class={`${
        interact.sidebar ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4":
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
      }`}
      >
        {videos && videos.map((video)=>{
          return(
            <HomeVideo videoProp={video} />
          )
        })}
      </div>
    </div>
  );
}

export default Home;
