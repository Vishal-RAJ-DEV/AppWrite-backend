import React from 'react'

const Button = ({
    children ,
    types = 'button',
    bgColor = 'bg-blue-500',
    textColor  = 'text-white',
    className  = '',
    ...props
}) => {
  return (
    <button className={`py-2 px-3 ${bgColor} ${textColor} ${className} `}
    type={types}
    {...props} //this is for spreading any additional props 
    >{children}</button>
  )
}

export default Button