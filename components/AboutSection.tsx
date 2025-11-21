"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export default function AboutSection() {
  const stats = [
    {
      value: "07+",
      description: "Years of Innovation",
    },
    {
      value: "40+",
      description: "Happy customer",
    },
  ]

  return (
    <section
      id="about"
      className="py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid ">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center space-x-2 text-sm mb-6 border rounded-[20px] px-[15px] py-[10px]"
              style={{
                border: "none",
                background: "rgba(43, 45, 45, 1)",
              }}
            >
              <img
                src="/ai-magic.svg"
                alt=""
              />
              <span style={{ color: "#10EFFF" }}>Who We Are</span>
            </div>

            <div className="mb-8 ">
              <p className="text-white text-md leading-relaxed">
                <span className="font-bold">
                  We're North Atlantic Softwares
                </span>{" "}
                — We’re North Atlantic Softwares — a team that designs and builds smart web and mobile apps for companies that want to move fast and build right.
                <span className="text-white">
                  {" "}
                  Some of our work runs on AI and machine learning. Some turns messy data into useful insight. Some just looks slick and gets the job done. Whatever you’re building — we’re here to make it sharp, scalable, and real.
                </span>
                <span style={{ color: "rgba(164, 168, 174, 1)" }}>
                  {" "}
                  No bloated process. No buzzword soup. Just clear communication, strong engineering, and products that make a difference.
                </span>
              </p>
            </div>

            <button
              style={{
                borderRadius: "12px",
                background:
                  "linear-gradient(to bottom, #10EFFF 0%, #0A8F99 100%), radial-gradient(ellipse 80px 30px at center bottom, rgba(255, 255, 255, 0.9) 0%, transparent 70%)",
                backgroundBlendMode: "normal, screen",
                boxShadow: "0 4px 15px rgba(16, 239, 255, 0.3)",
              }}
              className="inline-flex items-center space-x-2 text-[#0A3B42] px-8 py-4 hover:opacity-90 transition-all duration-300 font-semibold mb-8"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 h-[248px]"
                >
                  <div className="flex flex-col h-full">
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      <p className="text-white text-sm">{stat.description}</p>
                      <Sparkles
                        size={20}
                        className="text-white flex-shrink-0 ml-2"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Placeholder for potential image/content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            {/* This space can be used for an image or additional content */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
