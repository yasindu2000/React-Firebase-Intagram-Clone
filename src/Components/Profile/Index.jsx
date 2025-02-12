
import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { getUserPhotosByUserId } from "../../Services/Firebase";
import Photos from "./Photos";

function Profile({ user }) {
    const reducer = (state, newState) => ({
        ...state,
        ...newState,
      });
      const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0,
      };
    
      const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
        reducer,
        initialState
      );
    
      useEffect(() => {
        async function getProfileInfoAndPhotos() {
          const photos = await getUserPhotosByUserId(user.userId);
          dispatch({
            profile: user,
            photosCollection: photos,
            followerCount: user?.followers?.length,
          });
        }
        getProfileInfoAndPhotos();
      }, [user]);
    
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
      <p>{user.username}</p>
    </>
  )
}

export default Profile

Profile.propTypes = {
    user: PropTypes.shape({
      dateCreated: PropTypes.number,
      emailAddress: PropTypes.string,
      followers: PropTypes.array,
      following: PropTypes.array,
      fullName: PropTypes.string,
      userId: PropTypes.string,
      username: PropTypes.string,
    }),
  };