import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Home from './pages/Home'
import VideoDetails from './pages/VideoDetails'
import ChannelDetails from './pages/ChannelDetails'
import SearchResults from './pages/SearchResults'
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  const location = useLocation();
  console.log(
    "Current Path:",
    location.pathname + location.search + location.hash
  );

  return (<div className="h-screen w-screen overflow-auto bg-stone-800 text-white">
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Home /> } />
        <Route path="video/:id" element={ <VideoDetails /> } />
        <Route path="channel/:id" element={ <ChannelDetails /> } />
        <Route path="search/:searchvalue" element={ <SearchResults /> } />
      </Route>
    </Routes>
  </div>)
}

export default App;
