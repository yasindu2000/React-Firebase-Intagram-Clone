import React from "react";
import Skeleton from "react-loading-skeleton";
import UsePhotos from "../Hooks/UsePhotos";
import Post from './Post'

const Timeline = () => {
  const { photos } = UsePhotos();

  return (
    <div className='container col-span-2'>
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className='mb-5' />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className='text-2xl text-center'>Follow people to see the photos</p>
      )}
    </div>
  );
};

export default Timeline;