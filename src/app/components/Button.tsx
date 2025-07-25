"use client";

type TButton = {
  title: string;
  twColor: "btn-primary" | "btn-secondary" | "btn-accent";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ title, twColor, onClick }: TButton) => {
  const colorSwitch = (
    color: "btn-primary" | "btn-secondary" | "btn-accent"
  ): string => {
    switch (color) {
      case "btn-primary":
        return "shadow-[0_0_15px_#c8ab0f]";
      case "btn-secondary":
        return "shadow-[0_0_15px_#00ffff]";
      case "btn-accent":
        return "shadow-[0_0_15px_#f3cc30]";
      default:
        return "";
    }
  };

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick(e);
      }}
      className={`p-8 text-sm md:text-lg font-mono uppercase btn btn-xl btn-outline ${twColor} opacity-80 my-4 mx-5 font-bold ${colorSwitch(twColor)}`}

    >
      {title}
    </button>
  );
};

export default Button;
