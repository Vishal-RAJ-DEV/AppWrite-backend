import React from 'react'
import { Services } from '../../appwrite/Services'
import { Link } from 'react-router-dom'


const Postcard = ({ $ID, title, featuredImage }) => {
    return (
        <Link to={`/post-${$ID}`}>
            <div className='w-full rounded-lg p-4 bg-gray-600'>
                <div className='w-full flex justify-center '>
                    <h2 className='m-auto text-center'>{title}</h2>
                    <img src={Services.GetFilePreview(featuredImage)} alt={title} className='w-full h-auto rounded-lg' />
                </div>
            </div>
        </Link>
    )
}

export default Postcard