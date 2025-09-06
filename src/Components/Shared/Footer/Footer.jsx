"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Container from "../Container/Container";

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 border-t border-gray-300 dark:border-gray-700 mt-10">
      <Container>
        <footer className="transition-colors duration-300 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
            {/* Brand & Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                🚚 SwiftCourier
              </h2>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Fast, secure, and reliable courier services. Delivering parcels
                with care worldwide.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Company
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/about"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Legal
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                We Accept
              </h3>
              <div className="flex gap-3 flex-wrap">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                  alt="Visa"
                  className="h-6 w-auto bg-white dark:bg-gray-800 p-1 rounded shadow hover:scale-110 transition"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png"
                  alt="Mastercard"
                  className="h-6 w-auto bg-white dark:bg-gray-800 p-1 rounded shadow hover:scale-110 transition"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/PayPal.svg"
                  alt="PayPal"
                  className="h-6 w-auto bg-white dark:bg-gray-800 p-1 rounded shadow hover:scale-110 transition"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/16/Bkash_logo.png"
                  alt="bKash"
                  className="h-6 w-auto bg-white dark:bg-gray-800 p-1 rounded shadow hover:scale-110 transition"
                />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 dark:border-gray-700 mt-8 py-4">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} SwiftCourier. All rights reserved.
            </p>
          </div>
        </footer>
      </Container>
    </div>
  );
}
