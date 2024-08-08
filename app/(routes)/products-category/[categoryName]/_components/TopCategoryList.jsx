import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function TopCategoryList({categoryList,selectedCategory}) {

  return (
    
        <div className='flex gap-5 mt-3 overflow-auto mx-7 md:mx-20 justify-center'>
        {categoryList.map((category,index)=>(
            <Link href={'/products-category/'+category.attributes.name} 
            className={`flex flex-col items-center gap-2 bg-green-50
             p-2 rounded-lg group cursor-pointer hover:bg-green-200 w-[150px] 
             min-w-[100px] ${selectedCategory==category.attributes.name&&'bg-green-600 text-white'} `}>
               <Image 
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.attributes?.icon?.data[0]?.attributes?.formats?.thumbnail?.url} 
                  unoptimized={true}
                  alt='icon' 
                  width={50} 
                  height={50} 
                  className='group-hover:scale-125 transitiosn-all ease-in-out'
                />
                <h2 className={`text-green-600 group-hover:text-white ${selectedCategory==category.attributes.name&&'text-white'}`}>{category?.attributes?.name}</h2>
            </Link>
        ))}
      </div>
    
  )
}

export default TopCategoryList
