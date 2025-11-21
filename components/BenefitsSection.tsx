"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Rocket, TrendingUp } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Outsmart the grind",
      description: "Skip the slow climb. We get you ahead faster.",
    },
    {
      icon: Rocket,
      title: "Ship fast",
      description:
        "Turn ideas into products — no waiting.",
    },
    {
      icon: TrendingUp,
      title: "Scale effortlessly",
      description:
        "Build once, grow forever.",
    },
  ]

  return (
    <section
      id="choose"
      className="py-20 px-4 relative"
    >
      {/* Custom Gradient Border at Top */}
      <div
        className="absolute top-0 left-0 right-0 h-[5px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(16, 239, 255, 0.3) 10%, rgba(16, 239, 255, 1) 50%, rgba(16, 239, 255, 0.3) 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 70%, transparent 100%)",
        }}
      ></div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center space-x-2 text-sm  mb-4 border rounded-[30px] px-[18px] py-[18px]"
            style={{ borderColor: "#2B2F32" }}
          >
            <img
              src="/ai-magic.svg"
              alt=""
            />
            <span style={{ color: "#10EFFF" }}>Benefits</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="italic font-light">Us?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to develop, optimize, and scale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:border-gray-700 transition-all duration-300">
                  <div className="mb-8 relative">
                    <div className="w-32 h-32 rounded-full border border-border flex items-center justify-center mx-auto bg-gradient-to-br from-card to-background">
                      <Icon
                        size={48}
                        className="text-gray-600"
                        strokeWidth={1}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-center text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
