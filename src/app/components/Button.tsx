"use client";

type TButton = {
  title: string;
  twColor: "btn-primary" | "btn-secondary" | "btn-accent";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = (buttonProps: TButton) => {
  const colorSwitch = (color: "btn-primary" | "btn-secondary" | "btn-accent"): string => {
    switch (color) {
      case "btn-primary":
        
        return "shadow-[0_0_15px_#ff69b4]";
        case "btn-secondary":
        return "shadow-[0_0_15px_#00ffff]";
        case "btn-accent":
        return "shadow-[0_0_15px_#f3cc30]";
        default:
        return "";
    }
  };

  return (
    <>
      <button
        onClick={buttonProps.onClick}
        className={`btn btn-xl btn-outline ${
          buttonProps.twColor
        } my-4 mx-3 font-bold ${colorSwitch(buttonProps.twColor)}`}
      >
        {buttonProps.title}
      </button>
    </>
  );
};

export default Button;
