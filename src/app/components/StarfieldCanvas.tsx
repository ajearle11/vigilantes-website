'use client';
import { useStarfieldCanvas } from '@/app/hooks';

const StarfieldCanvas = () => {
  const canvasRef = useStarfieldCanvas();

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ display: 'block' }}
      />
      <div className="h-full absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:100%_3px]" />
    </>
  );
};

export default StarfieldCanvas;
