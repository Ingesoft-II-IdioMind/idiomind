import styles from "../../../styles/TermsOfUse.module.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Terms of Use',
	description: 'Terms of Use page',
};

export default function TermsOfUse() {
  return (
    <>
      <h1>Terms and Conditions of Use</h1>
      <div className={styles.termsContainer}>
        <nav className={styles.navigation}>
          <h4>Table of Contents</h4>
          <ul>
            <li>
              <a href="#introduction" data-number="1">
                Introduction and Scope
              </a>
            </li>
            <li>
              <a href="#personal-information" data-number="2">
                Collection of Personal Information
              </a>
            </li>
            <li>
              <a href="#text-documents" data-number="3">
                Use of Text Documents
              </a>
            </li>
            <li>
              <a href="#audio-recordings" data-number="4">
                Audio Recording
              </a>
            </li>
            <li>
              <a href="#intellectual-property" data-number="5">
                Intellectual Property
              </a>
            </li>
            <li>
              <a href="#limitation-of-liability" data-number="6">
                Limitation of Liability
              </a>
            </li>
            <li>
              <a href="#modifications-updates" data-number="7">
                Modifications and Updates
              </a>
            </li>
            <li>
              <a href="#applicable-law-jurisdiction" data-number="8">
                Applicable Law and Jurisdiction
              </a>
            </li>
            <li>
              <a href="#payment-plans" data-number="9">
                Payment Plans
              </a>
            </li>
            <li>
              <a href="#contact" data-number="10">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <section id="introduction">
          <h4>1. Introduction and Scope</h4>
          <p>
            Welcome to IdioMind, a platform dedicated to providing tools for
            learning a new language. These terms and conditions of use
            (hereinafter, "Terms") govern the access and use of our service and
            any associated content. By accessing or using our service, you agree
            to comply with these terms. If you do not agree with any part of
            these terms, please do not use our service.
          </p>
        </section>

        <section id="personal-information">
          <h4>2. Collection of Personal Information</h4>
          <p>
            At IdioMind, we only collect limited personal information, including
            email addresses and names. This information is used solely to
            enhance the user experience and is handled in accordance with our
            privacy policy. User passwords are stored as hashes to ensure their
            security.
          </p>
        </section>

        <section id="text-documents">
          <h4>3. Use of Text Documents</h4>
          <p>
            We understand the importance of textual content in the language
            learning process. The text documents we store in our database are
            solely intended to enhance the learning experience of our users. We
            will not use these documents for commercial purposes or share them
            with third parties without your consent.
          </p>
        </section>

        <section id="audio-recordings">
          <h4>4. Audio Recording</h4>
          <p>
            We offer a tool for users to record themselves pronouncing words in
            the language they wish to learn. It is important to note that these
            audio recordings will not be stored anywhere on our platform. The
            privacy of our users is a priority, and we are committed to
            protecting it at all times.
          </p>
        </section>

        <section id="intellectual-property">
          <h4>5. Intellectual Property</h4>
          <p>
            Both user-generated content and content provided by IdioMind are
            protected by intellectual property rights. Users retain ownership of
            any content they generate and upload to the platform, but by doing
            so, they grant IdioMind a non-exclusive license to use such content
            for purposes related to the service.
          </p>
        </section>

        <section id="limitation-of-liability">
          <h4>6. Limitation of Liability</h4>
          <p>
            IdioMind is not liable for any direct, indirect, incidental,
            special, consequential, or punitive damages that may arise from the
            use or inability to use our service. The platform is provided "as
            is," and we do not guarantee the accuracy, timeliness, security, or
            availability of the service.
          </p>
        </section>

        <section id="modifications-updates">
          <h4>7. Modifications and Updates</h4>
          <p>
            We reserve the right to modify these terms at any time. Any
            modifications will be effective immediately upon posting on our
            platform. You will be notified of any significant changes to our
            terms, and your continued use of the service will constitute your
            acceptance of the new terms.
          </p>
        </section>

        <section id="applicable-law-jurisdiction">
          <h4>8. Applicable Law and Jurisdiction</h4>
          <p>
            These terms are governed by the laws of Colombia, and any dispute
            related to these terms shall be subject to the exclusive
            jurisdiction of the courts of Bogotá, Colombia.
          </p>
        </section>

        <section id="payment-plans">
          <h4>9. Payment Plans</h4>
          <p>
            We offer different payment plans for accessing all the features of
            our platform:
            <ul>
              <li>Free Version: Limited access to features.</li>
              <li>
                Monthly Plan: Full access to all features for a monthly
                subscription fee.
              </li>
              <li>
                Annual Plan: Full access to all features at a special discounted
                price for an annual subscription.
              </li>
            </ul>
            By subscribing to any of our payment plans, you agree to these terms
            and conditions of use.
          </p>
        </section>

        <section id="contact">
          <h4>10. Contact</h4>
          <p>
            If you have any questions, concerns, or comments about these terms
            and conditions, please feel free to contact us at
            idiomindapp@gmail.com.
          </p>
        </section>
      </div>
    </>
  );
}
