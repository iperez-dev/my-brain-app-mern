import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'

const SearchBar = () => {
  const { handleInputChange, query } = useContext(GlobalContext)


  return (
    <div className="nav-container">
      <input
        className="search-input"
        type="text"
        onChange={handleInputChange}
        value={query}
        placeholder="Search memory"
      />
      </div>
      
  )
}

export default SearchBar