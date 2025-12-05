
const AboutUsPage = () => {
  return (
    <section className="bg-orange-50 min-h-screen ">
      
      {/* --------------------- HERO SECTION --------------------- */}
      <div className="w-full bg-gradient-to-r from-orange-500 to-orange-700 py-14 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">About Briingit</h1>
        <p className="mt-3 text-lg opacity-90">
          India’s Most Trusted Writing Book & Stationery Marketplace
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* --------------------- WHO WE ARE --------------------- */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mb-10 border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-700 mb-3">Who We Are</h2>

          <p className="text-gray-700 leading-relaxed">
            Dekho bhai, hum koi badi corporate company nahi hain — 
            par hamara <span className="font-bold text-orange-600">aim sach me bada hai.</span>  
            Hum chahte hain ki India me har student, learner, aur office user ko 
            <span className="font-semibold text-orange-600"> affordable & high-quality writing books</span> easily mil jayein.
          </p>

          <p className="text-gray-700 leading-relaxed mt-3">
            A4 size notebooks, long books, writing books, exam-oriented stationery —
            hum sab kuch saste me aur best quality me dene ki puri koshish karte hain.
            Simple log hain, but intention clear hai:
            <span className="font-semibold text-orange-600"> “Har kisi ko best writing experience dena.”</span>
          </p>
        </div>

        {/* --------------------- MISSION VISION --------------------- */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-orange-700 mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              Hamara mission hai ki India me ek aisa platform banaye jahan 
              <span className="font-semibold text-orange-600"> A-Z books & stationery </span>
              ek hi jagah mil jayein — chahe koi bhi brand ho, koi bhi need ho.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-orange-700 mb-3">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              Sach bataun? Aim yeh hi hai ki Briingit India ki 
              <span className="font-semibold text-orange-600"> most-trusted book website </span> bane.
              Lekin dil ki baat?  
              <span className="font-semibold text-orange-600"> Amazon aur Flipkart ko replace karna 😎</span>  
              (just for fun… but dreams are big!)
            </p>
          </div>

        </div>

        {/* --------------------- WHY CHOOSE US --------------------- */}
        <div className="bg-white shadow-xl p-8 rounded-2xl mb-12 border border-orange-200">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">
            Why Choose Briingit?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Fast Delivery */}
            <div className="p-6 border rounded-xl hover:shadow-md transition bg-orange-50 border-orange-200">
              <h4 className="text-xl font-semibold text-orange-700">⚡ Fast Delivery</h4>
              <p className="text-gray-700 mt-2">
                Dekho guys, har cheez time leti hai — but hum jitna possible ho sake
                utna fast delivery karne ki puri try karte hain.
              </p>
            </div>

            {/* Huge Collection */}
            <div className="p-6 border rounded-xl hover:shadow-md transition bg-orange-50 border-orange-200">
              <h4 className="text-xl font-semibold text-orange-700">📚 Huge Collection</h4>
              <p className="text-gray-700 mt-2">
                Writing books ki sabse badi variety — Sundaram, Classmate, Metro, 
                Classflow, Sulabh aur bohot saare brands ek hi jagah.
              </p>
            </div>

            {/* Authenticity */}
            <div className="p-6 border rounded-xl hover:shadow-md transition bg-orange-50 border-orange-200">
              <h4 className="text-xl font-semibold text-orange-700">🛡 100% Authenticity</h4>
              <p className="text-gray-700 mt-2">
                Isliye toh <span className="font-semibold">Cash On Delivery</span> rakha hai!
                Pehle product check karo, fir payment karo.  
                Aur haan — agar return dena ho toh mujhe directly de dena,  
                waise bhi coding se meri kamar tight ho jaati hai…  
                thodi walking ho jayegi 😆
              </p>
            </div>

          </div>
        </div>


      </div>
    </section>
  );
};

export default AboutUsPage;
