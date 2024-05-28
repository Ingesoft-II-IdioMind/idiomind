import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import { TextField } from "../TextField";
import { Button } from "../Button";
import ApiService from "app/data/stripe";

const CheckoutForm = () => {
        const [error, setError] = useState(null);
        const [email, setEmail] = useState('');
        const stripe = useStripe();
        const elements = useElements();

        // Handle real-time validation errors from the card Element.
        const handleChange = (event:any) => {
            if (event.error) {
                setError(event.error.message);
            } else {
                setError(null);
            }
        }

        // Handle form submission.
        const handleSubmit = async (event:any) => {
            if (event.error) {
                setError(event.error.message);
              } else {
                setError(null);
              }
                // event.preventDefault();
            
                // if (stripe && elements) {
                //     const card = elements?.getElement(CardElement);
                //     if (card) {
                //         const { paymentMethod, error } = await stripe.createPaymentMethod({
                //             type: 'card',
                //             card: card,
                //         });
                //         console.log(paymentMethod);
                //         if (error) {
                //             setError((error as any).response.data);
                //         }
                //         else {
                //             ApiService.saveStripeInfo({email, payment_method_id: paymentMethod.id}).then(response => {
                //                 console.log(response.data);
                //             }).catch(error => {
                //                 console.log(error)
                //             })
                //         }
                        
                //     }
                // }
            };

        return (
            <form onSubmit={handleSubmit} className="stripe-form">
                <div className="form-row">
                    <TextField label="Email Address">
                        <input
                        className="form-input"
                        id="email"
                        name="name"
                        type="email"
                        placeholder="jenny.rosen@example.com"
                        required
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    </TextField>
                    
                </div>
                <div className="form-row">
                <TextField label=" Credit or debit card">    
                </TextField>
                
                    <CardElement
                        id="card-element"
                        onChange={handleChange}
                    />
                    <div className="card-errors" role="alert">{error}</div>
                </div>
                <Button type="submit">Submit Payment</Button>
                {/* <button type="submit" className="submit-btn">Submit Payment</button> */}
            </form>
        );

    }
;

export default CheckoutForm;