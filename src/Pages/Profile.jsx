import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as ROUTES from "../Constants/Routes";
import { getUserByUsername } from "../Services/Firebase";
import Header from "../Components/Header";
import UserProfile from "../Components/Profile/Index";


function Profile() {
    const { username } = useParams();
    const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);
  return user?.username ? (
    <div className='bg-gray-background'>
      <Header />
      <div className='max-w-screen-lg mx-auto'>
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile