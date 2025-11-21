"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Left Side - Logo and Navigation */}
          <div className="mb-8 md:mb-0">
            <Link
              href="/"
              className="flex items-center mb-6"
            >
              <Image
                src="/logo.svg"
                alt="North Atlantic"
                width={125}
                height={48}
              />
            </Link>
            <div className="flex flex-wrap gap-6">
              <Link
                href="/"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="#choose"
                className="text-sm text-white hover:text-gray-300 transition-colors"
              >
                Choose Us
              </Link>
            </div>
          </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <img
                src="/twitter-icon.svg"
                alt=""
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <img
                src="/facebook-icon.svg"
                alt=""
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <img
                src="/instagram-icon.svg"
                alt=""
              />
            </a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-white">
            © Copyright 2024. All rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
