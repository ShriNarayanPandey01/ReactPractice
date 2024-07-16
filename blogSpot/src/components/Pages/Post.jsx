import { useNavigate , useParams ,Link } from "react-router-dom"
import React , {useState,useEffect} from 'react'
import service from "../../Appwrite/Service"
import Button from "../Button";
import Container from "../Container";
import { useSelector } from "react-redux";
import parse from "html-react-parser";


function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(userData)

    useEffect(() => {
        if (slug) {
            service.GetDoc(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.DeleteDoc(post.$id).then((status) => {
            if (status) {
                service.DeleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    if(post)
    console.log(post)
    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.FilePreview(post.$id)}
                        alt={post.title}
                        className="rounded-xl"
                    />

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
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                {post && parse(post.Content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post