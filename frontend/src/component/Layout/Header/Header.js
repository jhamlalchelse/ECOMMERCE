import React from 'react'
import { Link } from 'react-router-dom'
import {BsSearch} from "react-icons/bs"
import { useSelector } from 'react-redux';
import Options from './Options';

const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  return (
    <>
        <div className = "text-center py-3 text-white" 
        style={{fontFamily:"Georgia", fontSize:"18px", backgroundColor:"#f08080"}}>
          <ul className=' list-unstyled d-flex justify-content-evenly align-items-center m-0 py-1'>
            <Link to={'/'} className='text-decoration-none  text-white'> <li >Home</li></Link>
            <Link to={'/products'} className='text-decoration-none  text-white'> <li>Products</li></Link>
            <Link to={'/cart'} className='text-decoration-none  text-white'> <li>Cart</li></Link>
            {!isAuthenticated && <Link to={'/login'} className='text-decoration-none  text-white'> <li>Login</li></Link>}
            {!isAuthenticated &&<Link to={'/signup'} className='text-decoration-none  text-white'> <li>Signup</li></Link>}
            <Link to={'/search'} className='text-decoration-none  text-white'> <li>  <BsSearch/> Search</li></Link>
            {isAuthenticated && <li> <Options user={user} />  </li>}
          </ul>
        </div>
    </>
  )
}

export default Header