"use client"

import { motion } from "framer-motion"
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      ;(e.target as HTMLFormElement).reset()
    }, 5000)
  }

  return (
    <section
      id="contact"
      className="py-20 px-4 relative"
    >
      {/* Teal glow effect at bottom center */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, #10EFFF 0%, transparent 70%)",
        }}
      ></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center space-x-2 text-sm mb-6 border rounded-[30px] px-[18px] py-[18px]"
            style={{
              borderColor: "#2B2F32",
              boxShadow: "0 0 20px rgba(16, 239, 255, 0.3)",
            }}
          >
            <img
              src="/ai-magic.svg"
              alt=""
            />
            <span style={{ color: "#10EFFF" }}>Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let's Talk About Your First Project
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl p-8"
          style={{
            boxShadow: "0 0 20px #10EFFF80",
            padding: "15px",
            borderRadius: "30px",
          }}
        >
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-2 text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter Your Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10EFFF]"
              />
            </div>

            {/* Email and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10EFFF]"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Your number"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10EFFF]"
                />
              </div>
            </div>


            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-white"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us what we can help you with"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10EFFF] resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            {!isSubmitted ? (
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  borderRadius: "12px",
                  background:
                    "linear-gradient(to right, #10EFFF 0%, #0A8F99 100%), radial-gradient(ellipse 80px 30px at center bottom, rgba(255, 255, 255, 0.9) 0%, transparent 70%)",
                  backgroundBlendMode: "normal, screen",
                  boxShadow: "0 4px 15px rgba(16, 239, 255, 0.3)",
                }}
                className="w-full inline-flex items-center justify-center space-x-2 text-[#0A3B42] px-8 py-4 hover:opacity-90 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            ) : (
              <div className="w-full bg-green-500/20 border-2 border-green-500 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-semibold text-white">
                    Message Received!
                  </h3>
                </div>
                <p className="text-gray-300 text-sm">
                  Thank you for reaching out! We've received your message and
                  will get back to you shortly. Our team typically responds
                  within 24 hours.
                </p>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
