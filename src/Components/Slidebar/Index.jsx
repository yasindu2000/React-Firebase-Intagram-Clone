import React from 'react'
import UseUser from '../../Hooks/UseUser'
import User from './User';
import Suggestions from './Suggestions';


const Slidebar=()=> {


  const {  
    user : {docId, fullName,username,userId,following}, 
  } = UseUser();
 
  return (
    <div className='p-4'>
      
      <User username={username} fullName={fullName}/>
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
  )
}

export default Slidebar