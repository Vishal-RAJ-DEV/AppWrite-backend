import React from 'react'
import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import services from '../appwrite/Services'
import { useEffect } from 'react'
import Container from '../Components/Component/Container'
import { PostForm } from '../Components'


function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost