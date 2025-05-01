import { Metadata } from "next";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Terms and Conditionss",
  description:
    "Welcome to Recording Alchemy! By purchasing, subscribing, or using our services, you agree to the following Terms and Conditions",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className=" w-full relative px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 md:pt-12 lg:pt-16 ">
        <Navbar />
      </div>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Page Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-4 bg-gradient-to-r from-[#A87740] via-[#FBDDA3] to-[#A87740] bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <time className="text-white text-lg">Effective Date: 4-26-25</time>
        </div>

        {/* Welcome Section */}
        <div className="text-white mb-10">
          <p className="text-lg mb-8">
            Welcome to Recording Alchemy! By purchasing, subscribing, or using
            our services, you agree to the following Terms and Conditions:
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-10 text-white mb-16">
          {/* Services */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              1. Services
            </h2>
            <p className="text-base md:text-lg">
              Recording Alchemy provides educational materials, recording
              templates, live Zoom sessions, and community support through
              Discord to help artists learn to confidently record, mix, and
              master their own music.
            </p>
          </section>

          {/* Access and Licensing */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              2. Access and Licensing
            </h2>
            <p className="text-base md:text-lg">
              All course materials, templates, and resources are for individual
              use only. Sharing, reselling, or redistributing any content
              without written permission from Recording Alchemy is prohibited.
            </p>
          </section>

          {/* Memberships and Subscriptions */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              3. Memberships and Subscriptions
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
              <li>
                Monthly memberships renew automatically unless canceled at least
                3 days before the next billing cycle.
              </li>
              <li>
                Annual memberships must be canceled at least 30 days before
                renewal.
              </li>
              <li>
                Access to the Discord community and live Zoom calls is included
                while membership is active.
              </li>
            </ul>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              4. Payment
            </h2>
            <p className="text-base md:text-lg">
              All payments are processed securely through our platform. Pricing
              is listed in USD and is subject to change with notice.
            </p>
          </section>

          {/* Account Responsibility */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              5. Account Responsibility
            </h2>
            <p className="text-base md:text-lg">
              You are responsible for maintaining the confidentiality of your
              account login information. Unauthorized sharing may result in
              suspension or termination without refund.
            </p>
          </section>

          {/* Changes to Services */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              6. Changes to Services
            </h2>
            <p className="text-base md:text-lg">
              Recording Alchemy reserves the right to update or modify services,
              pricing, or these terms at any time. We will notify users of any
              significant changes.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              7. Contact
            </h2>
            <p className="text-base md:text-lg">
              If you have questions regarding these Terms and Conditions, please
              contact us at{" "}
              <a
                href="mailto:jamin@recordingalchemy.com"
                className="text-[#FBDDA3] hover:underline transition-all duration-300"
              >
                jamin@recordingalchemy.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* Refund Policy Section - Divider */}
        <div className="border-t border-[#BC8431] my-16"></div>

        {/* Refund Policy Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-[#A87740] via-[#FBDDA3] to-[#A87740] bg-clip-text text-transparent">
            Recording Alchemy Refund and Cancellation Policy
          </h1>
          <p className="text-white text-lg">Effective Date: 4-26-25</p>
        </div>

        {/* Refund Policy Intro */}
        <div className="text-white mb-10">
          <p className="text-lg mb-6">
            We are committed to helping you achieve your music recording goals.
            Please review our refund policy below:
          </p>
        </div>

        {/* Refund Policy Sections */}
        <div className="space-y-10 text-white">
          {/* Digital Products */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              1. Digital Products (Templates, Courses, and Resources)
            </h2>
            <p className="text-base md:text-lg">
              Due to the nature of digital products, all sales of templates,
              pre-recorded courses, and downloadable resources are final and
              non-refundable.
            </p>
          </section>

          {/* Memberships */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              2. Memberships (Monthly/Annual Access)
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-base md:text-lg">
              <li>
                Monthly memberships: You may cancel your membership at any time.
                No refunds are issued for partial months.
              </li>
              <li>
                Annual memberships: If canceled within 14 days of purchase, you
                may request a 50% refund. After 14 days, no refunds are
                available.
              </li>
            </ul>
          </section>

          {/* Live Coaching Sessions */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              3. Live Coaching Sessions and Zoom Calls
            </h2>
            <p className="text-base md:text-lg">
              Missed live sessions are non-refundable. Recordings will be made
              available when possible.
            </p>
          </section>

          {/* Technical Issues */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              4. Technical Issues
            </h2>
            <p className="text-base md:text-lg">
              If technical issues prevent access to content and cannot be
              resolved within a reasonable time frame (72 hours), a prorated
              refund or extension may be considered.
            </p>
          </section>

          {/* How to Request a Refund */}
          <section>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold mb-4 text-[#FBDDA3]">
              5. How to Request a Refund
            </h2>
            <p className="text-base md:text-lg">
              To request a refund or cancellation, please email us at{" "}
              <a
                href="mailto:jamin@recordingalchemy.com"
                className="text-[#FBDDA3] hover:underline transition-all duration-300"
              >
                jamin@recordingalchemy.com
              </a>{" "}
              with your name, order details, and reason for the request. We aim
              to respond within 3 business days.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
