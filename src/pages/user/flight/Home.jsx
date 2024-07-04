import React, { useState, useEffect } from "react";
import bromo from "../../../assets/images/bromo.jpg";
import Navbar from "../../../assets/components/navigations/navbar/navbar-transparent";
import NavbarMobile from "../../../assets/components/navigations/navbar/Navbar-mobile";
import Footer from "../../../assets/components/navigations/Footer";
import { useMediaQuery } from "react-responsive";
import BtnScrollTop from "../../../assets/components/BtnScrollUp";
import SearchMobile from "../../../assets/components/home search/SearchMobile";
import SearchDesktop from "../../../assets/components/home search/SearchDesktop";
import Card from "../../../assets/components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getCheapestFlights,
  getFlight,
} from "../../../redux/actions/flight/flightActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ICON
import { FaPerson, FaBaby, FaChildDress } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { setChoosenFlight } from "../../../redux/reducers/flight/flightReducers";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // UNTUK TAMPILAN MOBILE
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 }); // UNTUK TAMPILAN TABLET

  const { cheapestFlights, isLoading } = useSelector((state) => state.flight);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerModalOpen, setPassengerModalOpen] = useState(false); // MODAL JUMLAH PENUMPANG
  const [total_passenger, setTotal_passenger] = useState(1);
  const [penumpang, setPenumpang] = useState({
    dewasa: 1,
    anak: 0,
    bayi: 0,
  });

  useEffect(() => {
    dispatch(getCheapestFlights());
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        id="nextArrow"
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowForward style={{ color: "#2A629A", fontSize: "30px" }} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        id="prevArrow"
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <IoIosArrowBack style={{ color: "#2A629A", fontSize: "30px" }} />
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // MODAL JUMLAH PENUMPANG
  const handlePassengerModal = (flight) => {
    setSelectedFlight(flight);
    setPassengerModalOpen(!passengerModalOpen);
  };

  // BUAT COUNTER JUMLAH PENUMPANG
  const handlePenumpang = (name, operation) => {
    setPenumpang((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? penumpang[name] + 1 : penumpang[name] - 1,
      };
    });
  };

  // BUAT JUMLAHIN TOTAL PENUMPANG
  useEffect(() => {
    const getTotalPenumpang = () => {
      return penumpang?.dewasa + penumpang?.anak + penumpang?.bayi;
    };

    setTotal_passenger(getTotalPenumpang());
  }, [penumpang]);

  // JIKA BUTTON CARI DI KLIK, AKAN DIRECT KE HALAMAN HASIL PENCARIAN
  const handleClick = () => {
    if (!selectedFlight) return;

    const {
      departure,
      arrival,
      flight_date,
      class: seat_class,
    } = selectedFlight;

    dispatch(
      getFlight(
        departure.airport_code,
        arrival.airport_code,
        flight_date,
        seat_class,
        total_passenger,
        "",
        1
      )
    );
    dispatch(setChoosenFlight([]));
    navigate(
      `/hasil-pencarian?from=${departure.airport_code}&to=${arrival.airport_code}&departureDate=${flight_date}&class=${seat_class}&passenger=${total_passenger}&adult=${penumpang.dewasa}&child=${penumpang.anak}&infant=${penumpang.bayi}`,
      { replace: true }
    );
    handlePassengerModal();
  };

  return (
    <div className="bg-[#FFF0DC]">
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {/* HEADER SECTION */}
      {isMobile ? <SearchMobile /> : <SearchDesktop />}
      {/* BODY SECTION */}
      <div className="p-10 pt-36 md:pt-12 ">
        <div className="pt-64 md:pt-52 pb-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:gap-0">
            <div className="flex justify-center">
              <div className="w-[500px] shadow-xl rounded-xl">
                <img
                  src={bromo}
                  className="h-[300px] w-full object-cover rounded-xl"
                  alt="Gunung Bromo"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold mt-5 md:mt-0">
                Dapatkan Harga Tiket Pesawat Murah ke Destinasi Pilihanmu!
              </h2>
              <hr className="my-2 w-1/4 bg-[#003285] p-1 rounded" />
              <p className="md:w-3/4">
                Ingin pesan tiket pesawat murah? Kini hanya dengan satu sentuhan
                jari, kamu bisa langsung pesan tiket pesawat murah di BiFlight.
              </p>
            </div>
          </div>

          {/* PROMO SECTION */}
          <div className="mb-14 mt-16 md:my-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#003285] text-center mb-5">
              Promo Tiket Pesawat Murah ✈️
            </h2>

            <div className="lg:mx-20">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-col justify-center items-center mt-2">
                    <div className="flex gap-2 items-center">
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce">
                        M
                      </div>
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.5s]">
                        e
                      </div>
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.4s]">
                        m
                      </div>
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.3s]">
                        u
                      </div>
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.2s]">
                        a
                      </div>
                      <div className="text-white text-xl text-center w-8 h-8 rounded-full bg-[#2A629A] flex items-center justify-center animate-bounce [animation-delay:-.1s]">
                        t
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {cheapestFlights.length === 0 ? (
                    <div className="flex flex-col items-center">
                      <iframe src="https://lottie.host/embed/d3072280-f0c3-4850-9067-359d9d6b5744/V9wwvXaroH.json"></iframe>
                      <h5 className="text-[#003285] text-center">
                        Tiket penerbangan tidak ditemukan
                      </h5>
                    </div>
                  ) : (
                    <>
                      <Slider {...settings}>
                        {cheapestFlights?.map((flight) => (
                          <div key={flight?.flight_id}>
                            <Card
                              flight={flight}
                              onClick={() => handlePassengerModal(flight)}
                            />
                          </div>
                        ))}
                      </Slider>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* WHY US SECTION */}
          <div className="my-16 md:mb-24 lg:mx-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#003285] text-center mb-10">
              Mengapa Harus Pilih Tiket Penerbangan di BiFlight?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    width="150"
                    height="150"
                    viewBox="0 0 643 447.57029"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M891.62348,313.02059H308.47961a29.96193,29.96193,0,0,1-29.92806-29.92807V255.88519a29.96193,29.96193,0,0,1,29.92806-29.92807H891.62348a29.96193,29.96193,0,0,1,29.92807,29.92807v27.20733A29.96193,29.96193,0,0,1,891.62348,313.02059ZM308.47961,227.77094a28.14617,28.14617,0,0,0-28.11424,28.11425v27.20733a28.14617,28.14617,0,0,0,28.11424,28.11425H891.62348a28.14617,28.14617,0,0,0,28.11424-28.11425V255.88519a28.14617,28.14617,0,0,0-28.11424-28.11425Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#3f3d56"
                    />
                    <rect
                      x="57.1354"
                      y="26.30042"
                      width="421.71368"
                      height="34.46262"
                      rx="17.23129"
                      fill="#e6e6e6"
                    />
                    <rect
                      x="107.92243"
                      y="177.43018"
                      width="421.71368"
                      height="34.46262"
                      rx="17.23129"
                      fill="#2a629a"
                    />
                    <rect
                      x="107.92243"
                      y="287.00423"
                      width="421.71368"
                      height="34.46262"
                      rx="17.23129"
                      fill="#e6e6e6"
                    />
                    <rect
                      x="107.92243"
                      y="396.57828"
                      width="421.71368"
                      height="34.46262"
                      rx="17.23129"
                      fill="#e6e6e6"
                    />
                    <path
                      d="M864.86391,288.10449a2.71409,2.71409,0,0,1-3.7799.66654l-14.80667-10.30275a2.714,2.714,0,1,1,3.11336-4.44644l14.80667,10.30275A2.71408,2.71408,0,0,1,864.86391,288.10449Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#2a629a"
                    />
                    <path
                      d="M848.054,276.39907a19.26672,19.26672,0,1,1-4.73174-26.83326A19.28854,19.28854,0,0,1,848.054,276.39907Zm-27.61937-19.33883a14.45,14.45,0,1,0,20.12494-3.5488A14.46638,14.46638,0,0,0,820.43461,257.06024Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#2a629a"
                    />
                    <path
                      d="M874.84562,454.28942H325.25747a.90691.90691,0,1,1,0-1.81382H874.84562a.90691.90691,0,1,1,0,1.81382Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M874.84562,563.90864H325.25747a.90691.90691,0,0,1,0-1.81382H874.84562a.90691.90691,0,0,1,0,1.81382Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M874.84562,673.52741H325.25747a.90691.90691,0,0,1,0-1.81382H874.84562a.90691.90691,0,1,1,0,1.81382Z"
                      transform="translate(-278.55155 -225.95712)"
                      fill="#3f3d56"
                    />
                  </svg>
                </div>
                <h5 className="text-center my-3 font-bold text-lg">
                  Hasil Pencarian Lengkap
                </h5>
                <p className="text-center">
                  Lihat semua opsi yang tersedia dan pilih yang paling sesuai
                  dengan kebutuhan Anda. Kami menawarkan berbagai pilihan
                  penerbangan dari berbagai maskapai.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    width="150"
                    height="150"
                    viewBox="0 0 839.79697 523.44409"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      d="M259.30182,695.092a50.79366,50.79366,0,0,0,13.58985,12.63c1.12011.71,2.27,1.38,3.43994,2h27.52978c-.32959-.66-.6499-1.33-.96-2a95.35442,95.35442,0,0,1,19.84033-109.34c-16.64013,5.14-32.02,15.16-42.08008,29.37a64.46989,64.46989,0,0,0-10.23,23,96.27579,96.27579,0,0,1,7.66993-48.41c-13.50977,10.99-24.03028,26.04-28.04,42.98C246.05182,662.272,248.96149,681.082,259.30182,695.092Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#f0f0f0"
                    />
                    <path
                      d="M1015.54573,469.26684H828.37712a4.35775,4.35775,0,0,1-4.35276-4.35276V349.13072a4.35775,4.35775,0,0,1,4.35276-4.35276h187.16861a4.35774,4.35774,0,0,1,4.35275,4.35276V464.91408A4.35774,4.35774,0,0,1,1015.54573,469.26684Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M1015.54573,469.26684H828.37712a4.35775,4.35775,0,0,1-4.35276-4.35276V349.13072a4.35775,4.35775,0,0,1,4.35276-4.35276h187.16861a4.35774,4.35774,0,0,1,4.35275,4.35276V464.91408A4.35774,4.35774,0,0,1,1015.54573,469.26684ZM828.37712,346.51906a2.61451,2.61451,0,0,0-2.61165,2.61166V464.91408a2.61451,2.61451,0,0,0,2.61165,2.61166h187.16861a2.61451,2.61451,0,0,0,2.61165-2.61166V349.13072a2.61451,2.61451,0,0,0-2.61165-2.61166Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M978.54728,383.44633H865.37557a3.91748,3.91748,0,1,1,0-7.835H978.54728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <path
                      d="M978.54728,410.43343H865.37557a3.91748,3.91748,0,1,1,0-7.835H978.54728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <circle
                      cx="788.36325"
                      cy="250.94409"
                      r="14"
                      fill="#2a629a"
                    />
                    <path
                      d="M968.84939,432.6268V431.293h.39488v1.33382a4.25848,4.25848,0,0,1,1.61464.39489,2.372,2.372,0,0,1,.92139.768,1.79468,1.79468,0,0,1,.33346,1.0485,1.13131,1.13131,0,0,1-.25887.75466.801.801,0,0,1-.6362.30713.66792.66792,0,0,1-.49141-.20183.67875.67875,0,0,1-.20183-.50018.94972.94972,0,0,1,.079-.37733l.158-.33346a1.10866,1.10866,0,0,0,.079-.43876,1.03337,1.03337,0,0,0-.21061-.64483,1.27287,1.27287,0,0,0-.59671-.417,3.37919,3.37919,0,0,0-.78977-.158v4.8l.08776.05265a8.74061,8.74061,0,0,1,2.22011,1.67606,3.942,3.942,0,0,1,.67131,1.13653,3.48548,3.48548,0,0,1,.24131,1.25909,3.05619,3.05619,0,0,1-.42121,1.58831,2.85171,2.85171,0,0,1-1.16709,1.0969,4.92848,4.92848,0,0,1-1.63219.47386v1.43035h-.39488v-1.404a4.40491,4.40491,0,0,1-1.66728-.34223,3.15528,3.15528,0,0,1-1.347-.96527,2.18559,2.18559,0,0,1-.47825-1.3777,1.55743,1.55743,0,0,1,.30713-.97857.91445.91445,0,0,1,.74589-.39913.64469.64469,0,0,1,.66692.66549,1.30412,1.30412,0,0,1-.32469.72665,2.20278,2.20278,0,0,0-.24131.4028.89954.89954,0,0,0-.06582.35016,1.41757,1.41757,0,0,0,.31152.87978,1.98877,1.98877,0,0,0,.838.62587,3.08659,3.08659,0,0,0,1.18465.21032h.0702v-5.73019l-.50018-.28958q-.71079-.41229-1.08374-.68446a4.52619,4.52619,0,0,1-.6713-.59671,2.88251,2.88251,0,0,1-.781-1.98319,2.69087,2.69087,0,0,1,.33346-1.31175,2.61657,2.61657,0,0,1,.92139-.97857A3.75,3.75,0,0,1,968.84939,432.6268Zm0,.19306a2.71562,2.71562,0,0,0-.98721.21909,1.68175,1.68175,0,0,0-.734.70938,2.17061,2.17061,0,0,0-.27953,1.09463,2.22358,2.22358,0,0,0,.41059,1.305,2.6476,2.6476,0,0,0,.51109.552,9.52086,9.52086,0,0,0,.99173.64795l.08733.05265Zm.39488,11.89913a2.72113,2.72113,0,0,0,.66394-.1404,1.74956,1.74956,0,0,0,.48052-.2808,2.17254,2.17254,0,0,0,.61157-.85544,2.94766,2.94766,0,0,0,.22716-1.15408,3.62464,3.62464,0,0,0-1.98319-3.03621Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M888.04573,391.76684H700.87712a4.35775,4.35775,0,0,1-4.35276-4.35276V271.63072a4.35775,4.35775,0,0,1,4.35276-4.35276H888.04573a4.35774,4.35774,0,0,1,4.35275,4.35276V387.41408A4.35774,4.35774,0,0,1,888.04573,391.76684Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M888.04573,391.76684H700.87712a4.35775,4.35775,0,0,1-4.35276-4.35276V271.63072a4.35775,4.35775,0,0,1,4.35276-4.35276H888.04573a4.35774,4.35774,0,0,1,4.35275,4.35276V387.41408A4.35774,4.35774,0,0,1,888.04573,391.76684ZM700.87712,269.01906a2.61451,2.61451,0,0,0-2.61165,2.61166V387.41408a2.61451,2.61451,0,0,0,2.61165,2.61166H888.04573a2.61451,2.61451,0,0,0,2.61165-2.61166V271.63072a2.61451,2.61451,0,0,0-2.61165-2.61166Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M851.04728,305.94633H737.87557a3.91748,3.91748,0,1,1,0-7.835H851.04728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <path
                      d="M851.04728,332.93343H737.87557a3.91748,3.91748,0,1,1,0-7.835H851.04728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <circle
                      cx="660.86325"
                      cy="173.44409"
                      r="14"
                      fill="#2a629a"
                    />
                    <path
                      d="M841.34939,355.1268V353.793h.39488v1.33382a4.25848,4.25848,0,0,1,1.61464.39489,2.372,2.372,0,0,1,.92139.768,1.79468,1.79468,0,0,1,.33346,1.0485,1.13131,1.13131,0,0,1-.25887.75466.801.801,0,0,1-.6362.30713.66792.66792,0,0,1-.49141-.20183.67875.67875,0,0,1-.20183-.50018.94972.94972,0,0,1,.079-.37733l.158-.33346a1.10866,1.10866,0,0,0,.079-.43876,1.03337,1.03337,0,0,0-.21061-.64483,1.27287,1.27287,0,0,0-.59671-.417,3.37919,3.37919,0,0,0-.78977-.158v4.8l.08776.05265a8.74061,8.74061,0,0,1,2.22011,1.67606,3.942,3.942,0,0,1,.67131,1.13653,3.48548,3.48548,0,0,1,.24131,1.25909,3.05619,3.05619,0,0,1-.42121,1.58831,2.85171,2.85171,0,0,1-1.16709,1.0969,4.92848,4.92848,0,0,1-1.63219.47386v1.43035h-.39488v-1.404a4.40491,4.40491,0,0,1-1.66728-.34223,3.15528,3.15528,0,0,1-1.347-.96527,2.18559,2.18559,0,0,1-.47825-1.3777,1.55743,1.55743,0,0,1,.30713-.97857.91445.91445,0,0,1,.74589-.39913.64469.64469,0,0,1,.66692.66549,1.30412,1.30412,0,0,1-.32469.72665,2.20278,2.20278,0,0,0-.24131.4028.89954.89954,0,0,0-.06582.35016,1.41757,1.41757,0,0,0,.31152.87978,1.98877,1.98877,0,0,0,.838.62587,3.08659,3.08659,0,0,0,1.18465.21032h.0702v-5.73019l-.50018-.28958q-.71079-.41229-1.08374-.68446a4.52619,4.52619,0,0,1-.6713-.59671,2.88251,2.88251,0,0,1-.781-1.98319,2.69087,2.69087,0,0,1,.33346-1.31175,2.61657,2.61657,0,0,1,.92139-.97857A3.75,3.75,0,0,1,841.34939,355.1268Zm0,.19306a2.71562,2.71562,0,0,0-.98721.21909,1.68175,1.68175,0,0,0-.734.70938,2.17061,2.17061,0,0,0-.27953,1.09463,2.22358,2.22358,0,0,0,.41059,1.305,2.6476,2.6476,0,0,0,.51109.552,9.52086,9.52086,0,0,0,.99173.64795l.08733.05265Zm.39488,11.89913a2.72113,2.72113,0,0,0,.66394-.1404,1.74956,1.74956,0,0,0,.48052-.2808,2.17254,2.17254,0,0,0,.61157-.85544,2.94766,2.94766,0,0,0,.22716-1.15408,3.62464,3.62464,0,0,0-1.98319-3.03621Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M500.04705,374.49034a11.18294,11.18294,0,0,0-11.92823,12.31914l-35.98248,16.86895,17.6119,10.78392L501.21773,396.79a11.24355,11.24355,0,0,0-1.17068-22.29968Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ffb6b6"
                    />
                    <polygon
                      points="171.049 510.77 183.476 510.769 189.388 462.837 171.047 462.838 171.049 510.77"
                      fill="#ffb6b6"
                    />
                    <path
                      d="M347.981,694.99057l24.47283-.001h.001a15.59684,15.59684,0,0,1,15.596,15.59575v.50681l-40.06908.00149Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#2f2e41"
                    />
                    <polygon
                      points="234.459 510.77 246.886 510.769 252.798 462.837 234.457 462.838 234.459 510.77"
                      fill="#ffb6b6"
                    />
                    <path
                      d="M411.391,694.99057l24.47283-.001h.001a15.59684,15.59684,0,0,1,15.596,15.59575v.50681l-40.06908.00149Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#2f2e41"
                    />
                    <polygon
                      points="242.76 262.159 249.067 275.738 260.438 397.176 251.599 501.554 230.926 501.554 206.532 337.03 195.074 497.764 167.18 496.638 161.825 278.718 242.76 262.159"
                      fill="#2f2e41"
                    />
                    <path
                      d="M322.35011,338.37232l26.14948-10.63882,36.90884,2.07,32.81286,11.95777L429.16882,464.016c-28.5463,15.58821-57.46265,19.84291-86.88214,8.69662l-27.30385-79.62774Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#e4e4e4"
                    />
                    <path
                      d="M408.01258,344.99321l11.60412-3.232s8.777-5.70687,11.66475,11.25755,17.74674,43.35179,17.74674,43.35179l25.43689-13.55623,11.77684,25.71876-40.17082,24.3336-42.30322-42.62435Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#e4e4e4"
                    />
                    <path
                      id="a80a6b0c-a21b-4eb6-b764-70793a425e46-977"
                      data-name="Path 40"
                      d="M344.36137,305.08309h0a26.60911,26.60911,0,1,1,48.69886-21.4616l.15213.352a26.61391,26.61391,0,1,1-48.86107,21.11392Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ffb6b6"
                    />
                    <path
                      id="b51b91e7-03ed-46d5-9b2a-c48431fd2f0d-978"
                      data-name="Path 72"
                      d="M380.48666,280.72968c5.53288,1.00387,14.09526,4.48722,18.84719.40069a23.29107,23.29107,0,0,0-8.623-6.30727,5.31442,5.31442,0,0,1-1.78491-1.00876c-1.62011-1.63724-.36833-4.45837-1.10968-6.672a5.71717,5.71717,0,0,0-3.93656-3.24591c-1.64929-.49349-3.3776-.57358-4.99779-1.172-3.8341-1.441-6.55991-5.56482-10.49-6.68541-3.42422-.99049-6.86978.54889-9.825,2.3453s-5.87861,3.92779-9.33592,4.26872c-2.58351.23566-4.219,4.48522-6.81269,4.60972-5.43518.2644-5.13334-3.31789-5.53535,2.392-.232,3.4073-5.10057,10.18578-5.0215,13.62274.08048,2.25207-.31795,4.4826-.2537,6.74168a17.51461,17.51461,0,0,0,4.84751,11.51147c2.47446,2.54466,5.69295,4.261,7.77591,7.16149,1.08319,1.53982,1.83464,3.33723,3.09558,4.73049s3.39672,2.23181,4.80406,1.23711,1.43356-3.14743,2.13182-4.78553a5.23317,5.23317,0,0,1,5.20088-3.166,6.12882,6.12882,0,0,1,5.0008,4.08254c-.659-3.62008-2.39634-7.012-3.05657-10.63483s.20019-7.95066,3.31979-9.36513c1.33937-.62327,3.1487-.79073,3.68711-2.22693.32959-.86507.02807-1.88717.15511-2.8228C369.25528,281.1561,376.879,280.02172,380.48666,280.72968Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#2f2e41"
                    />
                    <path
                      d="M345.42185,471.2991a11.18295,11.18295,0,0,0-14.61214-8.97379l-24.26862-31.46958-6.70925,19.531,24.07449,26.88974a11.24355,11.24355,0,0,0,21.51552-5.97733Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ffb6b6"
                    />
                    <path
                      d="M330.73254,344.30787l-8.38243-5.93555s-19.17686-1.09855-21.96661,14.64645l-35.16332,57.84515,43.59811,60.14755,21.13747-22.25082-26.671-31.1678L325.678,376.47733Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#e4e4e4"
                    />
                    <path
                      d="M534.95585,353.47372h-.43976V341.42666a6.9725,6.9725,0,0,0-6.9725-6.97251H502.02026a6.9725,6.9725,0,0,0-6.97252,6.97249v66.0911a6.97251,6.97251,0,0,0,6.9725,6.97252h25.52331a6.97251,6.97251,0,0,0,6.97253-6.97249V362.049h.43977Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M527.8249,336.26815h-3.33163a2.47382,2.47382,0,0,1-2.29043,3.40813h-14.622a2.47384,2.47384,0,0,1-2.29043-3.40813h-3.11175a5.207,5.207,0,0,0-5.207,5.207v65.99413a5.207,5.207,0,0,0,5.207,5.207H527.8249a5.207,5.207,0,0,0,5.207-5.207h0V341.47514A5.207,5.207,0,0,0,527.8249,336.26815Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#2a629a"
                    />
                    <path
                      d="M758.04573,312.76684H570.87712a4.35775,4.35775,0,0,1-4.35276-4.35276V192.63072a4.35775,4.35775,0,0,1,4.35276-4.35276H758.04573a4.35774,4.35774,0,0,1,4.35275,4.35276V308.41408A4.35774,4.35774,0,0,1,758.04573,312.76684Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M758.04573,312.76684H570.87712a4.35775,4.35775,0,0,1-4.35276-4.35276V192.63072a4.35775,4.35775,0,0,1,4.35276-4.35276H758.04573a4.35774,4.35774,0,0,1,4.35275,4.35276V308.41408A4.35774,4.35774,0,0,1,758.04573,312.76684ZM570.87712,190.01906a2.61451,2.61451,0,0,0-2.61165,2.61166V308.41408a2.61451,2.61451,0,0,0,2.61165,2.61166H758.04573a2.61451,2.61451,0,0,0,2.61165-2.61166V192.63072a2.61451,2.61451,0,0,0-2.61165-2.61166Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M721.04728,226.94633H607.87557a3.91748,3.91748,0,1,1,0-7.835H721.04728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <path
                      d="M721.04728,253.93343H607.87557a3.91748,3.91748,0,1,1,0-7.835H721.04728a3.91748,3.91748,0,0,1,0,7.835Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#ccc"
                    />
                    <circle
                      cx="530.86325"
                      cy="94.44409"
                      r="14"
                      fill="#2a629a"
                    />
                    <path
                      d="M711.34939,276.1268V274.793h.39488v1.33382a4.25848,4.25848,0,0,1,1.61464.39489,2.372,2.372,0,0,1,.92139.768,1.79468,1.79468,0,0,1,.33346,1.0485,1.13131,1.13131,0,0,1-.25887.75466.801.801,0,0,1-.6362.30713.66792.66792,0,0,1-.49141-.20183.67875.67875,0,0,1-.20183-.50018.94972.94972,0,0,1,.079-.37733l.158-.33346a1.10866,1.10866,0,0,0,.079-.43876,1.03337,1.03337,0,0,0-.21061-.64483,1.27287,1.27287,0,0,0-.59671-.417,3.37919,3.37919,0,0,0-.78977-.158v4.8l.08776.05265a8.74061,8.74061,0,0,1,2.22011,1.67606,3.942,3.942,0,0,1,.67131,1.13653,3.48548,3.48548,0,0,1,.24131,1.25909,3.05619,3.05619,0,0,1-.42121,1.58831,2.85171,2.85171,0,0,1-1.16709,1.0969,4.92848,4.92848,0,0,1-1.63219.47386v1.43035h-.39488v-1.404a4.40491,4.40491,0,0,1-1.66728-.34223,3.15528,3.15528,0,0,1-1.347-.96527,2.18559,2.18559,0,0,1-.47825-1.3777,1.55743,1.55743,0,0,1,.30713-.97857.91445.91445,0,0,1,.74589-.39913.64469.64469,0,0,1,.66692.66549,1.30412,1.30412,0,0,1-.32469.72665,2.20278,2.20278,0,0,0-.24131.4028.89954.89954,0,0,0-.06582.35016,1.41757,1.41757,0,0,0,.31152.87978,1.98877,1.98877,0,0,0,.838.62587,3.08659,3.08659,0,0,0,1.18465.21032h.0702v-5.73019l-.50018-.28958q-.71079-.41229-1.08374-.68446a4.52619,4.52619,0,0,1-.6713-.59671,2.88251,2.88251,0,0,1-.781-1.98319,2.69087,2.69087,0,0,1,.33346-1.31175,2.61657,2.61657,0,0,1,.92139-.97857A3.75,3.75,0,0,1,711.34939,276.1268Zm0,.19306a2.71562,2.71562,0,0,0-.98721.21909,1.68175,1.68175,0,0,0-.734.70938,2.17061,2.17061,0,0,0-.27953,1.09463,2.22358,2.22358,0,0,0,.41059,1.305,2.6476,2.6476,0,0,0,.51109.552,9.52086,9.52086,0,0,0,.99173.64795l.08733.05265Zm.39488,11.89913a2.72113,2.72113,0,0,0,.66394-.1404,1.74956,1.74956,0,0,0,.48052-.2808,2.17254,2.17254,0,0,0,.61157-.85544,2.94766,2.94766,0,0,0,.22716-1.15408,3.62464,3.62464,0,0,0-1.98319-3.03621Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#fff"
                    />
                    <path
                      d="M562.10152,711.722h-381a1,1,0,0,1,0-2h381a1,1,0,0,1,0,2Z"
                      transform="translate(-180.10152 -188.27796)"
                      fill="#cacaca"
                    />
                  </svg>
                </div>
                <h5 className="text-center my-3 font-bold text-lg">
                  Penawaran Harga Terbaik
                </h5>
                <p className="text-center">
                  Dapatkan harga tiket pesawat terbaik dengan membandingkan
                  berbagai jadwal dan maskapai. Kami memastikan Anda mendapatkan
                  penawaran terbaik dengan transparansi harga.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out">
                <div className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    width="150"
                    height="150"
                    viewBox="0 0 744.84799 747.07702"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      id="fa3b9e12-7275-481e-bee9-64fd9595a50d-1005"
                      data-name="Path 1"
                      d="M299.205,705.80851l-6.56-25.872a335.96693,335.96693,0,0,0-35.643-12.788l-.828,12.024-3.358-13.247c-15.021-4.29394-25.24-6.183-25.24-6.183s13.8,52.489,42.754,92.617l33.734,5.926-26.207,3.779a135.92592,135.92592,0,0,0,11.719,12.422c42.115,39.092,89.024,57.028,104.773,40.06s-5.625-62.412-47.74-101.5c-13.056-12.119-29.457-21.844-45.875-29.5Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#f2f2f2"
                    />
                    <path
                      id="bde08021-c30f-4979-a9d8-cb90b72b5ca2-1006"
                      data-name="Path 2"
                      d="M361.591,677.70647l7.758-25.538a335.93951,335.93951,0,0,0-23.9-29.371l-6.924,9.865,3.972-13.076c-10.641-11.436-18.412-18.335-18.412-18.335s-15.315,52.067-11.275,101.384l25.815,22.51-24.392-10.312a135.91879,135.91879,0,0,0,3.614,16.694c15.846,55.234,46.731,94.835,68.983,88.451s27.446-56.335,11.6-111.569c-4.912-17.123-13.926-33.926-24.023-48.965Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#f2f2f2"
                    />
                    <path
                      id="b3ac2088-de9b-4f7f-bc99-0ed9705c1a9d-1007"
                      data-name="Path 22"
                      d="M747.327,253.4445h-4.092v-112.1a64.883,64.883,0,0,0-64.883-64.883H440.845a64.883,64.883,0,0,0-64.883,64.883v615a64.883,64.883,0,0,0,64.883,64.883H678.352a64.883,64.883,0,0,0,64.882-64.883v-423.105h4.092Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#e6e6e6"
                    />
                    <path
                      id="b2715b96-3117-487c-acc0-20904544b5b7-1008"
                      data-name="Path 23"
                      d="M680.97,93.3355h-31a23.02,23.02,0,0,1-21.316,31.714H492.589a23.02,23.02,0,0,1-21.314-31.714H442.319a48.454,48.454,0,0,0-48.454,48.454v614.107a48.454,48.454,0,0,0,48.454,48.454H680.97a48.454,48.454,0,0,0,48.454-48.454h0V141.7885a48.454,48.454,0,0,0-48.454-48.453Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#fff"
                    />
                    <path
                      id="b06d66ec-6c84-45dd-8c27-1263a6253192-1009"
                      data-name="Path 6"
                      d="M531.234,337.96451a24.437,24.437,0,0,1,12.23-21.174,24.45,24.45,0,1,0,0,42.345A24.43391,24.43391,0,0,1,531.234,337.96451Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#ccc"
                    />
                    <path
                      id="e73810fe-4cf4-40cc-8c7c-ca544ce30bd4-1010"
                      data-name="Path 7"
                      d="M561.971,337.96451a24.43594,24.43594,0,0,1,12.23-21.174,24.45,24.45,0,1,0,0,42.345A24.43391,24.43391,0,0,1,561.971,337.96451Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#ccc"
                    />
                    <circle
                      id="a4813fcf-056e-4514-bb8b-e6506f49341f"
                      data-name="Ellipse 1"
                      cx="364.43401"
                      cy="261.50202"
                      r="24.45"
                      fill="#2a629a"
                    />
                    <path
                      id="bbe451c3-febc-41ba-8083-4c8307a2e73e-1011"
                      data-name="Path 8"
                      d="M632.872,414.3305h-142.5a5.123,5.123,0,0,1-5.117-5.117v-142.5a5.123,5.123,0,0,1,5.117-5.117h142.5a5.123,5.123,0,0,1,5.117,5.117v142.5A5.123,5.123,0,0,1,632.872,414.3305Zm-142.5-150.686a3.073,3.073,0,0,0-3.07,3.07v142.5a3.073,3.073,0,0,0,3.07,3.07h142.5a3.073,3.073,0,0,0,3.07-3.07v-142.5a3.073,3.073,0,0,0-3.07-3.07Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#ccc"
                    />
                    <rect
                      id="bb28937d-932f-4fdf-befe-f406e51091fe"
                      data-name="Rectangle 1"
                      x="218.56201"
                      y="447.10197"
                      width="218.552"
                      height="2.047"
                      fill="#ccc"
                    />
                    <circle
                      id="fcef55fc-4968-45b2-93bb-1a1080c85fc7"
                      data-name="Ellipse 2"
                      cx="225.46401"
                      cy="427.41999"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <rect
                      id="ff33d889-4c74-4b91-85ef-b4882cc8fe76"
                      data-name="Rectangle 2"
                      x="218.56201"
                      y="516.11803"
                      width="218.552"
                      height="2.047"
                      fill="#ccc"
                    />
                    <circle
                      id="e8fa0310-b872-4adf-aedd-0c6eda09f3b8"
                      data-name="Ellipse 3"
                      cx="225.46401"
                      cy="496.43702"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <path
                      d="M660.69043,671.17188H591.62207a4.50493,4.50493,0,0,1-4.5-4.5v-24.208a4.50492,4.50492,0,0,1,4.5-4.5h69.06836a4.50491,4.50491,0,0,1,4.5,4.5v24.208A4.50492,4.50492,0,0,1,660.69043,671.17188Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#2a629a"
                    />
                    <circle
                      id="e12ee00d-aa4a-4413-a013-11d20b7f97f7"
                      data-name="Ellipse 7"
                      cx="247.97799"
                      cy="427.41999"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <circle
                      id="f58f497e-6949-45c8-be5f-eee2aa0f6586"
                      data-name="Ellipse 8"
                      cx="270.492"
                      cy="427.41999"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <circle
                      id="b4d4939a-c6e6-4f4d-ba6c-e8b05485017d"
                      data-name="Ellipse 9"
                      cx="247.97799"
                      cy="496.43702"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <circle
                      id="aff120b1-519b-4e96-ac87-836aa55663de"
                      data-name="Ellipse 10"
                      cx="270.492"
                      cy="496.43702"
                      r="6.902"
                      fill="#2a629a"
                    />
                    <path
                      id="f1094013-1297-477a-ac57-08eac07c4bd5-1012"
                      data-name="Path 88"
                      d="M969.642,823.53851H251.656c-1.537,0-2.782-.546-2.782-1.218s1.245-1.219,2.782-1.219H969.642c1.536,0,2.782.546,2.782,1.219S971.178,823.53851,969.642,823.53851Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#3f3d56"
                    />
                    <path
                      d="M792.25256,565.92292a10.09371,10.09371,0,0,1,1.41075.78731l44.8523-19.14319,1.60093-11.81526,17.92157-.10956-1.05873,27.0982-59.19987,15.65584a10.60791,10.60791,0,0,1-.44749,1.20835,10.2346,10.2346,0,1,1-5.07946-13.68169Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#ffb8b8"
                    />
                    <polygon
                      points="636.98 735.021 624.72 735.021 618.888 687.733 636.982 687.734 636.98 735.021"
                      fill="#ffb8b8"
                    />
                    <path
                      d="M615.96281,731.51778h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H601.076a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,615.96281,731.51778Z"
                      fill="#2f2e41"
                    />
                    <polygon
                      points="684.66 731.557 672.459 732.759 662.018 686.271 680.025 684.497 684.66 731.557"
                      fill="#ffb8b8"
                    />
                    <path
                      d="M891.68576,806.12757h23.64387a0,0,0,0,1,0,0v14.88687a0,0,0,0,1,0,0H876.7989a0,0,0,0,1,0,0v0A14.88686,14.88686,0,0,1,891.68576,806.12757Z"
                      transform="translate(-303.00873 15.2906) rotate(-5.62529)"
                      fill="#2f2e41"
                    />
                    <circle
                      cx="640.3925"
                      cy="384.57375"
                      r="24.56103"
                      fill="#ffb8b8"
                    />
                    <path
                      d="M849.55636,801.91945a4.47086,4.47086,0,0,1-4.415-3.69726c-6.34571-35.22559-27.08789-150.40528-27.584-153.59571a1.42684,1.42684,0,0,1-.01562-.22168v-8.58789a1.489,1.489,0,0,1,.27929-.87207l2.74024-3.83789a1.47845,1.47845,0,0,1,1.14355-.625c15.62207-.73242,66.78418-2.8789,69.25586.209h0c2.48242,3.10351,1.60547,12.50683,1.4043,14.36035l.00977.19336,22.98535,146.99512a4.51238,4.51238,0,0,1-3.71485,5.13476l-14.35644,2.36524a4.52127,4.52127,0,0,1-5.02539-3.09278c-4.44043-14.18847-19.3291-61.918-24.48926-80.38672a.49922.49922,0,0,0-.98047.13868c.25781,17.60546.88086,62.52343,1.0957,78.0371l.02344,1.6709a4.51811,4.51811,0,0,1-4.09277,4.53614l-13.84375,1.25781C849.83565,801.91359,849.695,801.91945,849.55636,801.91945Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#2f2e41"
                    />
                    <path
                      id="ae7af94f-88d7-4204-9f07-e3651de85c05-1013"
                      data-name="Path 99"
                      d="M852.38089,495.2538c-4.28634,2.548-6.85116,7.23043-8.32276,11.9951a113.681,113.681,0,0,0-4.88444,27.15943l-1.55553,27.60021-19.25508,73.1699c16.68871,14.1207,26.31542,10.91153,48.78049-.63879s25.03222,3.85117,25.03222,3.85117l4.49236-62.25839,6.41837-68.03232a30.16418,30.16418,0,0,0-4.86143-4.67415,49.65848,49.65848,0,0,0-42.44229-8.99538Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#2a629a"
                    />
                    <path
                      d="M846.12661,580.70047a10.52561,10.52561,0,0,1,1.50061.70389l44.34832-22.1972.736-12.02551,18.2938-1.26127.98041,27.4126L852.7199,592.93235a10.4958,10.4958,0,1,1-6.59329-12.23188Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#ffb8b8"
                    />
                    <path
                      id="a6768b0e-63d0-4b31-8462-9b2e0b00f0fd-1014"
                      data-name="Path 101"
                      d="M902.76552,508.41151c10.91151,3.85117,12.83354,45.57369,12.83354,45.57369-12.8367-7.06036-28.24139,4.49318-28.24139,4.49318s-3.20916-10.91154-7.06034-25.03223a24.52987,24.52987,0,0,1,5.13436-23.10625S891.854,504.558,902.76552,508.41151Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#2a629a"
                    />
                    <path
                      id="bfd7963f-0cf8-4885-9d3a-2c00bccda2e3-1015"
                      data-name="Path 102"
                      d="M889.99122,467.53052c-3.06-2.44837-7.23517,2.00173-7.23517,2.00173l-2.4484-22.03349s-15.30095,1.8329-25.0935-.61161-11.32255,8.87513-11.32255,8.87513a78.57978,78.57978,0,0,1-.30582-13.77092c.61158-5.50838,8.56838-11.01675,22.6451-14.68932S887.6518,439.543,887.6518,439.543C897.44542,444.43877,893.05121,469.97891,889.99122,467.53052Z"
                      transform="translate(-227.576 -76.46149)"
                      fill="#2f2e41"
                    />
                  </svg>
                </div>
                <h5 className="text-center my-3 font-bold text-lg">
                  Proses Pemesanan Mudah
                </h5>
                <p className="text-center">
                  Pesan tiket pesawat dengan aman, cepat, dan mudah. Platform
                  kami dirancang untuk memastikan kelancaran, mulai dari
                  pencarian opsi penerbangan hingga proses pembayaran yang aman
                  dan efisien.
                </p>
              </div>
            </div>
          </div>

          {/* JUMBOTRON SECTION */}
          <div className="flex flex-col items-center max-w-screen-xl text-center mx-auto">
            <h1 className="text-4xl font-bold md:text-5xl">
              Life is Short. Book the Trip Now!
            </h1>
            <hr className="my-2 w-1/4 bg-[#003285] p-1 rounded" />
            <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48 ">
              Jelajahi berbagai kemungkinan perjalanan domestik dengan BiFlight.
              Nikmati kemudahan dan kenyamanan dalam memesan tiket pesawat murah
              untuk penerbangan domestik.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL PILIH JUMLAH PENUMPANG */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll transition-opacity duration-300  ${
          passengerModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative p-4 w-full lg:w-2/5 max-w-2xl max-h-full transform transition-transform duration-300 ease-in-out ${
            passengerModalOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                Pilih Jumlah Penumpang
              </h3>
              <button
                type="button"
                id="closePassengerModal"
                onClick={handlePassengerModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaPerson className="text-xl mr-1" />
                    Dewasa
                  </span>
                  <span className="text-sm text-slate-500">
                    (12 tahun keatas)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseAdult"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.dewasa <= 1}
                    onClick={() => handlePenumpang("dewasa", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.dewasa}
                  </span>
                  <button
                    type="button"
                    id="increaseAdult"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("dewasa", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaChildDress className="text-xl mr-1" />
                    Anak
                  </span>
                  <span className="text-sm text-slate-500">(2 - 11 tahun)</span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseChild"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.anak === 0}
                    onClick={() => handlePenumpang("anak", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.anak}
                  </span>
                  <button
                    type="button"
                    id="increaseChild"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("anak", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="flex items-center mb-1">
                    <FaBaby className="text-xl mr-1" />
                    Bayi
                  </span>
                  <span className="text-sm text-slate-500">
                    (Dibawah 2 tahun)
                  </span>
                </div>
                <div className="flex gap-5 items-center">
                  <button
                    type="button"
                    id="decreaseBaby"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    disabled={penumpang?.bayi === 0}
                    onClick={() => handlePenumpang("bayi", "d")}
                  >
                    -
                  </button>
                  <span className="border-b-2 border-[#2A629A] px-3 pb-1">
                    {penumpang?.bayi}
                  </span>
                  <button
                    type="button"
                    id="increaseBaby"
                    className="border-2 border-[#2A629A] px-3 py-1 rounded-lg"
                    onClick={() => handlePenumpang("bayi", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
              <button
                type="submit"
                id="searchFlights"
                onClick={handleClick}
                className="text-white bg-[#2A629A] transition-colors duration-300 hover:bg-[#003285] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobile ? "" : <BtnScrollTop />}
      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
}
