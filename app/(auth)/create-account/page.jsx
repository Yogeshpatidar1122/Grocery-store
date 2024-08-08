'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GlobalApi from "@/app/_utils/GlobalApi"
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { LoaderIcon } from 'lucide-react'

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [loader , setLoader] = useState();

    useEffect (()=>{
      const jwt =sessionStorage.getItem('jwt');
      if(jwt){
        router.push('/')
      }
    },[])

    const onCreateAccount = () => {
      setLoader(true)
        GlobalApi.registerUser(username, email, password).then(resp => {
            console.log(resp.data.user);
            console.log(resp.data.jwt);
            sessionStorage.setItem('user', JSON.stringify(resp.data.user));
            sessionStorage.setItem('jwt', resp.data.jwt);
            toast("Account has been created Successfully");
            router.push('/sign-in');
            setLoader(false)
          }).catch(e => {
            console.log(e);
            toast(e?.response?.data?.error?.message)
            setLoader(false)
         });
        }

    return (
        <div className='flex items-baseline justify-center my-20 '>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200 rounded-2xl'>
                <Image src='/gLogo.png' width={200} height={200} alt='logo' className='bg-slate-100'/>
                <h2 className='font-bold text-3xl mt-5 '>Create an Account</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input placeholder='Enter Your Username' type='name' onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder='Enter Your Email' type='email' onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder='Enter Your Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={onCreateAccount} disabled={!(username && email && password)}>
                      {loader?<LoaderIcon className='animate-spin'/>:'Create an Account'}
                      
                    </Button>
                    <p>Already have an Account <Link href={'/sign-in'} className='text-blue-500'> Click here to Sign In.</Link></p>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount
