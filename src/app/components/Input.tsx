"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../utils/apiRequests";
import { strictEmailRegex } from "../utils/helpers";

type TInput = {
  image?: boolean;
  imagesrc?: string;
};

const Input = ({ image = false, imagesrc }: TInput) => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [regexError, setRegexError] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setShowSuccess(true);
      setEmail("");
      setTimeout(() => setShowSuccess(false), 3000); // auto hide
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handleSubmit = () => {
    if (!email || regexError) return;
    mutate(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <fieldset className="fieldset">
        <legend className="fieldset-legend mb-1">
          Want to stay informed? Add your email address here
        </legend>
        <label
          className={`input ${
            isError || regexError
              ? "input-error"
              : showSuccess
              ? "input-success"
              : "input-neutral"
          } input-md`}
        >
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value !== "") {
                !strictEmailRegex.test(e.target.value)
                  ? setRegexError(true)
                  : setRegexError(false);
              } else {
                setRegexError(false);
                setIsError(false);
              }
            }}
            disabled={isPending}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            type="email"
            className="grow"
            placeholder="Enter your email"
          />
          {image && (
            <span>
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="cursor-pointer  p-2 
              transition hover:scale-110 hover:brightness-125 
              "
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-md text-neutral mb-1"></span>
                ) : (
                  <img
                    src={imagesrc}
                    alt="Send"
                    className="ml-2 w-6 h-7 opacity-90 transition"
                  />
                )}
              </button>
            </span>
          )}
        </label>
        <p
          className={`fieldset-label  ${
            isError || regexError
              ? `text-error`
              : showSuccess
              ? "text-success"
              : ""
          }`}
        >
          {isError
            ? `Error: ${(error as Error).message}`
            : regexError
            ? "Please enter a valid email address"
            : showSuccess
            ? "Email sent successfully"
            : ""}
        </p>
      </fieldset>
    </div>
  );
};

export default Input;
