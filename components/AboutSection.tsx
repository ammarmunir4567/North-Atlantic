"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export default function AboutSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="about"
      className="pt-20 pb-8 px-4"
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
                At North Atlantic Software, we turn complex ideas into sharp, scalable reality.
                </span>{" "}
                From AI-driven backends to sleek mobile interfaces, we design and engineer products that just work.
                We don't do buzzword soup. We don't do bloated workflows.
                <span className="text-white">
                  {" "}
                  We deliver clear communication, messy data turned into useful insights, and code that stands the test of time. If you're ready to build, we're ready to execute.
                </span>
              </p>
            </div>

            <button
              onClick={scrollToContact}
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
