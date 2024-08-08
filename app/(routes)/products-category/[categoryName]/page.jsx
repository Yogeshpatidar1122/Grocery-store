import React from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/productList'
const ProductCategory = async ({ params }) => {

  const productList = await GlobalApi.getProductsbyCategory(params.categoryName);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      <h2 className='text-green-600 text-3xl font-bold flex items-center m-3'>{params.categoryName}</h2>

      <TopCategoryList categoryList={categoryList}
      selectedCategory = {params.categoryName} />

      <div className='p-5 md:p-10'>
        <ProductList productList={productList} />
      </div>
    </div>
  )
}

export default ProductCategory
