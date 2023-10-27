import {Request,Response,NextFunction as NF} from "express";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_KEY || "xyz" as string,{
  apiVersion: "2022-11-15",
});

const payment = async (req: Request,res: Response,next: NF) => {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
    });

    const clientSecret = intent.client_secret;

    res.status(201).json({clientSecret});
  } catch(error) {
    next(error);
  }
};

export default payment;
