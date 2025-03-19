"use client";

import React from "react";
import Link from "next/link";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Electro Shop</h3>
            <p className="text-sm">
              Elektronik ürün yönetimi için profesyonel çözümler sunan yönetim
              paneli.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/AbdllhAlioglu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-alioglu/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Ürünler
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-white transition-colors"
                >
                  Siparişler
                </Link>
              </li>
              <li>
                <Link
                  href="/customers"
                  className="hover:text-white transition-colors"
                >
                  Müşteriler
                </Link>
              </li>
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Destek</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors"
                >
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="hover:text-white transition-colors"
                >
                  Dokümantasyon
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FiMapPin className="h-5 w-5" />
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="h-5 w-5" />
                <a
                  href="tel:+902121234567"
                  className="hover:text-white transition-colors"
                >
                  0212 123 45 67
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="h-5 w-5" />
                <a
                  href="mailto:info@electroshop.com"
                  className="hover:text-white transition-colors"
                >
                  info@electroshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Footer */}

        {/* Alt Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {currentYear} Electro Shop. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Kullanım Şartları
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
        {/* Alt Footer */}
      </div>
    </footer>
  );
}
