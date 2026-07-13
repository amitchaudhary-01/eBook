import react from 'react'
import { useState } from 'react';


export default function Newsletter() {
  const [email, setEmail] = useState('');

 const subscribeEmail = async () => {
  if (!email) {
    return alert("Please enter an email");
  }

  try {
    const response = await fetch("http://localhost:3000/api/v1/newsletter/subscribe",  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      setEmail("");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Could not connect to backend");
  }
};
  return (

<section className="bg-indigo-600 text-white py-16 px-8 md:px-24 mx-8 md:mx-24 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 my-16">

   <div className="newsletter-banner">
        <div>
          <h3 className="text-3xl font-extrabold mb-2">Stay Updated With Our Newsletter</h3>
          <p className="text-indigo-100 text-sm">Get the latest updates, special offers, and book recommendations direct to your inbox.</p>
        </div>
        <div className="flex w-full md:w-auto max-w-md gap-2 bg-white/10 p-2 rounded-2xl backdrop-blur-md">
          <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="bg-transparent text-white placeholder-indigo-200 px-4 py-2 focus:outline-none w-full text-sm"
/>
          <button
  onClick={subscribeEmail}
  className="bg-white text-indigo-600 font-bold px-5 py-2 rounded-xl text-sm hover:bg-indigo-50 transition"
>
  Subscribe
</button>
        </div>
     
    </div>

     
    </section>
  );
}