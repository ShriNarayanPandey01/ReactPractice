import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import service from "../../Appwrite/Service";
import Button from "../Button";
import Container from "../Container";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    // Correctly select the user data from the Redux store
    const userData = useSelector((state) => state.auth.userData);

    // The isAuthor check is now robust and correct.
    const isAuthor = post && userData ? post.UserId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.GetDoc(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        service.DeleteDoc(post.$id).then((status) => {
            if (status) {
                // Correctly extract the file ID from the URL and delete the associated file.
                if (post.FeatureImg) {
                    const fileId = post.FeatureImg.split('/files/')[1].split('/view')[0];
                    service.DeleteFile(fileId);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* This now correctly displays the featured image. */}
                    <img
                        src={post.FeatureImg}
                        alt={post.Title}
                        className="rounded-xl"
                    />
                    {/* The Edit and Delete buttons are now only visible to the post's author. */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
                <div className="browser-css">
                    {post.Content && parse(post.Content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
