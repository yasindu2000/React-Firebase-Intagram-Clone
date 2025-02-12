import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import UseUser from "../../Hooks/UseUser";
import UserContext from "../../Context/User";
import { isUserFollowingProfile, toggleFollow } from "../../Services/Firebase";
import { DEFAUT_IMAGE_PATH } from "../../Constants/Paths";

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
  },
  followerCount,
  setFollowerCount,
}) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = UseUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  return (
    <div className='grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto'>
      <div className='container flex items-center justify-center'>
        {profileUsername ? (
          <img
            className='flex w-40 h-40 rounded-full'
            alt={`${fullName} profile pic`}
            src={`/src/assets/images/avatars${profileUsername}.jpg`}
            onError={(e) => (e.target.src = DEFAUT_IMAGE_PATH)}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className='flex flex-col items-center col-span-2 jsutify-center'>
        <div className='container flex items-center'>
          <p className='mr-4 text-2xl'>{profileUsername}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className='w-20 h-8 text-sm font-bold text-white rounded bg-blue-medium'
                type='button'
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  handleToggleFollow();
                }}
              >
                {isFollowingProfile ? "unfollow" : "Follow"}
              </button>
            )
          )}
        </div>
        <div className='container flex mt-4'>
          {!followers && !following ? (
            <Skeleton count={1} width={677} height={243} />
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount} photos</span>
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>
                {` `} {followerCount === 1 ? "follower" : "followers"}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{following?.length}</span>
                {` `} following
              </p>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.string,
    following: PropTypes.string,
  }).isRequired,
};