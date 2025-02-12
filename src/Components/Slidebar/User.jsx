import React from 'react'
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className='grid items-center grid-cols-4 gap-4 mb-6'
    >
      <div className='flex items-center justify-between col-span-1'>
        <img
          src={`/src/assets/images/avatars/${username}.jpg`}
          className='flex w-16 mr-3 rounded-full'
          alt=''
        />
      </div>
      <div className='col-span-3'>
        <p className='text-sm font-bold'>{username}</p>
        <p className='text-sm'>{fullName}</p>
      </div>
    </Link>
  );

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};