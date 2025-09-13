import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post.UserId === userData?.$id;

    return (
        <div className='w-full bg-white rounded-xl p-4 shadow-md transition-transform duration-200 ease-in-out transform hover:scale-105'>
            <Link to={`/post/${post.$id}`}>
                <div className='w-full justify-center mb-4'>
                    <img src={post.FeatureImg} alt={post.Title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{post.Title}</h2>
            </Link>
            {isAuthor && (
                <div className="mt-4 flex justify-end space-x-2">
                    <Link to={`/edit-post/${post.$id}`}>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">Edit</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PostCard;
