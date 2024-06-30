import React from "react";
import Logo from "../../../assets/images/logo-bg.jpg";
import { useMediaQuery } from "react-responsive";

export default function footer() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // UNTUK TAMPILAN MOBILE
  return (
    <div>
      <footer className={`bg-[#003285] ${isMobile ? "pb-14" : "pb-0"}`}>
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img
                  src={Logo}
                  className="h-20 me-3 rounded-full"
                  alt="BiFlight Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  BiFlight
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-base font-semibold uppercase text-white">
                  Ikuti Kami
                </h2>
                <ul className="text-white font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/Binar-Final-Project"
                      target="_blank"
                      className="hover:underline hover:text-[#86B6F6]"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="/tentang-kami"
                      className="hover:underline hover:text-[#86B6F6]"
                    >
                      Tentang Kami
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-base font-semibold uppercase text-white">
                  Penerbangan
                </h2>
                <ul className="text-white font-medium">
                  <li className="mb-4">
                    <a
                      href="/"
                      className="hover:underline hover:text-[#86B6F6]"
                    >
                      Domestik
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="flex items-center justify-center">
            <span className="text-sm text-center text-gray-200">
              © 2024{" "}
              <a
                href="/"
                className="hover:underline mr-1"
                aria-label="Halaman Beranda"
              >
                BiFlight
              </a>
              | Seluruh Hak Cipta Dilindungi.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
