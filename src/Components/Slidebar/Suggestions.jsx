import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../Services/Firebase'
import SuggestedProfile from './SuggestedProfile';


const Suggestions = ({ userId, following, loggedInUserDocId }) => {
    const [profiles, setProfiles] = useState(null);
  
    // get the suggested profiles
    useEffect(() => {
      async function suggestedProfiles() {
        const response = await getSuggestedProfiles(userId, following);
        setProfiles(response);
      }
  
      if (userId) {
        suggestedProfiles();
      }
    }, [userId]);
  
    return !profiles ? (
      <Skeleton count={1} height={150} />
    ) : profiles.length > 0 ? (
      <div className='flex flex-col rounded'>
        <div className='flex items-center justify-between text-sm align-items'>
          <p className='font-bold text-gray-base'>Suggestion for you</p>
        </div>
        <div className='grid gap-5 mt-4'>
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
            />
          ))}
        </div>
      </div>
    ) : null;
  };
  
  export default Suggestions;
  
  Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string,
  };