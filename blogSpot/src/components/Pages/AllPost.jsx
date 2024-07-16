import React, { useState, useEffect} from 'react';
import service from '../../Appwrite/Service';
import PostCard from '../PostCard';
import Container from '../Container';
import { ID } from 'appwrite';
function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.ListDoc([]).then((posts) => {
            console.log(posts)
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    console.log("Posts have something", posts);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map((p) => (
                        <div key={ID.unique()} className='p-2 w-1/4'>
                            {console.log("send to postCard",p)}
                            <PostCard post={p} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
