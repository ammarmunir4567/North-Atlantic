"use client"

import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import BenefitsSection from "@/components/BenefitsSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import { Particles } from "@/components/ui/particles"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      {/* Sections with Particles Background */}
      <div className="relative" style={{ backgroundColor: "rgba(30, 32, 34, 1)" }}>
        <Particles
          className="absolute inset-0 z-0 pointer-events-none"
          quantity={1000}
          ease={50}
          color="#10EFFF"
          refresh
          staticity={5}
        />
        <div className="relative z-10">
          <AboutSection />
          <ServicesSection />
          <BenefitsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  )
}
