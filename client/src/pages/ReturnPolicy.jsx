import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="w-full bg-orange-50 min-h-screen py-10 px-4">
      
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
        Return Policy – Briingit.in
      </h1>

      {/* Disclaimer Box */}
      <div className="bg-orange-200 border border-orange-400 text-orange-900 p-4 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold"> Disclaimer (Important)</h2>
        <p className="mt-2">
          Returns must be initiated <b>within 3 days</b> of receiving the product.
          After 3 days, the return request becomes invalid automatically.
          Please check your product as soon as it arrives ❤️
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-md rounded-2xl p-6 lg:p-10 space-y-8">

        {/* Intro */}
        <section>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">Welcome ❤️</h2>
          <p className="text-gray-700 leading-7">
            Thank you so much for ordering from <b>Briingit.in</b>.  
            Honestly, it makes us a bit sad that you had to open the Return
            Policy page — because usually customers land here when the product
            didn’t match their expectations or they didn’t like it completely 💔  
            <br /><br />
            But no worries…  
            We want to ensure your return experience is <b>100% smooth and
            hassle-free</b>. Your satisfaction is our priority.
          </p>
        </section>

        {/* 3 Return Methods */}
        <section>
          <h2 className="text-2xl font-bold text-orange-600 mb-4">
            🟧 2 Easy Ways to Return Your Product
          </h2>

          <div className="space-y-6">
            {/* 1 */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500">
                1) Visit Our Offline Store
              </h3>
              <p className="text-gray-700 mt-1">
                You can directly visit our offline store and return the product
                instantly.  
                The address is available on our “Offline Store” page.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500">
                2) WhatsApp (Fastest Method)
              </h3>
              <p className="text-gray-700 mt-1">
                Simply send us a WhatsApp message at: <b className="text-orange-600 font-bold">9509564298</b>&nbsp;
                Include the following details:
                <ul className="list-disc ml-6 mt-2">
                  <li>Your Name</li>
                  <li>Your Email</li>
                  <li>Order Id</li>
                </ul>
                Our team will contact you <b>within 24 hours</b>.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h3 className="text-lg font-semibold text-orange-500">
             Zero Questions Asked – 0% Deduction
              </h3>
              <p className="text-gray-700 mt-1">
                We will not ask you any questions regarding why you are
                returning the product.  
                Your refund will be <b>100% full</b> with <b>0% deduction</b>.
              </p>
            </div>
          </div>
        </section>

        {/* Refund Time */}
        <section>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">
             Refund Duration
          </h2>
          <p className="text-gray-700 leading-7">
            Once your return request is approved, the complete process of
            returning the product and receiving your money back will take a
            maximum of <b>2 days</b>.  
            Refunds will be issued to the original payment method.
          </p>
        </section>

        {/* Notes */}
        <section>
          <h2 className="text-2xl font-bold text-orange-600 mb-3">
             Important Notes
          </h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Return request must be raised within <b>3 days</b>.</li>
            <li>The product should be in a simple, usable condition.</li>
            <li>COD order refunds will be processed through UPI .</li>
            <li>WhatsApp support is available 24×7.</li>
          </ul>
        </section>

        {/* Final Message */}
        <section>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">
            ❤️ A Special Message From Briingit
          </h2>
          <p className="text-gray-700 leading-7">
            We know returns can be frustrating.  
            That’s exactly why we’ve made the entire return experience as easy
            and smooth as possible.  
            If you ever face an issue, just message us on WhatsApp —  
            we will personally help you out.  
            <br /><br />
            Your trust means everything to us.  
            **Thank you for being a part of the Briingit family 🧡**
          </p>
        </section>

      </div>
    </div>
  );
};

export default ReturnPolicy;
