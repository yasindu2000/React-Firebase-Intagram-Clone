import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from "../Context/Firebase";
import * as ROUTES from '../Constants/Routes';
import {doesUsernameExist} from '../Services/Firebase'

function Signup() {

    const navigate = useNavigate();
    const {firebase} = useContext(FirebaseContext);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [emailAdress, setEmailAdress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    

    const isInvalid = password == "" || emailAdress == "";

    const handleSignup = async(event)=>{
      event.preventDefault();
      const usernameExists = await doesUsernameExist(username);
      if(!usernameExists.length){
        

      try {
       
       const createdUserResult = await firebase.auth().
       createUserWithEmailAndPassword(emailAdress, password)
       await createdUserResult.user.updateProfile({

        displayName: username
       })

      await firebase.firestore().collection("users").add({

        userId: createdUserResult.user.uid,
        username: username.toLowerCase(),
        fullName,
        emailAdress: emailAdress.toLowerCase(),
        following: [],
        dateCreated: Date.now(),
      });
navigate(ROUTES.DASHBOARD)
      } catch (error) {
        if(error.code == "auth/invalid-credential"){
          setError("The email adress is already in use by another account");
  
        }else if(error.code == "auth/invalid-email"){
          setError("The email adress is badly formatted");
  
        }
      }
       setFullName("")
       setEmailAdress("") 
       setPassword("")
       

       
    }else{

      setError("This user already exit, please try another one");
     }

    
     
    }
    useEffect(() => {
        document.title = "Sign up - Instagram";
    
    }, []);
  return (
    <div className='container flex items-center h-screen max-w-screen-md mx-auto max-w-screen'>
        <div className="flex w-3/5">

        <img src="/src/assets/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" className="" />
        </div>
        <div className="flex flex-col w-2/5 ">
        <h1 className='flex justify-center w-full'>
            <img src="/src/assets/images/logo.png" alt="Instagram" className="w-6/12 mt-2 mb-4" />
        </h1>
        {error && <p className='text-xs text-red-primary'>{error}</p>}
        <form onSubmit={handleSignup} method='POST'>
        <input 
           aria-label="Enter your username" type="text" 
           placeholder='Username'
           className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary" 
           onChange = {({ target }) => setUsername(target.value)}
           value={username}
           />
            <input 
           aria-label="Enter your fullname" type="text" 
           placeholder='Fullname'
           className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary" 
           onChange = {({ target }) => setFullName(target.value)}
           value={fullName}
           />
           <input 
           aria-label="Enter your email address" type="text" 
           placeholder='Email address'
           className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary" 
           onChange = {({ target }) => setEmailAdress(target.value)}
           value={emailAdress}
           />
         <input 
           aria-label="Enter your password" type="password" 
           placeholder='password'
           className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border rounded text-gray-base border-gray-primary" 
           onChange = {({ target }) => setPassword(target.value)}
           value={password}
           />
           <button disabled={isInvalid} type='submit' className=
           {`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && "opacity-50"}`}>
            Sign Up
           </button>
           <div className="flex flex-col items-center justify-center w-full p-4 mt-4 bg-white border rounded border-gray-primary">
            <p>You have an account? <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>Log In</Link>
            
            </p>
           </div>
        </form>
        </div>
    </div>
  )
}

export default Signup