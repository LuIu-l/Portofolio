"use client";

import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center text-slate-400">
        Loading 3D Scene...
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center">
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </div>
  );
}
