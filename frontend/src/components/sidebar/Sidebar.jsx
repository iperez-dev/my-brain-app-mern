import React from 'react'
import SearchBar from "../SearchBar";
import MemoryForm from "../MemoryForm"

const Sidebar = () => {
  return (
    <div className='md:fixed md:px-16 w-[100%] md:w-[34%]'>
      <h1>My Brain</h1>
        <SearchBar />
        <br />
        <MemoryForm />
    </div>
  )
}

export default Sidebar