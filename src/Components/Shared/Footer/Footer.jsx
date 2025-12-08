"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Container from "../Container/Container";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 border-t border-gray-300 dark:border-gray-800 pt-16 mt-20">
      <Container>
        <footer className="transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand & Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500">
                Transify
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Fast, secure, and reliable courier services. Delivering parcels
                with care worldwide.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 shadow-sm hover:shadow-md hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                Company
              </h3>
              <ul className="space-y-3">
                {["About Us", "Services", "Contact"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                Legal
              </h3>
              <ul className="space-y-3">
                {["Terms & Conditions", "Privacy Policy"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item === "Terms & Conditions" ? "terms" : "privacy"
                        }`}
                      className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-red-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-red-500 inline-block pb-1">
                We Accept
              </h3>
              <div className="flex gap-4 flex-wrap">
                {[
                  {
                    name: "Visa",
                    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
                  },
                  {
                    name: "Mastercard",
                    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png",
                  },
                  {
                    name: "PayPal",
                    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/PayPal.svg",
                  },
                  {
                    name: "bKash",
                    src: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bkash_logo.png",
                  },
                ].map((payment, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center w-14 h-10"
                  >
                    <img
                      src={payment.src}
                      alt={payment.name}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 dark:border-gray-800 py-6">
            <Container>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                  © {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">Transify</span>. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
                  <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
                  <a href="#" className="hover:text-red-500 transition-colors">Sitemap</a>
                </div>
              </div>
            </Container>
          </div>
        </footer>
      </Container>
    </div>
  );
}
