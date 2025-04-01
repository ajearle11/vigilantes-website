"use client"
import { Button } from "./";
import { useNavigateToUrl } from "../hooks";
import { Input } from "./";
import { handleDownload } from "../utils/handleDownload";

const DownloadLayout = () => {
  const rickRoll = useNavigateToUrl(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4"
  );

  return (
    <>
      <Button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleDownload("Life In The Fast Brain Stems.zip");
        }}
        title="Life In The Fast Brain"
        twColor="green-400"
        shadowColor="#00ff00"
      />
      <Button
        onClick={rickRoll}
        title="Mondays"
        twColor="cyan-300"
        shadowColor="#00ffff"
      />
      <div className="flex-4 justify-center flex flex-col mx-4">
        <p className="text-neutral-300 mb-3 text-sm text-center">
          Want to stay informed? Add your email address here
        </p>
        <Input />
      </div>
    </>
  );
};

export default DownloadLayout;
