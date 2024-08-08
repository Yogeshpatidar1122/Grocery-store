const axios = require('axios');
const { headers } = require('next/headers');

const axiosClient = axios.create({
    baseURL: "http://192.168.7.98:1337/api",
});

const getCategory = () => axiosClient.get('/categories?populate=*');

const getSliders =() =>axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data
})

const getCategoryList =() =>axiosClient.get('/categories?populate=*').then(resp=>{
    return resp.data.data
})

const getAllProducts =() =>axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data
})

const getProductsbyCategory =(category)=>axiosClient.get('/products?filter[categories][name][$in]='+category+'&populate=*').then(resp=>{
    return resp.data.data
})

const registerUser=(username,email,password)=>axiosClient.post('/auth/local/register',{
    username:username,
    password:password,
    email:email
})

const SignIn=(email,password)=>axiosClient.post('/auth/local',{
    identifier:email,
    password:password
})
const addToCart=(data,jwt)=>axiosClient.post('/user-carts',data,{
    headers:{
        Authorization:'Bearer '+jwt
    }
})
const getCartItems=(userId,jwt)=>axiosClient.get('/user-carts?filters[userId][$eq]='+userId+'&[populate][products][populate][images][populate][1]=url',{
    headers:{
        Authorization:'Bearer '+jwt
    }
}).then(resp=>{
    const data=resp.data.data;
    const cartItemsList=data.map((item,index)=>({
        name:item.attributes.products?.data[0].attributes.name,
        quantity:item.attributes.quantity,
        amount:item.attributes.amount,
        image:item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
        actualPrice:item.attributes.products?.data[0].attributes.mrp,
        id:item.id,
        product:item.attributes.products?.data[0].id

    }))
    return cartItemsList
})
const deleteCartItems=(id,jwt)=>axiosClient.delete('/user-carts/'+id,{
    headers:{
        Authorization:'Bearer '+jwt
 }
})
const createOrder=(data,jwt)=>axiosClient.post('/orders',data,{
    headers:{
        Authorization:'Bearer '+jwt
 }
})
module.exports = { getCategory,
    getSliders,
    getCategoryList,
    getAllProducts,
    getProductsbyCategory,
    registerUser,
    SignIn,
    addToCart,
    getCartItems,
    deleteCartItems,
    createOrder
 };
