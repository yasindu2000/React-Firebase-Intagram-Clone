import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {updateLoggedInUserFollowing,updateFollowedUserFollowers} from '../../Services/Firebase'

const SuggestedProfile = ({
    profileDocId,
    username,
    profileId,
    userId,
    loggedInUserDocId,
  }) => {
    const [followed, setFollowed] = useState(false);
  
    async function handlefollowUser() {
      setFollowed(true);
  
      await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
  
      await updateFollowedUserFollowers(profileDocId, userId, false);
    }
  
    return !followed ? (
      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center justify-between'>
          <img
            className='flex w-8 mr-3 rounded-full'
            src={`/src/assets/images/avatars/${username}.jpg`}
            alt=''
          />
          <Link to={`/p/${username}`}>
            <p className='text-sm font-bold'>{username}</p>
          </Link>
        </div>
  
        <button
          className='text-xs font-bold text-blue-medium'
          type='button'
          onClick={handlefollowUser}
        >
          Follow
        </button>
      </div>
    ) : null;
  };
  
  export default SuggestedProfile;
  
  SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired,
  };