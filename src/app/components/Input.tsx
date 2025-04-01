"use client";
import { useState } from "react";

const Input = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log("Response:", result);
      alert("Email sent successfully!");
      setEmail(""); // clear input
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        placeholder="Enter your email"
        value={email}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        onChange={(e) => setEmail(e.target.value)}
        className="flex h-12 w-full rounded-xl border border-indigo-700 
      bg-indigo-900/70 backdrop-blur-md px-4 pr-12 text-indigo-100
      placeholder:text-indigo-300 shadow-md transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      hover:shadow-lg hover:shadow-indigo-500/20 focus:scale-[1.01]"
      />
      <button
        onClick={handleSubmit}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 
      transition hover:scale-110 hover:brightness-125"
      >
        <img
          src="/rightSend.svg"
          alt="Send"
          className="w-5 h-5 opacity-90 transition"
        />
      </button>
    </div>
  );
};

export default Input;
