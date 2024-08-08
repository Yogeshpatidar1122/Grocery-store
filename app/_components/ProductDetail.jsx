'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoaderIcon, ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/navigation';
import GlobalApi from '../_utils/GlobalApi'

import { toast } from 'sonner'
import { UpdateCardContext } from '../_context/UpdateCartContext'
const ProductDetail = ({ product }) => {

    const jwt=sessionStorage.getItem('jwt');
    const user=JSON.parse(sessionStorage.getItem('user'));
    const {updateCart,setUpdateCart}=useContext(UpdateCardContext)
    const [productTotalPrice , setProductTotalprice] =useState(
        product.attributes.sellingPrice?
        product.attributes.sellingPrice:
        product.attributes.mrp
    )

    const[quantity , setQuantity] =useState(1);
    const router =useRouter();
    const[loading , setLoading]=useState(false)

    const addToCart=()=>{
        setLoading(true)
        if(!jwt){
            router.push('/sign-in');
            setLoading(false)
            return ;
        }
        const data ={
            data:{
                quantity:quantity,
                amount:(quantity*productTotalPrice).toFixed(2),
                products:product.id,
                users_permissions_users:user.id,
                userId:user.id
            }
        }
        console.log(data);
        GlobalApi.addToCart(data,jwt).then(resp=>{
            console.log(resp);
            toast('Added to Cart')
            setUpdateCart(!updateCart);
            setLoading(false);

        },(e)=>{
            toast('Error while adding to cart');
            setLoading(false);
        })
    }
    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 p-7 text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes?.images?.data[0]?.attributes?.url}
                height={250}
                width={250}
                className='bg-slate-200 w-[300px] h-[320px] rounded-lg object-contain'
            />
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='text-2xl font-bold'>{product.attributes.description}</h2>
                <div className='flex gap-3'>
                    {product.attributes.sellingPrice &&
                        <h2 className='text-2xl'>{product.attributes.sellingPrice}/Kg</h2>}
                    <h2 className={`font-bold text-2xl ${product.attributes.sellingPrice && 'line-through text-gray-400'}`}>{product.attributes.mrp}/kg</h2>
                </div>
                <h2 className='font-medium text-2xl'>Quantity : {product.attributes.itemQuantityType}</h2>
                <div className='flex flex-col items-baseline'>
                    <div className='flex gap-3 items-center'>
                    <div className='p-2 border flex items-center px-5 gap-10 font-bold'>
                        <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)} className='font-bold'>-</button>
                        <h2>{quantity} kg</h2>
                        <button onClick={()=>setQuantity(quantity+1)} className='bont-bold'>+</button>
                    </div>
                    <h2 className='text-2xl font-bol d'> = {(quantity*productTotalPrice).toFixed(2)} Rs</h2>
                    </div>
                    <Button className='flex mt-3 gap-2' onClick={()=>{addToCart()}} disabled={loading}>
                        <ShoppingBasket/>{loading?<LoaderIcon className='animate-spin'/>:'Add To Cart'} </Button>
                </div>
                <h2><span className='font-bold' >Category:</span>{product.attributes.categories.data[0].attributes.name}</h2>
            </div>
        </div>
    )
}

export default ProductDetail
