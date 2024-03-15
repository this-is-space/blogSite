import React, { useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = React.useState([])
    useEffect(() => {},[])

    appwriteService.getPosts()
    .then((posts) => {if (posts){
        setPosts(posts.documents)
    }})
    .catch((error) => console.log(error))
  return (

    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {
                posts.map((post) => (
                    <div key ={post.$id} className='p-2 w-1'>
                        <PostCard post={post} />
                    </div>
                ))
            }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts