import React from "react";
import bringit from "../assets/briingit.jpg";
// You can replace icons with your own or use heroicons/lucide-react if installed

const AboutUsPage = () => {
  return (
    <section className="bg-gray-50 min-h-screen pb-16">
      
      {/* --------------------- HERO SECTION --------------------- */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-900 py-14 text-white text-center">
        <h1 className="text-4xl font-bold">About Briingit</h1>
        <p className="mt-3 text-lg opacity-90">
          India’s Most Trusted Online Book Marketplace
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* --------------------- WHO WE ARE SECTION --------------------- */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-orange-600">Briingit</span> is an online bookstore
            built with a vision to make quality books affordable, accessible, and just a click away.
            With thousands of curated titles — from fiction, competitive exam guides, self-help,
            biographies, spiritual literature, and more — we aim to fuel India’s reading culture.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Whether you’re a casual reader or a passionate book lover, Briingit ensures a
            smooth, premium, and trustworthy book-buying experience delivered right to your doorstep.
          </p>
        </div>

        {/* --------------------- OUR MISSION SECTION --------------------- */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To bring stories, knowledge, and inspiration closer to every reader in India.
              We want to create a space where books are accessible to all — students,
              professionals, dreamers, and learners.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700 mb-3">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To become India’s most trusted, reader-focused, and innovative online book marketplace —
              built on authenticity, fast delivery, and unmatched variety.
            </p>
          </div>
        </div>

        {/* --------------------- WHY CHOOSE US --------------------- */}
        <div className="bg-white shadow-lg p-8 rounded-2xl mb-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Why Choose Briingit?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600">📚 Huge Collection</h4>
              <p className="text-gray-700 mt-2">
                Thousands of books across genres — curated for students, readers & professionals.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600">🚀 Fast Delivery</h4>
              <p className="text-gray-700 mt-2">
                Quick and reliable doorstep delivery so your reading never stops.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-blue-600">🛡 100% Authenticity</h4>
              <p className="text-gray-700 mt-2">
                Only original & high-quality books — no duplicates, no low-quality prints.
              </p>
            </div>

          </div>
        </div>

        {/* --------------------- FOUNDER SECTION --------------------- */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <img
            src={bringit}
            className="h-36 w-36 mx-auto rounded-full shadow-lg"
            alt="founder"
          />
          <h2 className="text-2xl font-semibold mt-4">Rahul Borana</h2>
          <p className="text-gray-700 mb-4">
            Founder & CEO — <span className="font-bold text-orange-600">Briingit</span>
          </p>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            “Books changed my life — and Briingit is my way of sharing that experience with millions.
            Reading should be easy, affordable, and a part of everyone’s daily life.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;

// import React from 'react'
// import bringit from '../assets/briingit.jpg'
// const AboutUsPage = () => {
//   return (
//    <section >
//     <div>
//       <h1 className=' p-2 font-semibold py-3 shadow-lg'>About US</h1>
//     </div>
//     <div className=' mx-auto p-4' >
//        <div className='grid gap-4'>
//             <div className='flex h-70 shadow-lg border border-gray-100 bg-blue-50 rounded-2xl flex-col justify-center items-center'>
//                 <img src={bringit} className='h-32 w-32 shadow-lg rounded-full' alt='not found'/>
//                 <h1 className='my-2 font-semibold'>Rahul Borana</h1>
//                <h3 className="text-gray-700 text-base">Founder & CEO — <span className="font-bold text-orange-600">Briingit</span></h3>

//             </div>
//             <div  className=''>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque itaque reiciendis sunt laudantium hic, recusandae officiis? Labore animi sit non laborum fuga officia eaque modi facilis maxime iusto inventore voluptatem, corrupti nemo. Cupiditate ullam harum repellendus, deserunt repellat culpa eum nam aliquam! Unde, dolorem illum, voluptate architecto nemo, similique sapiente iusto voluptas reiciendis neque nihil pariatur ipsam rerum aliquam officia recusandae odio tempora quasi quae. Incidunt cumque blanditiis recusandae. Aspernatur iusto consequatur debitis in soluta eos quasi mollitia. In omnis earum nulla expedita cumque vero provident saepe, incidunt deleniti ratione possimus perspiciatis doloremque recusandae suscipit neque enim. Molestiae nostrum neque voluptate sit cupiditate perferendis fuga vel quisquam laudantium earum hic laborum, placeat, magnam repellendus itaque dicta delectus officiis. Veritatis dicta alias enim, illum quo libero quod velit explicabo eligendi incidunt. Fugiat accusamus, magnam ipsum natus ut quam tempore dicta amet iusto voluptates totam recusandae? Voluptas totam pariatur doloremque, culpa ex suscipit minus dignissimos tenetur similique id necessitatibus praesentium, expedita dicta eum, et accusantium earum. Doloremque odio, saepe reprehenderit provident obcaecati excepturi laboriosam adipisci officiis quae, doloribus iste ipsum illo ullam minima. Fugit natus vitae iste eos temporibus id! Distinctio quam vitae ut corrupti nam atque dolor cumque, rem debitis.
//              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit voluptatem modi, illum sunt consequatur commodi hic at, laborum fugit dicta pariatur ipsum! In perspiciatis adipisci unde itaque expedita magnam dignissimos enim dolore officia maxime ullam tempora necessitatibus quibusdam ad error, possimus deserunt quidem repellat quasi aperiam perferendis reiciendis nesciunt velit. Vero unde a ducimus, veniam repellat amet et enim corrupti ipsa praesentium accusamus ullam dolorum nobis dolorem quia facilis harum voluptatem excepturi sapiente! Quidem, dolorem. Necessitatibus ratione minus animi magnam architecto esse, cum facilis accusantium repellendus vel quos sunt a itaque ex. Voluptatibus eligendi aperiam molestias magnam voluptates, libero perferendis. Fugit quas in quam vero dicta explicabo possimus nobis, eum ab impedit reprehenderit ut labore, harum minima sint nostrum delectus tenetur perferendis autem eos corporis. Dolorum quidem sunt cum iusto enim molestiae esse sint ad, itaque adipisci qui explicabo doloribus omnis repellendus reprehenderit sequi dignissimos voluptates! Dicta ipsum eligendi impedit blanditiis, voluptatem dolor ullam. Corrupti, rem sit. Magni minima iste tempora consequuntur, est amet reprehenderit cum obcaecati cupiditate odio, assumenda magnam ipsa laborum nostrum provident iusto autem maiores corrupti. Animi itaque ullam quia quae, porro voluptatum delectus saepe, libero ipsum harum expedita pariatur nisi, magni veritatis consectetur. Alias, quo illum.
//             </div>
            
//        </div>

//     </div>
//    </section>
//   )
// }

// export default AboutUsPage
