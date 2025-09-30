import React from 'react'
import Container from '../Components/Component/Container'
import { PostForm } from '../Components'


function AddPost() {
  return (
    <div className='py-6'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost