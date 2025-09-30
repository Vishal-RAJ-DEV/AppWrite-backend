import React from 'react'
import {LogoutBtn , Logo } from '../index'
import Container from '../Component/Container'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const NavContent = [
    { name: 'Home', path: '/', status: true },
    { name: 'Login', path: '/login', status: !authStatus },
    { name: 'AllPosts', path: '/all-posts', status: authStatus },
    { name: 'Add Post', path: '/add-post', status: authStatus }
  ]
  return (
    <header className="p-3">
      <Container>
        <nav className='flex'>
          <div className='mr-2'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              NavContent.map((item) => item.status ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null)
            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header