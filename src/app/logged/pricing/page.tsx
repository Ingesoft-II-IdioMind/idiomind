import { PricingPlan } from "app/components/home/PricingPlan";
import styles from "../../../styles/Pricing.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Pricing',
	description: 'Pricing page',
};

export default function Pricing() {
  const benefitsFree = [
    "Free Upload up to 50 documents",
    "Ilimited translations",
    "20 underlined words per document",
    "Up to 50 flashcards",    
    "Acces to basic grammar exercises",
    "Acces to basic speaking exercises",
  ];

  const benefitsMonth = [
    "Month Upload up to 50 documents",
    "Ilimited flashcards",
    "Ilimited translations",
    "Ilimited underlined words",
    "Acces to all grammar exercises",
    "Acces to all speaking exercises",
  ];

  const benefitsAnnual = [
    "Year Upload up to 50 documents",
    "Ilimited flashcards",
    "Ilimited translations",
    "Ilimited underlined words",
    "Acces to all grammar exercises",
    "Acces to all speaking exercises",
  ];
  return (
    <>
      <h1>Pricing</h1>
      <p className="ST center">Choose a subscription plan that suits your needs.</p>
      <div className={styles.pricingPlansContainer}>
        <PricingPlan
          benefits={benefitsFree}
          price= "0$ /month"
          name = "Free explorer"
          periodicity= "No payment"
          cardTypeRecommended={false}
          registered = {true}
        />
        <PricingPlan
          benefits={benefitsMonth}
          name = "Monthly Voyager"
          price={"7$ /month"}
          periodicity={"Montly payment"}
          cardTypeRecommended={true}
          registered = {true}
        />
        <PricingPlan
          benefits={benefitsFree}
          name = "Annual Odyssey"
          price={"70$ /year"}
          periodicity={"Annual payment"}
          cardTypeRecommended={false}
          registered = {true}
        />
      </div>
    </>
  );
}
