import React,{useEffect} from 'react'



function NotFound() {

useEffect(()=>{

        document.title = "NotFound - Instagram";
    
    },[])
  return (
    <div className='bg-garay-background'>
        
        <div className="max-w-screen-lg mx-auto">
            <p className='text-2xl text-center' >Not Found Page</p>
        </div>
    </div>
  )
}

export default NotFound