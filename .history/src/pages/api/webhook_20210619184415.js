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

export default async (req , res)=>{
     if(req.method==='POST'){

     }
    
}