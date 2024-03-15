import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                setPosts(posts)
            })
            .catch((error) => console.log(error))
    }, [])

    if (posts.length === 0) {
        return (
            <div className='py-8 w-full mt-4 text-center'>
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to see posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='py-8 w-full'>
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}
