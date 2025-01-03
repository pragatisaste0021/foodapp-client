import React, { useState, useEffect } from 'react'
import { FaPaypal } from "react-icons/fa";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const CheckoutForm = ({price, cart}) => {

  const stripe = useStripe();
  const elements = useElements();

  const[cardError, setCardError] = useState('');

  const [clientSecret, setClientSecret] = useState("");

  const axiosSecure = useAxiosSecure();

  const {user} = useAuth();

  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  const [refetch] = useCart();

  useEffect(() => {

    if(typeof price !== 'number' || price < 1){
      console.log("Price is not a number");
      return;
    }
    
    axiosSecure.post("/create-payment-intent", {price}).then((res) => {
      console.log(res.data);
      setClientSecret(res.data.clientSecret);
    })
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      // console.log('[error]', error);
      setCardError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError("Success");
    }

  const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "anonymous",
          email: user?.email || "unknown",
        },
      },
    },
  );
  if(confirmError){
    console.log(confirmError);
  }
  else{
    console.log(paymentIntent);
  }

  // if(cardError === "Success"){
  //   console.log(paymentIntent.id);
  //   setCardError(`Your Transaction id is ${paymentIntent.id}`);
  //   const paymentInfo = {
  //     email: user.email,
  //     transitionId: paymentIntent.id,
  //     price,
  //     quantity: cart.length,
  //     status: "Order Pending",
  //     itemName: cart.map((item) => item.name),
  //     cartItems: cart.map((item) => item._id),
  //     menuItems: cart.map((item) => item.menuItemId)
  //   }
  //   console.log(paymentInfo);
  // }

  const paymentInfo = {
    email: user.email,
    transitionId: uuidv4(),
    price,
    quantity: cart.length,
    status: "Order Pending",
    itemName: cart.map((item) => item.name),
    cartItems: cart.map((item) => item._id),
    menuItems: cart.map((item) => item.menuItemId)
  }
  // console.log(paymentInfo);

  // Sending data to backend

  if(paymentMethod){
    await axiosSecure.post('/payments', paymentInfo).then(res => {
      console.log(res.data);
      alert("Payment Successful");
      const quantity = cart.length;
      // setCartCount(quantity - res.data.deleteCartRequest.deletedCount);

      const updatedCart = cart.filter((item) => !paymentInfo.cartItems.includes(item._id));
      // console.log(updatedCart)
      setCartCount(updatedCart.length);
      refetch;
      navigate("/order");
    })
  }
}

  return (
    <div className='flex flex-col md:flex-row justify-start gap-8'>
      
      {/* Left Side */}

      <div className='md:w-1/2 w-full space-y-3'>
        
        {/* Order Summary */}

        <h4 className='text-lg text-green font-semibold'>Order Summary</h4>
        <p className='text-black'>Total Price : ${price}</p>
        <p className='text-black'>Number Of Items : {cart.length}</p>
      </div>

      {/* Right Side */}

      <div className='md:w-1/3 w-full space-y-3 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl px-4 py-8'>
        <h4 className='text-lg text-green font-semibold'>Process Your Payment</h4>
        <h5 className='font-medium'>Credit/Debit Card</h5>

        {/* Stripe Form */}

        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 bg-green text-white btn-primary w-full'>
          Pay
        </button>
      </form>

      {/* PayPal */}

      <div className='mt-5 text-center'></div>
      <hr className='h-2'/>
      <button type='submit' className='btn btn-sm bg-green text-white mt-5'><FaPaypal></FaPaypal>Pay With Paypal</button>
      {
            cardError ? <p className='text-red'>{cardError}</p> : ''
      }
      </div>
    </div>
  )
}

export default CheckoutForm
