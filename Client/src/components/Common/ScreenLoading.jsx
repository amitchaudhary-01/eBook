import React from 'react'
import { Loader } from "lucide-react";

const ScreenLoading = () => {
  return (
     <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
      <Loader className="w-12 h-12 text-blue-300 animate-spin" />
      <p className="mt-4 text-gray-400">Loading...</p>
    </div>
  )
}

export default ScreenLoading
