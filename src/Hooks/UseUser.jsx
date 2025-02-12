import { useEffect, useState, useContext} from 'react'
import UserContext from '../Context/User';
import { getUserByUserId } from '../Services/Firebase';

const UseUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      // we need a function that we can call (firebase service) that gets the user data based on the user id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
};

export default UseUser;