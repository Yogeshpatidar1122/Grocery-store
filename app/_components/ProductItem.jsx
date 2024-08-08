import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductDetail from './ProductDetail'


const ProductItem = ({ product }) => {
  return (
    <div className='p-2 md:p-3 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 shadow-md transition-all ease-in-out'>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes?.images?.data[0]?.attributes?.url}
        height={500}
        width={200}
        alt={product.attributes.name}
        className='h-[200px] w-[200px] object-contain'
      />
      <h2 className='font-bold'>{product.attributes.name}</h2>
      <div className='flex gap-3'>
        {product.attributes.sellingPrice &&
          <h2>{product.attributes.sellingPrice}/Kg</h2>}
        <h2 className={`font-bold ${product.attributes.sellingPrice && 'line-through text-gray-400'}`}>{product.attributes.mrp}/kg</h2>
      </div>
      
      <Dialog>
        <DialogTrigger>
          <Button variant='outline' className='text-green-600 hover:text-white hover:bg-green-600'>Add To Cart</Button>

        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductDetail product={product}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default ProductItem
