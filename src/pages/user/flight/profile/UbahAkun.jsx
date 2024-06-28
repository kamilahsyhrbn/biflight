import React, { useState, useEffect } from "react";
import Navbar from "../../../../assets/components/navigations/navbar/Navbar";
import Footer from "../../../../assets/components/navigations/Footer";
import NavbarMobile from "../../../../assets/components/navigations/navbar/Navbar-mobile";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import {
  getUser,
  updateUser,
} from "../../../../redux/actions/user/userActions";
import SideMenu from "../../../../assets/components/sideMenu";
import { RxCrossCircled } from "react-icons/rx";
import { BiSolidCheckCircle, BiErrorCircle } from "react-icons/bi";

export default function UbahAkun() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.user);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [name, setName] = useState(profile?.name || "");
  const [phone_number, setPhone_number] = useState(profile?.phone_number || "");
  const [isNameValid, setIsNameValid] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  useEffect(() => {
    const account = async () => {
      dispatch(getUser(navigate));
    };
    account();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Fungsi untuk menangani fokus input nama
  const handleNameFocus = () => {
    if (!isNameValid) {
      setIsNameValid(true);
    }
  };

  // Fungsi untuk menangani perubahan input nomor telepon
  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const isValidPhoneNumber = /^\d*$/.test(value); // Mengizinkan angka atau kosong
    if (isValidPhoneNumber) {
      setPhone_number(value);
    }
  };

  // FUNGSI UNTUK MENAMPILKAN MODAL SIMPAN PERUBAHAN
  const handleSaveModal = (e) => {
    e.preventDefault();
    setSaveModalOpen(!saveModalOpen);
  };

  // FUNGSI UNTUK SUBMIT SIMPAN PERUBAHAN
  const handleSave = (e) => {
    e.preventDefault();
    setSaveModalOpen(!saveModalOpen);

    if (!name && !phone_number) {
      toast.error("Mohon isi semua kolom terlebih dahulu!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    if (!name) {
      toast.error("Mohon masukkan nama Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    if (name.length < 3) {
      toast.error("Nama minimal memiliki 3 huruf!", {
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    if (!phone_number) {
      toast.error("Mohon masukkan nomor ponsel Anda!", {
        // Menampilkan toast error
        icon: null,
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    if (phone_number.length < 8 || phone_number.length >= 14) {
      toast.error("Mohon masukkan nomor telepon dengan benar!", {
        style: {
          background: "#FF0000", // Background merah
          color: "#FFFFFF", // Teks putih
          borderRadius: "12px", // Rounded-xl
          fontSize: "14px", // Ukuran font
          textAlign: "center", // Posisi teks di tengah
          padding: "10px 20px", // Padding
        },
        position: "top-center", // Posisi toast
        duration: 3000, // Durasi toast
      });
      return;
    }

    dispatch(updateUser(name, phone_number, navigate));
  };

  return (
    <div className="bg-[#FFF0DC] py-5 md:py-0">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      <div className="m-5 md:m-10 md:py-20">
        <div className="lg:w-1/12 mb-5">
          <Link to={-1}>
            <div className="flex font-medium items-center text-[#003285] hover:text-[#40A2E3]">
              <IoIosArrowBack className="text-3xl" />
              <h6 className="text-lg">Kembali</h6>
            </div>
          </Link>
        </div>

        <Toaster />

        <div className="flex flex-col lg:flex-row justify-start lg:mx-24 gap-12">
          {/* SIDE MENU */}
          <div className="lg:w-2/5">
            <SideMenu />
          </div>

          {/* MAIN CONTENT */}
          <div className="w-full">
            <div className="text-[#003285] mb-5">
              <h2
                className={`font-medium text-3xl ${
                  isMobile ? "text-center" : ""
                }`}
              >
                Ubah Data Diri
              </h2>
            </div>
            <div>
              <form onSubmit={handleSave}>
                <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden w-full">
                  <div className="flex flex-col">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-[#003285] "
                      >
                        Nama Lengkap
                      </label>
                      <div
                        className={`flex items-center p-2 rounded-xl border focus-within:shadow-lg
                    ${
                      name && isNameValid
                        ? "focus-within:border-[#2A629A] border-[#8A8A8A]"
                        : "focus-within:border-[#FF0000] border-[#8A8A8A]"
                    }`}
                      >
                        <input
                          className="flex-grow bg-transparent border-none focus:outline-none text-sm"
                          type="text"
                          placeholder="Nama Lengkap"
                          value={name}
                          onFocus={handleNameFocus}
                          onChange={handleNameChange}
                          id="name"
                        />
                      </div>
                      {isNameValid && !name && (
                        <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                          <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                          <p>Nama tidak boleh kosong</p>
                        </div>
                      )}
                      {isNameValid && name && name.length < 3 && (
                        <div className="flex items-center text-[#FF0000] text-xs mt-1 text-left">
                          <BiErrorCircle className="w-[20px] h-[20px] mr-1" />
                          <p>Nama terlalu pendek, minimum 3 huruf</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1 my-3">
                      <label className="text-left text-[#003285] font-medium text-sm">
                        Nomor Ponsel
                      </label>
                      <div
                        className={`flex items-center rounded-xl border focus-within:shadow-lg
                    ${
                      phone_number && phone_number.length >= 8
                        ? "focus-within:border-[#2A629A] border-[#8A8A8A]"
                        : "focus-within:border-[#FF0000] border-[#8A8A8A]"
                    } 
                   `}
                      >
                        <div className="flex items-center bg-gray-300 p-2 px-3 rounded-l-xl border-r-0">
                          <span className="text-sm text-[#2A629A]">+62</span>
                        </div>
                        <input
                          className="flex-grow bg-transparent border-none focus:outline-none text-sm pl-2"
                          type="text"
                          placeholder="8123456789"
                          value={phone_number}
                          onChange={handlePhoneNumberChange}
                          id="phone"
                        />
                        {phone_number &&
                          phone_number.length >= 8 &&
                          phone_number.length < 14 && (
                            <BiSolidCheckCircle className="w-[21px] h-[21px] text-[#28A745] mr-2" />
                          )}
                        {phone_number && phone_number.length < 8 && (
                          <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] mr-2.5" />
                        )}
                        {phone_number && phone_number.length >= 14 && (
                          <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] mr-2.5" />
                        )}
                        {!phone_number && (
                          <RxCrossCircled className="text-[#FF0000] w-[20px] h-[20px] mr-2.5" />
                        )}
                      </div>
                      {phone_number && phone_number.length < 8 && (
                        <p className="text-[#FF0000] text-xs mt-1 text-left">
                          Nomor ponsel terlalu pendek, minimum 8 angka
                        </p>
                      )}
                      {phone_number && phone_number.length >= 14 && (
                        <p className="text-[#FF0000] text-xs mt-1 text-left">
                          Nomor ponsel terlalu panjang, maksimum 14 angka
                        </p>
                      )}
                      {!phone_number && (
                        <p className="text-[#FF0000] text-xs mt-1 text-left">
                          Nomor ponsel tidak boleh kosong
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      type="button"
                      onClick={handleSaveModal}
                      className="py-2 px-4 rounded-lg bg-[#2A629A] text-white hover:bg-[#003285]"
                    >
                      <div className="flex items-center font-medium">
                        Simpan Perubahan
                      </div>
                    </button>
                  </div>
                </div>

                {/* MODAL SIMPAN PERUBAHAN */}
                {saveModalOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative w-full max-w-[90%] md:max-w-[60%] lg:max-w-[40%] max-h-full animate__animated animate__zoomIn mx-4">
                      <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                            Simpan Perubahan Data Diri
                          </h3>
                          <button
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={handleSaveModal}
                          >
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                          </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                          <p className="text-base leading-relaxed text-gray-500">
                            Apakah Anda yakin ingin menyimpan perubahan?
                          </p>
                        </div>

                        <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                          <button
                            onClick={handleSaveModal}
                            className="py-2 px-4 md:px-7 me-3 text-sm font-medium text-gray-900 bg-white rounded-lg border hover:text-[#2A629A]"
                          >
                            Batal
                          </button>
                          <button className="text-white bg-[#2A629A] hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2 text-center">
                            Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
