import React from 'react'
import service from '../Appwrite/Service'
import { Link } from 'react-router-dom'
function PostCard({post}) {
  console.log(post)
  console.log("img src " ,service.FilePreview(post.UserId))
  return (
    <Link to={`/post/${post.$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src = {`${service.FilePreview(post.UserId)}`} className='rounded-xl'/>
            </div>
            <h2
            className='text-xl font-bold'
            >{post.Title}Hello</h2>
        </div>
    </Link>
  )
}

export default PostCard