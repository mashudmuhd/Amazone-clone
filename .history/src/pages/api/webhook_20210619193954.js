 import { buffer } from 'micro';
 import * as admin from 'firebase'
import { async } from 'regenerator-runtime';
 //secure connection to FIREBASE from backend 
 const serviceAccount = require('../../../permissions.json')
 const app = !admin.apps.length ? admin.initialiseApp({
     Credential: admin.credential.cert(serviceAccount)
 }) 
 : admin.app();
 //Establish connection to stripe

 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
 const endpointSecret = process.envSTRIPE_SIGNING_SECRET;

 const fullfillOrder = async (session)=>{
     //console.log('Fullfillingorder',session)
     return app.firestore().collection('users').doc(session.metadata.email)
     .collection('orders').doc(session.id).set({
         amount: session.amount_total / 100,
         amount_shipping: session.total_details.amount_shipping / 100,
         images: JSON.parse(session.metadata.images),
         timestamp: admin.firestore.FieldValue.serverTimestamp()
     })
     .then(()=>{
         console.log(`SUCCESS: order ${session.id}had been added to the DB`);
     })
 }
     export default async (req , res)=>{
     if(req.method==='POST'){
         const requestBuffer = await buffer(req);
         const payload = requestBuffer.toString();
         const sig = req.headers["stripe-signature"];

         let event;

         //verify that EVENT came from stripe 
 

         try {

            event=stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        }
        catch(err){
            return res.status(400).send(`webhook erro : ${err.message}`);
        }

        //Handle the checkout.session.completed event

        if(event.type==="checkout.session.completed"){
            const session = event.data.object;
            
            //fullfill the order

            return fullfillOrder(session).then(()=>res.status(200)).catch((err)=>res.status(400).send(`webhook Error: ${err.message}`));
        
        }

        

  

     }
    
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver:true
    }
}

