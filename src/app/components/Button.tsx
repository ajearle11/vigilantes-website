"use client";

type TButton = {
  title: string;
  twColor: "primary" | "secondary" | "accent";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (buttonProps: TButton) => {
  const colorSwitch = (color: "primary" | "secondary" | "accent"): string => {
    switch (color) {
      case "primary":
        return "#ff69b4";
      case "secondary":
        return "#00ffff";
      case "accent":
        return "#f3cc30";
      default:
        return "#000";
    }
  };

  return (
    <>
      <button
        onClick={buttonProps.onClick}
        className={`btn btn-xl btn-outline btn-${
          buttonProps.twColor
        } my-4 mx-3 font-bold shadow-[0_0_15px_${colorSwitch(buttonProps.twColor)}]`}
      >
        {buttonProps.title}
      </button>
    </>
  );
};

export default Button;
