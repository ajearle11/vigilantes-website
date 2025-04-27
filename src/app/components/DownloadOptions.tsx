"use client";

import { Button } from "./";
import { useNavigateToUrl } from "../hooks";
import { Input } from "./";
import { handleDownload } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendAnalytics } from "../utils/apiRequests";
import { useRouter } from 'next/navigation'

const DownloadLayout = () => {
  const [timestamp, setTimestamp] = useState(0);
  const router = useRouter()

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
      <div className="flex flex-col max-w-[550px] my-30 h-[100%] justify-center">
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
              "https://dl.dropboxusercontent.com/scl/fi/8uqveu1yffsdp4t35p40i/Life-In-The-Fast-Brain.zip?rlkey=m0qhbbcukwp5ehhya2ixbomw8&st=ovbs1hlq&dl=1"
            );
            mutate()
          }}
          title="Life In The Fast Brain Files"
          twColor="btn-primary"
        />
        <Button onClick={() => router.push("/gigblogs")} title="Gig Blogs" twColor="btn-primary" />
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
