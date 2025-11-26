"use client"
import { User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08090A]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:justify-center items-center h-20 relative">
          <Link
            href="/"
            className="flex items-center lg:absolute lg:left-0"
          >
            <Image
              src="/logo.svg"
              alt="North Atlantic"
              width={125}
              height={48}
              priority
            />
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div
            className="hidden md:flex items-center space-x-8 border rounded-[30px] px-[18px] py-[18px] backdrop-blur-lg"
            style={{ borderColor: "#2B2F32" }}
          >
            <Link
              href="/"
              className="text-sm hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm hover:text-gray-300 transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm hover:text-gray-300 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('choose')}
              className="text-sm hover:text-gray-300 transition-colors"
            >
              Choose Us
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm hover:text-gray-300 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-sm hover:text-gray-300 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('choose')}
                className="text-sm hover:text-gray-300 transition-colors text-left"
              >
                Choose Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
