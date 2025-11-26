"use client"

import { motion } from "framer-motion"
import { Smartphone, Cloud, Brain, Rocket } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      icon: Smartphone,
      title: "Custom Web & Mobile Applications",
      description:
        "Beautiful, fast, and built to scale. We design and develop apps that look great, work everywhere, and grow with your product — whether it's your MVP or your next big launch.",
      color: "#10EFFF",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Cloud,
      title: "Cloud Architecture & DevOps",
      description:
        "We build infrastructure that doesn’t crack under pressure. Whether you're just getting started or ready to scale, we help you set up secure, scalable, cloud-native systems that actually fit your workflow.",
      color: "#A78BFA",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Brain,
      title: "AI Transformation",
      description:
        "We help you harness the real power of AI to solve problems, automate smarter, and unlock new opportunities — through tailored strategy, models, and end-to-end solutions.",
      color: "#F59E0B",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Rocket,
      title: "Data Science & ETL",
      description:
        "Drowning in data? We’ll help you clean it, structure it, and use it. From building pipelines to advanced analytics, we make sure your data works for you, not the other way around.",
      color: "#10B981",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section
      id="services"
      className="pt-8 pb-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center space-x-2 text-sm mb-6 border rounded-[20px] px-[15px] py-[10px]"
            style={{
              border: "none",
              background: "rgba(43, 45, 45, 1)",
            }}
          >
            <img src="/ai-magic.svg" alt="" />
            <span style={{ color: "#10EFFF" }}>Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What We Do Best
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(164, 168, 174, 1)" }}
          >
            Comprehensive solutions designed to elevate your digital presence
            and drive meaningful results
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  className="relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "rgba(43, 45, 45, 1)",
                    border: "1px solid rgba(60, 62, 62, 1)",
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Icon with glow effect */}
                  <div className="relative mb-6">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center relative"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                        border: `1px solid ${service.color}40`,
                      }}
                    >
                      {/* Glow effect */}
                      <div
                        className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                        style={{ backgroundColor: service.color }}
                      />
                      <Icon
                        className="w-8 h-8 relative z-10"
                        style={{ color: service.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(164, 168, 174, 1)" }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${service.color}, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
