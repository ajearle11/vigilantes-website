import validator from "validator";

type SendEmailResponse = {
  success: boolean;
  message: string;
};

const sendEmail = async (email: string): Promise<SendEmailResponse> => {
  try {
    await new Promise((res) => setTimeout(res, 3000));

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    const sanitizedEmail = validator.normalizeEmail(email);

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sanitizedEmail }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Failed to send email");
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Failed to send email"
    );
  }
};

const sendAnalytics = async () => {
  try {
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ download: 1 }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed");
    }

    return data;
  } catch (error) {
    console.error("Failed");
  }
};

export { sendEmail, sendAnalytics };
