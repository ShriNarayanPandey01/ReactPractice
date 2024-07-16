import { useNavigate ,useParams} from "react-router-dom"
import React,{useState,useEffect} from "react"
import Container from "../Container"
import { PostForm } from ".."
import service from "../../Appwrite/Service"
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.GetDoc(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}
export default EditPost