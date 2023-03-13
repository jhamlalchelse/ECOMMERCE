import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Layout/Loader/Loader'

const Account = () => {
  const {user,loading, isAuthenticated} = useSelector((state) => state.user)
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!isAuthenticated){
  //     navigate('/login')
  //   }
  // }, [navigate])
  
  return (
    <>
       {
        loading ? <Loader/>
        :
        <div className='w-50 mx-auto my-4 p-3 pb-4'  style={{boxShadow:"2px 5px 10px #b0c4de", fontFamily:"georgia", fontSize:"18px", backgroundColor:"#f5f5f5" }}>
            <h3 className='text-center text-capitalize' style={{letterSpacing:"2px", color:"teal"}}>Accouts</h3>
            <hr className='m-0 pb-3 ' />
           <div className='p-3 col-8 mx-auto' style={{boxShadow:"0 0 4px #b0c4de", backgroundColor:"lightblue"}}>
           <div className='col-12 d-flex align-items-center my-2'>
            <div className='col-2'></div>
            <div className='col-5'>Name :</div>
            <div className='col-5'>{user.name}</div>
            </div>
            <div className='col-12 d-flex align-items-center my-2'>
            <div className='col-2'></div>
            <div className='col-5'>Email :</div>
            <div className='col-5'>{user.email}</div>
            </div>
            <div className='col-12 d-flex align-items-center my-2'>
            <div className='col-2'></div>
            <div className='col-5'>Created At :</div>
            <div className='col-5'>{user.createdAt.substr(0,10)}</div>
            </div>

           </div>
            <div className=' d-flex flex-column col-8 mx-auto'>
            <Link to={'/orders'} className=' border-0 my-3 text-white text-decoration-none text-center' style={{backgroundColor:"#db7093", borderRadius:"8px", padding:"12px 15px"}}>My Orders</Link>
            <button className='border-0'  style={{backgroundColor:"#48d1cc", borderRadius:"8px", padding:"12px 15px", color:"#778899"}}>Change Password</button>
            </div>
        </div>
       }
    </>
  )
}

export default Account