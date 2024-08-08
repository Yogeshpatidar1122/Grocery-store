import { useRouter } from 'next/navigation';
import React from 'react'
import { useEffect } from 'react';

function myOrder() {
    const jwt=sessionStorage.getItem('jwt');
    const router=useRouter();

    useEffect(()=>{
if(!jwt){
    router.replace('/')
}
    },[])
  return (
    <div>
      
    </div>
  )
}

export default myOrder
