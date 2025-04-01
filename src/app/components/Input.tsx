"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

type TInput = {
  image?: boolean;
  imagesrc?: string;
};

const sendEmail = async (email: string) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
};

const Input = ({ image = false, imagesrc }: TInput) => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 3000); // auto hide
    },
  });

  const handleSubmit = () => {
    if (!email) return;
    mutate(email);
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
        disabled={isPending}
        className="flex h-12 w-full rounded-xl border border-amber-700 
        bg-amber-900/70 px-4 pr-12 text-neutral-300
        placeholder:text-neutral-300 shadow-md transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
        hover:shadow-lg hover:shadow-amber-500/20 focus:scale-[1.01]
        disabled:opacity-60 disabled:cursor-not-allowed"
      />
      {image && (
        <>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="cursor-pointer absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-2 
          transition hover:scale-110 hover:brightness-125 
          focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-1
          disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <img
                src={imagesrc}
                alt="Send"
                className="w-5 h-5 opacity-90 transition"
              />
            )}
          </button>
          {isError && (
            <p className="mt-2 pb-10 absolute  text-sm text-red-400">
              Error: {(error as Error).message}
            </p>
          )}
          {showSuccess && (
            <p className="mt-2 pb-10 absolute text-sm text-green-400">
              Email sent successfully!
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
