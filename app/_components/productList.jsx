import React from 'react'
import ProductItem from './ProductItem'
const productList = ({productList}) => {
  return (
    <div className='mt-10'>
     <h2 className='text-green-600 text-2xl font-bold flex items-center m-5'>Favourite Products</h2>
     <div className='grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {productList.map((product,index)=>(
            <ProductItem product={product}/>
        ))}
     </div>
    </div>
  )
}

export default productList
