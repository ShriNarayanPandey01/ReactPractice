import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import { PostForm } from "..";
import service from "../../Appwrite/Service";
import { useSelector } from "react-redux";

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (slug) {
            service.GetDoc(slug).then((post) => {
                if (post) {
                    // Security Check: If the user is not the author, redirect them.
                    if (post.UserId !== userData?.$id) {
                        navigate('/');
                    } else {
                        setPosts(post);
                    }
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate, userData]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
