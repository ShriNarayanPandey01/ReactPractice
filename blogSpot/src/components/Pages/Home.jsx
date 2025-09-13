import React, { useState, useEffect } from 'react';
import service from '../../Appwrite/Service';
import PostCard from '../PostCard';
import Container from '../Container';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.ListDoc([]).then((response) => {
            if (response) {
                setPosts(response.documents);
            }
        });
    }, []);

    return (
        <div className='w-full py-8 bg-gray-100'>
            <Container>
                <h1 className='text-4xl font-bold text-center mb-8'>Latest Posts</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 transition-transform duration-200 ease-in-out transform hover:scale-105'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
