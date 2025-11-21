"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import HireUsModal from "./HireUsModal"

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background Video with Blur */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
       
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8, 9, 10, 0.95) 0%, rgba(8, 9, 10, 0.7) 50%, rgba(8, 9, 10, 0.3) 100%)",
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div
            className="inline-flex items-center space-x-2 text-sm text-gray-400"
            style={{
              boxShadow: "0 0 20px #10EFFF80",
              padding: "15px",
              borderRadius: "30px",
            }}
          >
            <span className="text-lg">
              <img
                src="/Ellipse-1.svg"
                alt=""
              />
            </span>
            <span>New Gen AI Development Partner</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-4xl lg:text-7xl font-bold mb-6 leading-tight text-white"
        >
          Your Technology Partner for Scalable Innovation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#BBBFC6] text-lg mb-8"
        >
          Empowering startups and enterprises with cutting-edge AI and scalable cloud architecture
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(to bottom, #10EFFF 0%, #0A8F99 100%), radial-gradient(ellipse 80px 30px at center bottom, rgba(255, 255, 255, 0.9) 0%, transparent 70%)",
              backgroundBlendMode: "normal, screen",
              boxShadow: "0 4px 15px rgba(16, 239, 255, 0.3)",
            }}
            className="inline-flex items-center space-x-2 text-[#0A3B42] px-8 py-4 hover:opacity-90 transition-all duration-300 font-medium group border-0"
          >
            <span>Hire Us</span>
            <img
              src="/arrow-right-03.svg"
              alt=""
            />
          </button>
        </motion.div>
      </div>

      {/* Hire Us Modal */}
      <HireUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
