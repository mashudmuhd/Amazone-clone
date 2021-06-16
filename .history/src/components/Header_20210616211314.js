import React from 'react'
import Image from "next/image"
import {MenuIcon,SearchIcon,ShoppingCartIcon} from '@heroicons/react/outline';
import{signIn, signout, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';


function Header() {

    const [session]=useSession();
    const router=useRouter();
    const items = useSelector(selectItems)
    
    
    return (
        <header>

            {/* {topnav} */}
           
           
           <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
               <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                   <Image
                   onClick={()=> router.push('/')}
                   src="https://links.papareact.com/f90" 
                   width={150}
                   height={40}
                   objectFit="contain"
                   className="cursor-pointer" />
               </div>

               <div className=" hidden sm:flex bg-yellow-400 hover:bg-yellow-500 items-center h-10 rounded-md flex-grow cursor-pointer ">
                  <input className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none" type="text "/>
                  <SearchIcon className="h-12 p-4"/>
               </div>
               
               {/* {rightNav} */}


             

              <div className="text-white flex items-center text-xs space-x-6 mx-6">
                   <div onClick={!session ? signIn : signout} className=" link">
                      <p>
                          {session ? `Hello, ${session.user.name}`:"Sign In"}
                      </p>
                       <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                  <div className="link ">
                      <p>Returns</p>
                      <p className="font-extrabold md:text-sm">Orders</p>
                   </div>
               
                  <div className=" relative link flex items-center">
                     <span className="absolute top-0 right-0 md:right-10 h-4  w-4 bg-yellow-400 text-center rounded-full text-black font-bold" >0</span>
                       <ShoppingCartIcon className="h-10"/>
                       <p className="hidden md:inline font-extrabold md:text-sm">Cart</p>    
                  </div>              
                  
                </div>





               
            </div>

           {/* {bottomnav} */}


           <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
               <p className="link flex items-center ">
                   <MenuIcon className="h-6 mr-1"/>  All                
                </p>
                <p className="link">Prime video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deal</p>
                <p className="link hidden lg:inline-flex ">Best sellers</p>
                <p className="link hidden lg:inline-flex ">Food & Grocery </p>
                <p className="link hidden lg:inline-flex ">New Releases</p>
                <p className="link hidden lg:inline-flex ">Fashion</p>
                <p className="link hidden lg:inline-flex ">Electronics</p>
                <p className="link hidden lg:inline-flex ">Computers</p>
                <p className="link hidden lg:inline-flex ">Amazon Pay</p>
           </div>
        </header>
    );
}

export default Header
