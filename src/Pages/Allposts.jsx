import React from 'react'
import services from '../appwrite/Services'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../Components/Component/Container'
import Postcard from '../Components/Component/Postcard'



function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    services.getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts. Please try again later.")
        setLoading(false)
      })
  }, [])
  
  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-xl">Loading posts...</p>
        </Container>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-xl text-red-500">{error}</p>
        </Container>
      </div>
    )
  }
  
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-xl">No posts found. Be the first to create a post!</p>
        </Container>
      </div>
    )
  }
  
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
                <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts