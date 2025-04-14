"use client";

import { Button } from "./";
import { useNavigateToUrl } from "../hooks";
import { Input } from "./";
import { handleDownload } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendAnalytics } from "../utils/apiRequests";

const DownloadLayout = () => {
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const rickRoll = useNavigateToUrl(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4"
  );

  const goToGoldenRecord = useNavigateToUrl("https://goldenrecord.org");

  const { mutate } = useMutation({
    mutationFn: sendAnalytics,
  });

  return (
    <>
      <div className="flex flex-col my-30 h-[100%] justify-center">
        <div className="text-xs text-center uppercase tracking-widest text-[#888] mb-4 font-mono">
          Vigilantes Archive Access
        </div>
        <Button
          onClick={goToGoldenRecord}
          title="Golden Record"
          twColor="btn-primary"
        />
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDownload(
              "https://dl.dropboxusercontent.com/scl/fi/sdupb68odyuz1d9jpmb8b/Life-In-The-Fast-Brain-Stems.zip?rlkey=rzwsolwvzltc8mbgy706qpxnv&dl=1"
            );
            mutate()
          }}
          title="Life In The Fast Brain Files"
          twColor="btn-primary"
        />
        <Button onClick={rickRoll} title="More Info..." twColor="btn-primary" />
        {/* <Button onClick={rickRoll} title="Sink" twColor="accent" /> */}
        <div className=" mt-15 mb-30 mx-4">
          <Input image={true} imagesrc="/rightSend.svg" />
          <div className="mt-10 text-xs text-center uppercase tracking-widest text-[#888] mb-4 font-mono">
            {timestamp}
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadLayout;
