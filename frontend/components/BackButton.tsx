"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/plan")} // target route
      className="sticky bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition cursor-pointer"
    >
      ← Back
    </button>
  );
};

export default BackButton;
