import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const faqData = [
  {
    q: "I’m facing issues while ordering. What should I do?",
    a: "You can message us on WhatsApp at 9509564298 or call directly. Your issue will be resolved quickly."
  },
  {
    q: "Can I cancel my order?",
    a: "After placing your order, you will receive a WhatsApp message within 1–3 hours. You can confirm or cancel from there."
  },
  {
    q: "What locations do you deliver to?",
    a: "We currently deliver in Virar, Vasai, and Nallasopara."
  },
  {
    q: "How long will my order take to arrive?",
    a: "Your product will be delivered within 2 days. If any changes occur, you will be informed via WhatsApp."
  },
  {
    q: "How many days will it take to receive my refund?",
    a: "The entire refund process takes less than 48 hours."
  },
  {
    q: "Are there any return charges?",
    a: "No, there are currently no return charges."
  },
  {
    q: "What if I receive a damaged or wrong product?",
    a: "Send your order ID, name, and issue details to 9509564298. Our team will contact you within 12–24 hours."
  },
  {
    q: "Can I edit my address after ordering?",
    a: "You cannot change the address through the website, but when you receive a WhatsApp confirmation message, you can request an address update."
  },
  {
    q: "Can I pick up my order from the shop?",
    a: "Yes, you can pick up your order from our offline store."
  },
  {
    q: "Can I return/exchange products at the offline store?",
    a: "Yes, you can return or replace your product at our offline store."
  },
  {
    q: "How can I contact customer support?",
    a: "You can contact our support team at 9509564298."
  },
  {
    q: "What are your support hours?",
    a: "We try to provide 24x7 support. If your call is missed, we will call you back."
  },
  {
    q: "How long does it take for the support team to reply?",
    a: "Our support team usually replies within 1–4 hours."
  }
];

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-orange-50 mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-extrabold text-orange-500 mb-6 text-center">Support & Help Center</h1>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 border border-orange-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-900"
            >
              {item.q}
              <MdOutlineKeyboardArrowDown
                className={`text-2xl text-orange-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-[15px] leading-relaxed border-t pt-3">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
