"use client";
import { useEffect, useState } from "react";
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
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [regexError, setRegexError] = useState(false);
  const [errorAnimation, setErrorAnimtaion] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: sendEmail,
    onSuccess: (data) => {
      setShowSuccess(true);
      setSuccessMessage(data.message);
      setEmail("");
      if (data.message !== "Email already subscribed") {
        setTimeout(() => setShowSuccess(false), 3000);
      }
    },

    onError: () => {
      setIsError(true);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorAnimtaion(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [errorAnimation]);

  const handleSubmit = () => {
    if (!email || regexError) {
      setErrorAnimtaion(true);
      return;
    }

    setIsError(false);
    setRegexError(false);

    mutate(email);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center  flex justify-center">
      <fieldset className="fieldset">
        <legend className="fieldset-legend font-mono mb-1 opacity-80">
          Want to stay informed? Add your email address here
        </legend>
        <label
          className={`input ${
            isError ||
            regexError ||
            (showSuccess && successMessage === "Email already subscribed")
              ? "input-error"
              : showSuccess
              ? "input-success"
              : "input-neutral"
          } input-md opacity-80 ${errorAnimation ? "animate-shake" : ""}`}
        >
          <input
            onChange={(e) => {
              setSuccessMessage("");
              setEmail(e.target.value);
              if (e.target.value !== "") {
                setShowSuccess(false);
                if (!strictEmailRegex.test(e.target.value)) {
                  setRegexError(true);
                } else {
                  setRegexError(false);
                }
              } else {
                setRegexError(false);
                setIsError(false);
              }
            }}
            disabled={isPending}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            value={email}
            type="email"
            className="grow font-mono"
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
            isError ||
            regexError ||
            (showSuccess && successMessage === "Email already subscribed")
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
            ? successMessage
            : ""}
        </p>
      </fieldset>
    </div>
  );
};

export default Input;
