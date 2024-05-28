"use client"

import { Button } from "app/components/shared/Button";
import styles from "./PricingPlan.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStripeAnnualMutation } from "app/redux/features/stripeApiSlice";

interface PricingPlanProps {
  benefits: string[];
  price: string;
  name: string;
  periodicity: string;
  cardTypeRecommended: boolean;
  registered: boolean;
}

export const PricingPlan: React.FC<PricingPlanProps> = ({
  benefits,
  price,
  cardTypeRecommended,
  periodicity,
  name,
  registered,
}) => {
  const checkIconURL = cardTypeRecommended
    ? "/icons/checkIconRecommended.svg"
    : "/icons/checkIcon.svg";
  const titleText = cardTypeRecommended ? "Most Common" : "Recommended";


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
    <div
      className={
        cardTypeRecommended ? styles.cardTypeRecommended : styles.pricingPlan
      }
    >
      <div className={styles.title}>
        {cardTypeRecommended ? (
          <p style={{ textAlign: "right", fontWeight: 700, marginBottom: 8 }}>
            {titleText}
          </p>
        ) : (
          <></>
        )}
        <h5>{name}</h5>
        <p>{periodicity}</p>
      </div>
      <h5 className={styles.price}>{price}</h5>
      {registered ? (
        periodicity == "Montly payment" ? (
          <form
            action={`${process.env.NEXT_PUBLIC_HOST}/api/stripe/checkout/monthly`}
            method="POST"
          >
            <Button type="submit">Choose this plan</Button>
          </form>
        ) : periodicity == "Annual payment" ? (
          <form
            action={`${process.env.NEXT_PUBLIC_HOST}/api/stripe/checkout/annual`}
            method="POST"
          >
            <Button type="submit">Choose this plan</Button>
          </form>
        ) : (
          <Link href={"/auth/register"}>
            <Button>Choose this plan</Button>
          </Link>
        )
      ) : (
        <Link href={"/auth/register"}>
          <Button>Choose this plan</Button>
        </Link>
      )}

      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>
            <Image src={checkIconURL} alt="checkIcon" width={24} height={24} />
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        href={"/termsOfUse"}
        className={
          cardTypeRecommended ? styles.linkColorRecommended : styles.linkColor
        }
      >
        Check terms and conditions
      </Link>
    </div>
  );
};
