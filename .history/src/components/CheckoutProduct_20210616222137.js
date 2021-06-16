import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/outline'

function CheckoutProduct({ id,
    title,
    rating,
    price,   
    description,
    category,
    image,
    hasPrime,
}) {
    return (
        <div className="grid grid-cols-5">
           <Image src={image} height={200} width={200} objectFit="contain" />
           

           <div className="col-span-3 mx-5" >
               <p>{title}</p>
               
             <div className="flex" >
               {Array(rating).fill().map((_, i)=>(
               <StarIcon className="h-5 text-yellow-500" />
                ))}
               
               <p>{description}</p>
             </div>
           </div>

           
            
        </div>
    )
}

export default CheckoutProduct
