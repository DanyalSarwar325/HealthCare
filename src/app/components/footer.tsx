"use client";
import { Mail, Phone } from "lucide-react";

export const FooterPage=()=> {
  return (
    <footer className="bg-white text-gray-700 border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-full">
              <span className="text-white text-xl font-bold">P</span>
            </div>
            <h2 className="text-xl font-bold text-blue-700">Prescripto</h2>
          </div>
          <p className="text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">About us</a></li>
            <li><a href="#" className="hover:text-blue-600">Delivery</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">GET IN TOUCH</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>+0-000-000-000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <a href="mailto:greatstackdev@gmail.com" className="hover:text-blue-600">
                greatstackdev@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        Copyright 2024 © Greatstack.dev - All Rights Reserved.
      </div>
    </footer>
  );
}
