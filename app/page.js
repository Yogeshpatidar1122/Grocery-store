import React from 'react';
import Slider from './_components/Slider';
import GlobalApi from './_utils/GlobalApi'
import Header from './_components/Header'
import CategoryList from './_components/CategoryList'
import ProductList from './_components/productList'
import Image from 'next/image';
import Footer from './_components/Footer'

const page = async () => {

  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  return (
    <div className='p-10 px-16'>
      
      {/* slider  */}
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList}/>
      {/* product  */}
      <ProductList productList={productList}/>
      {/* Banner  */}
      <Image src='/banners.png' width={1000} height={300} alt='banner' 
      className=' mt-10 w-full h-[400px] object-contain rounded-2xl'/>  

    {/* footer  */}
    <Footer/>

    </div>
  )
}

export default page
