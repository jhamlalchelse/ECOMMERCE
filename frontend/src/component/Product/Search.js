import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [key, setKey] = useState()
    const navigate = useNavigate()
    const submitHandler = (e) =>{
        e.preventDefault()
        if(key.trim()){
            navigate(`/products?keyword=${key}`)
        } else{
            navigate(`/products`)
        }
    }
  return (
    <>
      <div>
      <form action=""  onSubmit={submitHandler}  className=' mx-auto my-4 ' style={{border:"1px solid gray", width:"fit-content"}}>
            <input type="text" name="" id="" 
            className='ps-5 py-2 border-0'
             placeholder='Search a Product...' onChange={({target})=>setKey(target.value)}/>
             <button type="submit" className='px-3 py-2  text-center mx-0 border-0 bg-secondary'>Search</button>
        </form>
      </div>
    </>
  )
}

export default Search