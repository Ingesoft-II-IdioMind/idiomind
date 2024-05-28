

import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import QueryString from 'query-string';
import React from 'react';
import { useEffect } from 'react';

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_HOST || ''
);

export default function StripeComponent() {
	const router = useRouter();

	React.useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search);
		if (query.get('success')) {
		  console.log('Order placed! You will receive an email confirmation.');
		}
	
		if (query.get('canceled')) {
		  console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
		}
	  }, []);

	return (
		<section>
			<div className='product'>
				<img
					src='https://i.imgur.com/EHyR2nP.png'
					alt='The cover of Stubborn Attachments'
				/>
				<div className='description'>
					<h3>Stubborn Attachments</h3>
					<h5>$20.00</h5>
				</div>
			</div>
			<form
				action={`${process.env.NEXT_PUBLIC_HOST}/api/stripe/checkout/annual`}
				method='POST'
			>
				<button className='button' type='submit'>
					Checkout
				</button>
			</form>
		</section>
	);
};



// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js/pure";
// import CheckoutForm from "app/components/shared/Subscription/CheckoutForm";

// const stripePromise = loadStripe('pk_test_Dt4ZBItXSZT1EzmOd8yCxonL');

// const StripeComponent = () => {

//     const options = {
//         // passing the client secret obtained from the server
//         clientSecret: '{{CLIENT_SECRET}}',
//       };

//   return (
//     <Elements stripe={stripePromise} options={options}>
//       <CheckoutForm />
//     </Elements>
//   );
// };
// export default StripeComponent;
