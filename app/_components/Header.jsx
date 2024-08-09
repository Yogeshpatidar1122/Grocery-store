'use client'
import { Button } from '@/components/ui/button';
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from '../_utils/GlobalApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UpdateCardContext } from '../_context/UpdateCartContext';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserCartList from '@/app/_components/UserCartList';
import { toast } from 'sonner';

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCardItem, setTotalCardItem] = useState(0);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCardContext);
  const router = useRouter();

  // Variables for session storage
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  // UseEffect to handle sessionStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const jwtToken = sessionStorage.getItem('jwt');
      setJwt(jwtToken);
      setIsLogin(!!jwtToken);

      const storedUser = sessionStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
  }, []);

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (user && user.id) {
      getCartItems();
    }
  }, [updateCart, user]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data);
    });
  };

  const getCartItems = async () => {
    if (user && user.id) {
      try {
        const cartItemList = await GlobalApi.getCartItems(user.id, jwt);
        setTotalCardItem(cartItemList?.length);
        setCartItemsList(cartItemList);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  }

  const onSignOut = () => {
    sessionStorage.clear();
    setIsLogin(false);
    router.push('/sign-in');
  }

  const onDeleteItem = async (id) => {
    await GlobalApi.deleteCartItems(id, jwt).then(resp => {
      toast('Item Removed !');
      getCartItems();
    })
  }

  useEffect(() => {
    let total = 0;
    cartItemsList.forEach(element => {
      total += element.amount;
    });
    setSubtotal(total);
  }, [cartItemsList]);

  return (
    <div className='flex p-5 px-20 shadow-sm justify-between'>
      <div className='flex items-center gap-10'>
        <Link href={'/'}>
          <Image src='/gLogo.png' alt='logo' width={130} height={130} className='rounded-full' />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2 className='hidden md:flex items-center gap-2 border rounded-full p-2 px-10 bg-slate-200'>
              <LayoutGrid className='h-5 w-5 cursor-pointer' /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link key={index} href={'/products-category/' + category.attributes.name}>
                <DropdownMenuItem key={category.id} className='flex gap-2 items-center cursor-pointer'>
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+category?.attributes?.icon?.data[0]?.attributes?.formats?.thumbnail?.url}
                    unoptimized={true}
                    alt='icon'
                    width={30}
                    height={30}
                  />
                  <h2 className='text-lg'>{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='md:flex gap-3 items-center border rounded-full p-2 hidden'>
          <Search />
          <input type='text' placeholder='Search' className='outline-none' />
        </div>
      </div>
      <div className='flex gap-5 items-center'>

        <Sheet>
          <SheetTrigger><h2 className='flex gap-2 items-center font-bold'><ShoppingBag />
            <span className='bg-primary text-white px-2 rounded-full'>{totalCardItem}</span>
          </h2></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='bg-primary text-white font-bold text-lg p-2' >My Cart</SheetTitle>
              <SheetDescription>
                <UserCartList cartItemsList={cartItemsList}
                  onDeleteItem={onDeleteItem} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose>
              <div className='absolute w-[90%] bottom-6 flex flex-col'>
                <h2 className='text-lg font-bold flex justify-between'>Sub Total <span>Rs{subtotal}</span></h2>
                <Button className='p-2' onClick={()=>router.push(jwt ? '/checkout' : '/sign-in')}>CheckOut</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? <Link href={'/sign-in'} >
          <Button>Login</Button>
        </Link> :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserIcon className='h-10 w-10 bg-green-200 text-black rounded-full cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={onSignOut}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  );
};

export default Header;
