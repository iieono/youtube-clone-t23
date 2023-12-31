import React, { useEffect, useState } from "react";
import ChannelDefault from "../assets/channeldefault.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretDown,
  faEdit,
  faEllipsisVertical,
  faPaperPlane,
  faPen,
  faShare,
  faThumbsDown,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import VideoRecommend from "../components/VideoRecommend";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createComment, deleteComment, editComment, selectInteract } from "../store/slices/interactSlice";

// vlVUVsx6BYY

function VideoDetails() {
  const interact = useSelector(selectInteract);
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [expand, setExpand] = useState(false);
  const [comments, setComments] = useState([]);
  const [editId, setEditId] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [newCommentValue, setNewCommentValue] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoDetailsResult = await getVideoDetails();
        console.log("Video details:", videoDetailsResult);

        await new Promise((resolve) => setTimeout(resolve, 300));

        const videoRecResult = await getVideoRec(id);
        console.log("Video recommendations:", videoRecResult);
        await new Promise((resolve) => setTimeout(resolve, 400));

        const videoCommentsResult = await getVideoComments(id);
        console.log("Video comments:", videoCommentsResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  function getLastSpaceIndex(text) {
    if (text.length > 100) {
      text = text.substring(0, 100);
    }

    const lastSpaceIndex = text.lastIndexOf(" ");

    return lastSpaceIndex;
  }

  function timeAgo(timestamp) {
    const secondsAgo = Math.floor((Date.now() - new Date(timestamp)) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let unit in intervals) {
      const count = Math.floor(secondsAgo / intervals[unit]);
      if (count > 0) {
        return count + " " + (count === 1 ? unit : unit + "s") + " ago";
      }
    }
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

  const getVideoComments = async (idcom) => {
    const options = {
      method: "GET",
      url: "https://youtube-v2.p.rapidapi.com/video/comments",
      params: {
        video_id: idcom,
      },
      headers: {
        "X-RapidAPI-Key": interact.API_KEY_YT,
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const getVideoRec = async (idrec) => {
    const options = {
      method: "GET",
      url: "https://youtube-v2.p.rapidapi.com/video/recommendations",
      params: {
        video_id: idrec,
      },
      headers: {
        "X-RapidAPI-Key": interact.API_KEY_YT,
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setRecommendedVideos(response.data.videos);
    } catch (error) {
      console.error(error);
    }
  };

  const getVideoDetails = async () => {
    const options = {
      method: "GET",
      url: "https://youtube-v2.p.rapidapi.com/video/details",
      params: {
        video_id: id,
      },
      headers: {
        "X-RapidAPI-Key": interact.API_KEY_YT,
        "X-RapidAPI-Host": "youtube-v2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      setVideo(response.data);
      getVideoRec(response.data.video_id);
      getVideoComments(response.data.video_id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleVideoCreateComment = ()=>{
    if (!newCommentValue){
      return
    }
    const newCommentData = editItem ? {
      parent_id : id,
      text: newCommentValue,
      id : editItem.id
    } : {
      parent_id : id,
      text: newCommentValue,
    }
    if(editItem){
      dispatch(editComment(newCommentData))
    }else{
      dispatch(createComment(newCommentData))
    }
    setNewCommentValue("")
    setEditId(null)
    setEditItem(null)
  }
  const handleVideoEditChange = (item)=>{
    setEditId(item.id)
    setEditItem(item)
    setNewCommentValue(item.text)
  }

  const handleVideoDeleteComment = (item) =>{
    dispatch(deleteComment(item))
  }

  const [recommendedVideos, setRecommendedVideos] = useState([]);
  return (
    <div className="w-full h-full flex flex-col md:flex-row px-2 sm:px-5 py-3 overflow-y-scroll">
      <div className="flex flex-col w-full h-full md:w-9/12">
        <div className="h-100 bg-blue-300">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            className="w-full h-full min-h-[40vh] sm:min-h-[70vh]"
            allowFullScreen
          ></iframe>
        </div>
        <div className="py-2 px-1 w-full flex flex-col gap-2">
          <p className="text-lg font-semibold">{video?.title}</p>
          <div className="flex sm:items-center justify-between flex-col gap-3 sm:flex-row">
            <div className="flex gap-3 items-center cursor-pointer">
              <div className="w-10">
                <img
                  src={ChannelDefault}
                  alt="channel image"
                  className="w-full"
                />
              </div>
              <div>
                <Link
                  to={`/channel/${video?.channel_id}`}
                  className="font-bold"
                >
                  {video?.author}
                </Link>
                <p className="text-sm text-gray-400">12k subscribers</p>
              </div>
              <div className="p-3 bg-white text-black rounded-full h-8 flex items-center cursor-pointer">
                <p>Subscribe</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex cursor-pointer gap-3 justify-evenly rounded-full h-full w-full px-3.5 py-2 bg-stone-700">
                <FontAwesomeIcon icon={faThumbsUp} />
                <FontAwesomeIcon icon={faThumbsDown} />
              </div>
              <div className="flex justify-center items-center gap-2 rounded-full h-full w-full px-3.5 py-1 cursor-pointer bg-stone-700">
                <FontAwesomeIcon icon={faShare} />
                <p>Share</p>
              </div>
              <div className="flex items-center justify-center rounded-full h-full w-full px-3.5 py-2 cursor-pointer bg-stone-700">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-stone-700 px-3 py-2 text-ellipsis">
          <div className=" flex gap-2 font-semibold">
            <span>{video && formatNumber(video?.number_of_views)} views</span>
            <span>{timeAgo(video?.published_time)}</span>
          </div>
          {expand
            ? video?.description
            : video?.description.slice(
                0,
                getLastSpaceIndex(video?.description)
              )}
          <p
            className="font-semibold cursor-pointer"
            onClick={() => setExpand((state) => !state)}
          >
            {expand ? "Show less" : "...more"}
          </p>
        </div>
        <div className="mt-5">
        {video && <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
          <input id="editComment" value={newCommentValue} onChange={(e) => setNewCommentValue(e.target.value)} type="text" placeholder="Your opinion..." className=" px-3 py-3 bg-inherit focus:outline-none border w-full rounded-full h-full"/>
          <FontAwesomeIcon icon={faPaperPlane}  className="cursor-pointer bg-stone-800 p-3 rounded-full" onClick={handleVideoCreateComment}/>
        </div>}
        {interact.comments && interact.comments[id] &&
            interact.comments[id].map((comment) => {
              if(editId == comment.id){
                return
              }
              interact.comments[comment?.id]
              let newComment = ""
              const setNewComment = (text)=>{
                newComment = text
                console.log(newComment)
              }
              const handleCreateComment = ()=>{
                if (!newComment){
                  return
                }
                const newCommentData = editItem ? {
                  parent_id : comment.id,
                  text: newComment,
                  id : editItem.id
                } : {
                  parent_id : comment.id,
                  text: newComment,
                }
                if(editItem){
                  dispatch(editComment(newCommentData))
                }else{
                  dispatch(createComment(newCommentData))
                }
                var inputElement = document.getElementById("editComment");
                inputElement.value = ""
                setEditId(null)
                setEditItem(null)
              }

              return (
                <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                  <div className="w-12">
                    <img
                      src={ChannelDefault}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 items-center">
                      <p className="font-bold">@You</p>
                      <FontAwesomeIcon
                                  icon={faPen}
                                  onClick={()=>handleVideoEditChange(comment)}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                />
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                  onClick={()=>handleVideoDeleteComment(comment)}
                                />
                    </div>
                    <div>
                      <p>{comment?.text}</p>
                    </div>
                    <div className="flex gap-5 p-2 items-center">
                      <div className="flex gap-1 items-center">
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </div>
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </div>

                    {interact.comments[comment?.id] &&
                      interact.comments[comment?.id].map((item) => {
                        if(editId == item.id){
                          return
                        }
                        const handleEditChange = ()=>{
                          setEditId(item.id)
                          setEditItem(item)
                          var inputElement = document.getElementById("editInput");
                          inputElement.value = item.text
                        }

                        const handleDeleteComment = () =>{
                          dispatch(deleteComment(item))
                        }
                        return (
                          <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                            <div className="w-12">
                              <img
                                src={ChannelDefault}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex  items-center">
                                <p className="font-bold mr-5">@You</p>
                                <FontAwesomeIcon
                                  icon={faPen}
                                  onClick={handleEditChange}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                />
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                  onClick={handleDeleteComment}
                                />
                              </div>
                              <div>
                                <p>{item?.text}</p>
                              </div>
                              <div className="flex gap-5 p-2 items-center">
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <FontAwesomeIcon icon={faThumbsDown} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                        <input id="editInput" onChange={(e) => setNewComment(e.target.value)} type="text" placeholder="Your opinion..." className=" px-3 bg-inherit focus:outline-none border w-full rounded-full h-full"/>
                        <FontAwesomeIcon icon={faPaperPlane}  className="cursor-pointer bg-stone-800 p-3 rounded-full" onClick={handleCreateComment}/>
                      </div>
                  </div>
                </div>
              );
            })}


            {/* ------------------------------------------------------------------------------------- */}
          {comments &&
            comments.map((comment) => {
              interact.comments[comment?.id]
              let newComment = ""
              const setNewComment = (text)=>{
                newComment = text
                console.log(newComment)
              }
              const handleCreateComment = ()=>{
                if (!newComment){
                  return
                }
                const newCommentData = editItem ? {
                  parent_id : comment.id,
                  text: newComment,
                  id : editItem.id
                } : {
                  parent_id : comment.id,
                  text: newComment,
                }
                var inputElement = document.getElementById("editInput");
                inputElement.value = ""
                if(editItem){
                  dispatch(editComment(newCommentData))
                }else{
                  dispatch(createComment(newCommentData))
                }
                setEditId(null)
                setEditItem(null)
              }

              return (
                <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                  <div className="w-12">
                    <img
                      src={comment?.thumbnails[0].url}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 items-center">
                      <p className="font-bold">{comment?.author_name}</p>
                      <p className="text-sm text-gray-400">
                        {comment?.published_time}
                      </p>
                    </div>
                    <div>
                      <p>{comment?.text}</p>
                    </div>
                    <div className="flex gap-5 p-2 items-center">
                      <div className="flex gap-1 items-center">
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <p className=" text-gray-400">{comment?.like_count}</p>
                      </div>
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </div>

                    {interact.comments[comment?.id] &&
                      interact.comments[comment?.id].map((item) => {
                        if(editId == item.id){
                          return
                        }
                        const handleEditChange = ()=>{
                          setEditId(item.id)
                          setEditItem(item)
                          var inputElement = document.getElementById("editInput");
                          inputElement.value = item.text
                        }

                        const handleDeleteComment = () =>{
                          dispatch(deleteComment(item))
                        }
                        return (
                          <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                            <div className="w-12">
                              <img
                                src={ChannelDefault}
                                className="rounded-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                              <div className="flex  items-center">
                                <p className="font-bold mr-5">@You</p>
                                <FontAwesomeIcon
                                  icon={faPen}
                                  onClick={handleEditChange}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                />
                                <FontAwesomeIcon
                                  icon={faTrashCan}
                                  className="text-sm cursor-pointer px-1.5 py-1.5 hover:bg-stone-800 rounded-full"
                                  onClick={handleDeleteComment}
                                />
                              </div>
                              <div>
                                <p>{item?.text}</p>
                              </div>
                              <div className="flex gap-5 p-2 items-center">
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <FontAwesomeIcon icon={faThumbsDown} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex gap-5 w-full p-2 rounded-lg hover:bg-stone-700">
                        <input id="editInput" onChange={(e) => setNewComment(e.target.value)} type="text" placeholder="Your opinion..." className=" px-3 bg-inherit focus:outline-none border w-full rounded-full h-full"/>
                        <FontAwesomeIcon icon={faPaperPlane}  className="cursor-pointer bg-stone-800 p-3 rounded-full" onClick={handleCreateComment}/>
                      </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="min-h-20"></div>
      </div>

      <div className="flex flex-col gap-2 md:w-3/12 px-2">
        {recommendedVideos &&
          recommendedVideos.map((videoItem) => {
            return <VideoRecommend video={videoItem} />;
          })}
        <div className="min-h-20"></div>
      </div>
    </div>
  );
}

export default VideoDetails;
