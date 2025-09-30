import React from 'react'
import services from '../appwrite/Services'
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../Components/Component/Container'
import Postcard from '../Components/Component/Postcard'

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    services.getDocument([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          <h1>Login to read posts</h1>
        </div>
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

export default Home