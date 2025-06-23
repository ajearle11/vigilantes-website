"use client";
import React, { useRef } from "react";
import "../globals.css";
import { useNavigateToUrl } from "../hooks";

const InteractiveImage: React.FC = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      imageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  const bandcamp = useNavigateToUrl(
    "https://vigilantesband.bandcamp.com/album/golden-record"
  );

  return (
    <div
      onClick={bandcamp}
      className="perspective-[500px] p-5 cursor-pointer rounded-md "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img ref={imageRef} src="/GR.jpg" alt="3D Tilt" className="hover-image shadow-[0_10px_55px_rgba(142,121,0,1)]" />
      <p className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[45px] xl:text-[50px] text-[#ddd] pt-15">
        Golden Record
      </p>
      <p className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[45px] xl:text-[50px] text-[#ddd]">
        05/09/2025
      </p>
    </div>
  );
};

export default InteractiveImage;
