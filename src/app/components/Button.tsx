"use client"

type TButton = {
  title: string;
  twColor: keyof typeof colorClassMap;
  shadowColor: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const colorClassMap = {
  "green-400": {
    text: "text-green-400",
    border: "border-green-400",
    hoverBg: "hover:bg-green-400",
    shadow: "shadow-[0_0_15px_#00ff00]",
  },
  "cyan-300": {
    text: "text-cyan-300",
    border: "border-cyan-300",
    hoverBg: "hover:bg-cyan-300",
    shadow: "shadow-[0_0_15px_#00ffff]",
  },
};

const Button = (buttonProps: TButton) => {
  const color = colorClassMap[buttonProps.twColor];

  return (
    <>
      <button
        onClick={buttonProps.onClick}
        className={`cursor-pointer my-5 mx-6 px-6 py-3 text-xl font-bold ${color.text} border-2 ${color.border}  rounded-lg ${color.hoverBg}  hover:text-black transition-all ${color.shadow} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-netural-900 focus-visible:ring-offset-1 `}
      >
        {buttonProps.title}
      </button>
    </>
  );
};

export default Button;
