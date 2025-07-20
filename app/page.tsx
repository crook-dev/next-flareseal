import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ApplicationIcon from '@/components/application-title';
import { Metadata } from 'next';
import HomeHero from '@/components/home-hero';

export const metadata: Metadata = {
  title: "FlareSeal – The FlareSeal has been perfected for the Refrigeration and HVAC industry!",
  description: "The Flare Seal prevents and eliminates refrigerant leaks in Refrigeration and HVAC systems. Leak free flare connections",
  openGraph: {
    title: "FlareSeal – The FlareSeal has been perfected for the Refrigeration and HVAC industry!",
    description: "The Flare Seal prevents and eliminates refrigerant leaks in Refrigeration and HVAC systems. Leak free flare connections",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://nuxt.com/social.jpg",
        width: 1200,
        height: 630,
        alt: "FlareSeal",
      },
    ],
  },
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HomeHero />

      {/* Multi-Ring-Seal Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center flex-wrap">
            <div className="w-full lg:w-1/2">
              <h2 className="text-primary text-3xl">
                The HVAC/R Industry Changing Multi-Ring-Seal By FlareSeal&reg;
              </h2>
              <p>
                The Multi-Ring-Seal by FlareSeal&reg; allows the best of both
                worlds in a flare connection, allowing for serviceable components
                while maintaining a permanent leak-free connection. FlareSeal® can
                even be used to repair a small existing leak!
              </p>
              <ul className="mb-8 ml-8 list-disc">
                <li className="mb-2">
                  Creates a confident leak-free flare connection.
                </li>
                <li className="mb-2">Reduces annual cost of refrigerant.</li>
                <li className="mb-2">
                  Lowers cost to operate systems due to leak reductions.
                </li>
                <li className="mb-2">
                  Sales advantage for OEM&apos;s over others not using FlareSeal&reg;.
                </li>
                <li className="mb-2">
                  Protection against weeping on new and existing equipment.
                </li>
                <li className="mb-2">
                  Allows for serviceable components to be installed.
                </li>
                <li className="mb-2">
                  Reduces service calls due to refrigerant leaks.
                </li>
                <li className="mb-2">Protection for the environment.</li>
                <li className="mb-2">
                  Improves integrity of every flare connection.
                </li>
              </ul>
              <Link href="/shop" className="btn btn__primary px-4">
                Shop Now
              </Link>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 px-0 lg:px-4">
              <div className="video-responsive hero-video">
                <iframe
                  title="FlareSeal Video"
                  id="modalvid"
                  src="https://player.vimeo.com/video/280992178?autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div className="flex pt-16">
            <div className="w-full">
              <h2 className="text-center mb-8 text-primary text-3xl">
                Endless Applications for Leak-Free Flare Connections!
              </h2>
              <div className="flex flex-wrap justify-around">
                <ApplicationIcon title="Pilot Lines">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <path
                          fill="#666"
                          d="M24.006 32h6.368c.899 0 1.625.717 1.625 1.6v8.24L39.995 32h-6.37c-.898 0-1.626-.717-1.626-1.6V22.16L24.006 32zm6.368 16c-.178 0-.36-.029-.537-.091-.65-.224-1.088-.829-1.088-1.509V35.2h-8.125c-.624 0-1.193-.354-1.464-.907-.27-.554-.195-1.21.197-1.693l13-16c.43-.53 1.155-.735 1.805-.51.652.225 1.087.83 1.087 1.51v11.2h8.126c.625 0 1.194.353 1.465.907.27.554.194 1.211-.196 1.693l-13 16c-.314.387-.785.6-1.27.6z"
                        />
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="Evaporator Pressure Regulators">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M14.5 19.333c-2.666 0-4.833-2.167-4.833-4.833 0-2.663 2.167-4.833 4.833-4.833 2.666 0 4.833 2.17 4.833 4.833 0 2.666-2.167 4.833-4.833 4.833zM29 16.917v-4.834h-5.177c-.227-.877-.575-1.701-1.027-2.462l3.666-3.666-3.417-3.417-3.666 3.666c-.761-.452-1.585-.8-2.462-1.027V0h-4.834v5.176c-.877.228-1.701.576-2.462 1.028L5.955 2.538 2.538 5.954 6.204 9.62c-.452.761-.8 1.585-1.027 2.462H0v4.834h5.176c.228.877.576 1.701 1.028 2.462l-3.666 3.666 3.417 3.417 3.666-3.666c.761.452 1.585.8 2.462 1.027V29h4.834v-5.177c.877-.227 1.701-.575 2.462-1.027l3.666 3.666 3.417-3.417-3.666-3.666c.452-.761.8-1.585 1.027-2.462H29z"
                            transform="translate(18 18)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="Hi-Low Pressure Controls">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M22.176 23.76c0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584-.876 0-1.584.708-1.584 1.584M20.592 26.136c-.876 0-1.584.708-1.584 1.584 0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584M26.928 26.136c-.876 0-1.584.708-1.584 1.584 0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584M23.76 30.096c-.876 0-1.584.708-1.584 1.584 0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584M17.424 30.096c-.876 0-1.584.708-1.584 1.584 0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584M30.096 30.096c-.876 0-1.584.708-1.584 1.584 0 .876.708 1.584 1.584 1.584.876 0 1.584-.708 1.584-1.584 0-.876-.708-1.584-1.584-1.584M3.168 12.672V9.504H23.76v7.92h-1.584v-3.168c0-.874-.71-1.584-1.584-1.584H3.168zm15.84 6.336c0 .874.71 1.584 1.584 1.584h4.752c.874 0 1.584-.71 1.584-1.584V9.504c0-1.747-1.42-3.168-3.168-3.168h-9.504V3.168h4.752V0H6.336v3.168h4.752v3.168H1.584C.71 6.336 0 7.046 0 7.92v6.336c0 .874.71 1.584 1.584 1.584h17.424v3.168z"
                            transform="translate(16 15)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="Thermostatic Expansion Valves">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M4.668 21.78c-.706-.813-1.549-2.178-1.549-4.06 0-3.14 2.453-7.57 4.68-10.877V14.6c0 .632.381 1.198.964 1.442.584.24 1.253.109 1.7-.339l3.266-3.265c.875 1.593 1.87 3.78 1.87 5.282 0 1.985-.933 3.811-2.56 5.006-2.583 1.904-6.286 1.459-8.37-.945zm21.394 13.556L15.478 24.752c2.062-1.783 3.241-4.301 3.241-7.033 0-3.49-3.035-8.146-3.382-8.665-.259-.387-.678-.64-1.143-.687-.47-.044-.927.12-1.258.45l-2.017 2.015V2.119c0-.655-.41-1.243-1.028-1.466-.616-.223-1.309-.036-1.73.468C7.827 1.521 0 10.991 0 17.719c0 2.219.822 4.389 2.312 6.108h.002c1.792 2.067 4.36 3.252 7.046 3.252 1.164 0 2.294-.245 3.367-.666l11.13 11.13 2.206-2.207z"
                            transform="translate(19 12)"
                          />
                          <path
                            d="M9.36 17.72c-1.649 0-3.173.52-4.435 1.396.234.7.59 1.258.922 1.643.287.33.629.594.994.828.73-.468 1.59-.747 2.519-.747.94 0 1.813.283 2.546.761.95-.61 1.563-1.47 1.89-2.485-1.261-.876-2.787-1.396-4.436-1.396"
                            transform="translate(19 12)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="Filter Driers">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M2.7 14.76c2.344 1.245 5.905 1.89 9.45 1.89 3.545 0 7.106-.645 9.45-1.89v1.89c0 .784-3.312 2.7-9.45 2.7s-9.45-1.916-9.45-2.7v-1.89zm0-5.4c2.344 1.245 5.905 1.89 9.45 1.89 3.545 0 7.106-.645 9.45-1.89v1.89c0 .784-3.312 2.7-9.45 2.7s-9.45-1.916-9.45-2.7V9.36zm9.45-6.21c6.138 0 9.45 1.916 9.45 2.7 0 .784-3.312 2.7-9.45 2.7S2.7 6.634 2.7 5.85c0-.784 3.312-2.7 9.45-2.7zm5.4 21.018c-1.44.343-3.24.582-5.4.582-6.138 0-9.45-1.916-9.45-2.7v-1.89c2.344 1.245 5.905 1.89 9.45 1.89 3.545 0 7.106-.645 9.45-1.89v1.89h2.7V5.85c0-3.545-6.111-5.4-12.15-5.4C6.111.45 0 2.305 0 5.85v16.2c0 3.545 6.111 5.4 12.15 5.4 1.854 0 3.713-.177 5.4-.52v-2.762zM24.3 32.051L19.296 27.047 21.204 25.138 24.3 28.233 30.096 22.438 32.004 24.347z"
                            transform="translate(16 17)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="Oil Filters">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M12 6.468c3.584 4.786 8 11.684 8 14.73 0 4.412-3.588 8-8 8s-8-3.588-8-8c0-3.044 4.416-9.942 8-14.73m0 26.73c6.618 0 12-5.382 12-12 0-6.052-9.372-17.918-10.44-19.252L12 .002l-1.56 1.944C9.372 3.28 0 15.146 0 21.198c0 6.618 5.382 12 12 12"
                            transform="translate(20 15)"
                          />
                          <path
                            d="M17.5 21.198h-3c0 1.378-1.122 2.5-2.5 2.5v3c3.034 0 5.5-2.466 5.5-5.5"
                            transform="translate(20 15)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="HVAC Mini-Splits">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <path
                          fill="#666"
                          d="M38.402 44.8H44.8V40h-6.398v4.8zm-19.202 0h6.401V40h-6.4v4.8zM28.801 24h6.4v-4.8h-6.4V24zM46.4 36.8h-3.2v-1.6c0-2.646-2.153-4.8-4.798-4.8h-4.8v-3.2h3.2c.883 0 1.6-.717 1.6-1.6v-8c0-.883-.717-1.6-1.6-1.6h-9.6c-.884 0-1.601.717-1.601 1.6v8c0 .883.717 1.6 1.6 1.6h3.2v3.2h-4.8c-2.647 0-4.8 2.154-4.8 4.8v1.6h-3.2c-.884 0-1.601.717-1.601 1.6v8c0 .883.717 1.6 1.6 1.6h9.601c.883 0 1.6-.717 1.6-1.6v-8c0-.883-.717-1.6-1.6-1.6h-3.2v-1.6c0-.882.718-1.6 1.6-1.6h12.801c.88 0 1.597.718 1.597 1.6v1.6h-3.197c-.883 0-1.6.717-1.6 1.6v8c0 .883.717 1.6 1.6 1.6H46.4c.883 0 1.6-.717 1.6-1.6v-8c0-.883-.717-1.6-1.6-1.6z"
                        />
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>

                <ApplicationIcon title="LP Gas Lines">
                  <svg
                    className="mx-auto mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g>
                        <circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#666"
                          strokeWidth="4"
                        />
                        <g fill="#666">
                          <path
                            d="M25.5 3c.826 0 1.5.672 1.5 1.5S26.326 6 25.5 6 24 5.328 24 4.5 24.674 3 25.5 3m0 6C27.981 9 30 6.981 30 4.5S27.981 0 25.5 0c-1.953 0-3.602 1.257-4.223 3H0v3h21.277c.621 1.743 2.27 3 4.223 3M10.5 15c-.826 0-1.5-.672-1.5-1.5s.674-1.5 1.5-1.5 1.5.672 1.5 1.5-.674 1.5-1.5 1.5m0-6c-1.953 0-3.601 1.257-4.223 3H0v3h6.277c.622 1.743 2.27 3 4.223 3 1.953 0 3.601-1.257 4.223-3H30v-3H14.723c-.622-1.743-2.27-3-4.223-3M25.5 24c-.826 0-1.5-.672-1.5-1.5s.674-1.5 1.5-1.5 1.5.672 1.5 1.5-.674 1.5-1.5 1.5m0-6c-1.953 0-3.602 1.257-4.223 3H0v3h21.277c.621 1.743 2.27 3 4.223 3 2.481 0 4.5-2.019 4.5-4.5S27.981 18 25.5 18"
                            transform="translate(17 19)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </ApplicationIcon>
              </div>
            </div>
          </div>

          {/* FlareSeal Logo and Description */}
          <div className="flex flex-wrap pt-16">
            <div className="w-full md:w-1/2">
              <Image
                src="/images/flareseal-fitting-logo.jpg"
                className="mx-auto"
                width={400}
                height={300}
                alt="FlareSeal logo"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-primary text-3xl">
                The FlareSeal&reg; was Developed Specifically for the HVAC/R
                Industry
              </h2>
              <p>
                The seal protects against the primary area of flare leaks… on the
                sealing surface. FlareSeal® fits all common SAE flare connections
                for our industry. It not only provides a long-term leak-free
                connection on new installations or products, but it also can be
                used to stop weeping connections in existing systems.
              </p>
              <Link href="/shop" className="btn btn__primary px-4">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Easy 3 Step Install Section */}
      <section className="three-step-background py-16">
        <div className="container py-8">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2">
              <Image
                className="mx-auto"
                src="/images/hero-image.png"
                width={450}
                height={300}
                alt="FlareSeal easy 3 step install"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-white text-3xl">Easy 3 Step Install</h2>
              <ul>
                <li className="mb-4 text-white">
                  <span className="numberCircle">1</span>Clean the male flare fitting
                </li>
                <li className="mb-4 text-white">
                  <span className="numberCircle">2</span>Snap the flare seal squarely
                  on the fitting
                </li>
                <li className="mb-4 text-white">
                  <span className="numberCircle">3</span>Tighten to OEM recommendation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engineered Copper Gasket Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-primary text-3xl">
                The FlareSeal&reg; is an engineered copper gasket with a special
                multi-ring design on the flare surface.
              </h2>
              <p className="text-primary text-lg">
                The entire product is coated with a baked on Loctite&reg; coating.
                The combination of the two allows for an easy clip-on solution
                that compensates for scratches in the sealing surface and other
                alignment imperfections between the male and female flare.
              </p>
              <p>
                The entire product is coated with a baked on Loctite® coating. The
                combination of the two allows for an easy clip-on solution that
                compensates for scratches in the sealing surface and other
                alignment imperfections between the male and female flare. The
                FlareSeal© has been perfected for the Refrigeration and HVAC
                Industry! Once assembled, the FlareSeal© becomes the best
                long-term leak-free flare connection in our industry.
              </p>
              <Link href="/shop" className="btn btn__primary px-4">
                Shop Now
              </Link>
            </div>
            <div className="w-full lg:w-1/2 mt-16 lg:mt-0">
              <Image
                src="/images/flareseal-fitting-logo.jpg"
                className="mx-auto"
                width={640}
                height={400}
                alt="FlareSeal copper gasket seals flare fittings"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-0 md:py-16">
        <div
          className="h-full container testimonial-bg bg-cover bg-center bg-no-repeat"
        >
          <div className="slide-height flex justify-center items-center h-full">
            <div className="w-full justify-center flex items-center px-4 h-full">
              <div className="text-center">
                <p className="mb-2 text-white font-semibold">
                  I pulled a vacuum and got a 134 microns. I worried about that
                  and purchased and installed the Flareseal ®. After that I got a
                  96 micron on the vacuum hold test. I am sold on theses little
                  gems.
                </p>
                <p className="text-white mt-8">Julian M.</p>
                <p className="text-white">HVAC Contractor - Mini Split Installer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
