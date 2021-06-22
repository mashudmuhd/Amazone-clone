 import { buffer } from 'micro';
 import * as admin from 'firebase'
 //secure connection to FIREBASE from backend 
 const serviceAccount = require('../../../permissions.json')
 const app = !admin.apps.length ? admin.initialiseApp({
     Credential: admin.credential.cert(serviceAccount)
 }) 
 : admin.app();
 //Establish connection to stripe

 const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
 const endpointSecret = process.envSTRIPE_SIGNING_SECRET:

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
            return res.status(400).send(`webhook erro : ${err.message}`)
        }

     }
    
}