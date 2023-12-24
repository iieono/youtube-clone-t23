import { faCommentDots, faExpand, faFire, faFlag, faGamepad, faHome, faLightbulb, faMusic, faNewspaper, faQuestionCircle, faTrophy, faVideo, faWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-60 h-full min-h-full max-h-screen shadow-sm p-2 overflow-hidden hover:overflow-y-scroll'>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faHome} className='block'/>
        <p className='block text-lg'>Home</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faVideo} className='block'/>
        <p className='block text-lg'>Shorts</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faExpand} className='block'/>
        <p className='block text-lg'>Subscriptions</p>
      </Link>
      <hr  className='m-2'/>
      <div className='flex flex-col py-6 px-5 gap-2'>
        <p className='text-sm text-blue-100'>Sign in to like videos, comment, and subscribe.</p>
        <div className="flex items-center justify-center rounded-full border h-full w-24 border-blue-600 px-3 cursor-pointer">
            <p>Signin</p>
        </div>
      </div>
      <hr  className='m-2'/>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faFire} className='block'/>
        <p className='block text-lg'>Trending</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faMusic} className='block'/>
        <p className='block text-lg'>Music</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faGamepad} className='block'/>
        <p className='block text-lg'>Gaming</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faNewspaper} className='block'/>
        <p className='block text-lg'>News</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faTrophy} className='block'/>
        <p className='block text-lg'>Sports</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faLightbulb} className='block'/>
        <p className='block text-lg'>Learning</p>
      </Link>
      <hr  className='m-2'/>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faWrench} className='block'/>
        <p className='block text-lg'>Settings</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faFlag} className='block'/>
        <p className='block text-lg'>Report history</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faQuestionCircle} className='block'/>
        <p className='block text-lg'>Help</p>
      </Link>
      <Link to="/" className='flex gap-2 items-center p-2 px-5 rounded-xl hover:bg-stone-700 text-center'>
        <FontAwesomeIcon icon={faCommentDots} className='block'/>
        <p className='block text-lg'>Send Feedback</p>
      </Link>
      <hr  className='m-2'/>
      <div className='h-24'></div>


    </div>
  )
}

export default Sidebar