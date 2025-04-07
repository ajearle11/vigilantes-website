"use client";

import { Button } from "./";
import { useNavigateToUrl } from "../hooks";
import { Input } from "./";
import { handleDownload } from "../utils/helpers";

const DownloadLayout = () => {
  const rickRoll = useNavigateToUrl(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4"
  );

  const goToGoldenRecord = useNavigateToUrl(
    "https://goldenrecord.org"
  )

  return (
    <>
      <div className="flex flex-col flex-2 justify-end"></div>
      <Button onClick={goToGoldenRecord} title="Golden Record" twColor="btn-primary" />
      <div className="flex flex-col flex-4 justify-end">
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDownload(
              "https://dl.dropboxusercontent.com/scl/fi/sdupb68odyuz1d9jpmb8b/Life-In-The-Fast-Brain-Stems.zip?rlkey=rzwsolwvzltc8mbgy706qpxnv&dl=1"
            );
          }}
          title="Life In The Fast Brain"
          twColor="btn-primary"
        />
        <Button onClick={rickRoll} title="Mondays" twColor="btn-primary" />
        {/* <Button onClick={rickRoll} title="Sink" twColor="accent" /> */}
      </div>
      <div className="flex-4 justify-center flex flex-col mx-4">
        <Input image={true} imagesrc="/rightSend.svg" />
      </div>
    </>
  );
};

export default DownloadLayout;
