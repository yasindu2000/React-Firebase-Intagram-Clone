import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header({ username }) {
  return (
    <div className='flex h-4 p-4 py-8 border-b border-gray-primary'>
      <div className='flex items-center'>
        <Link to={`/p/${username}`} className='flex items-center'>
          <img
            className='flex w-8 h-8 mr-3 rounded-full'
            src={`/src/assets/images/avatars/${username}.jpg`}
            alt={`${username} profile pic`}
          />
          <p className='font-bold'>{username}</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
Header.propTypes = {
    username: PropTypes.string.isRequired,
  };