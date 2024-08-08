'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState ,useEffect } from 'react';
import Link from 'next/link';
import GlobalApi from '@/app/_utils/GlobalApi'; 
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';



const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
       const router =useRouter();
       const[loader , setLoader] = useState();

       
    useEffect (()=>{
      const jwt =sessionStorage.getItem('jwt');
      if(jwt){
        router.push('/')
      }
    },[])

  const onSignIn = () => {
    setLoader(true)
    GlobalApi.SignIn(email, password).then(resp => {
      sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      sessionStorage.setItem('jwt', resp.data.jwt);
      toast("Sign In Successfully");
      router.push('/');
      setLoader(false);
  }).catch(e => {
     console.log(e);
     toast(e?.response?.data?.error?.message)
     setLoader(false);
  });
  }
  return (
    <div className='flex items-baseline justify-center my-20 '>
      <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-2xl'>
        <Image src='/gLogo.png' width={200} height={200} alt='logo' className='bg-slate-100' />
        <h2 className='font-bold text-3xl mt-5 '>Sign In to Account</h2>
        <div className='w-full flex flex-col gap-5 mt-7'>
          <Input placeholder='Enter Your Email' type='email' onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder='Enter Your Password' type='password' onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={onSignIn} disabled={!(email && password)}>
            {loader?<LoaderIcon className='animate-spin'/>:'Sign In'}
          </Button>
          <p>Don't have an Account ? <Link href={'/create-account'} className='text-blue-500'> Click here to Create Account.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
