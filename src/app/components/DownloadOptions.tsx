"use client";

import { Button, InteractiveImage } from "./";
import { useNavigateToUrl } from "../hooks";
import { Input } from "./";
import { handleDownload } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendAnalytics } from "../utils/apiRequests";

// import { useRouter } from 'next/navigation'

const DownloadLayout = () => {
  const [timestamp, setTimestamp] = useState(0);
  // const router = useRouter()

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const rickRoll = useNavigateToUrl(
    "https://shattereddisk.github.io/rickroll/rickroll.mp4"
  );

  const bandcamp = useNavigateToUrl(
    "https://vigilantesband.bandcamp.com/album/golden-record"
  );

  const goToGoldenRecord = useNavigateToUrl("https://goldenrecord.org");

  const { mutate } = useMutation({
    mutationFn: sendAnalytics,
  });

  return (
    <>
      <div className="w-full max-w-[550px] mt-10 mb-5 text-center">
        <InteractiveImage />
      </div>
      <div className="block flex flex-col max-w-[550px] mb-30 justify-center">
        {/* <div className="text-xs text-center uppercase tracking-widest text-[#888] mb-4 font-mono">
          Vigilantes Archive Access
          </div> */}
        <Button
          onClick={bandcamp}
          title="Pre-order Golden Record"
          twColor="btn-primary"
        />
        <Button
          onClick={goToGoldenRecord}
          title="Inspiration Behind The Album"
          twColor="btn-primary"
        />
        <p className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[45px] xl:text-[50px] text-[#ddd] pt-15 pb-5 text-center">
          Stems
        </p>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDownload(
              "https://dl.dropboxusercontent.com/scl/fi/8uqveu1yffsdp4t35p40i/Life-In-The-Fast-Brain.zip?rlkey=m0qhbbcukwp5ehhya2ixbomw8&st=ovbs1hlq&dl=1"
            );
            mutate();
          }}
          title="Life In The Fast Brain Files"
          twColor="btn-primary"
        />
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleDownload(
              "https://dl.dropboxusercontent.com/scl/fi/otfkvex2h5lrddyg6x2ua/Mondays.zip?rlkey=a0287bhnn2idtwg4poy5irhjr&st=ezb281nc&dl=1"
            );
            mutate();
          }}
          title="Mondays Files"
          twColor="btn-primary"
        />
        {/* <Button onClick={() => router.push("/gigblogs")} title="Gig Blogs" twColor="btn-primary" /> */}
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
