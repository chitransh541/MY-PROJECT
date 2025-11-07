import React, { useState } from "react";
import "./App.css"; 

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      setStatus(" Please fill all the fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus(" Please enter a valid email.");
      return;
    }

    const formData = { name, email, phone, message };

    try {
      const res = await fetch("https://vernanbackend.ezlab.in/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.ok) {
        setStatus(" Form Submitted Successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus(` Failed to submit form (Status: ${res.status})`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus(" Network error. Try again later.");
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Your Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <p className="status">{status}</p>
    </div>
  );
};

export default App;
