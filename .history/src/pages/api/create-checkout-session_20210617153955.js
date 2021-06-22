const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async (req , res)=>{

    const {items,email} =req.body;
   const transformedItems = items.map(item=>({
       description: item.description,
       quantity:1,
       price_date:{
           currency:"inr",
           unitt_amount:item.price*100,
           product_Data:{
               name:item.title,
               images:[item.image]

           }
       }


   }));
   const session = await stripe.checkout.session.create({
        payment_method_types:["card"],
        shipping_rate:['shr_1J3I7CSDML8hOhTHudT3O6U9'],
        shipping_address_collection:{

            allowed_countries:['GB' ,'IND',"CA"]

        },
        line_items:transformedItems,
        mode:'payment',
        succes_url:`${process.env.HOST}/success`,
        cancel_url:`${process.env.HOST}/checkout`,
        metadata:{
            email,
            images:JSON.stringify(items.map(item=> item.image))
        },
   });

   res.status(200).json({id:session.id});

}