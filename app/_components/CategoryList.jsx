import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryList = ({categoryList}) => {
  return (
    <div className='mt-10'>
      <h2 className='text-green-600 text-2xl font-bold flex items-center'>Shop by category</h2>
      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-col-6 lg:grid-col-7 gap-5 mt-3'>
        {categoryList.map((category,index)=>(
            <Link href={'products-category/'+category.attributes.name} className='flex flex-col items-center gap-2 bg-green-50 p-2 rounded-lg group cursor-pointer hover:bg-green-200 '>
               <Image 
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.formats?.thumbnail?.url} 
                  unoptimized={true}
                  alt='icon' 
                  width={50} 
                  height={50} 
                  className='group-hover:scale-125 transitiosn-all ease-in-out'
                />
                <h2 className='text-lg'>{category?.attributes?.name}</h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
