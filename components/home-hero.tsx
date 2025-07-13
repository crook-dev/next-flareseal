import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section style={{ backgroundImage: "url('/images/home-hero-768.jpg')" }} className="hero hero-image py-16 bg-right bg-no-repeat bg-cover">
    <div className="flex flex-wrap items-center container mx-auto p-2">
      <div className="w-full md:w-1/2">
        <h1 className="text-white font-semibold text-2xl">
          FlareSeal&reg; Delivers a Confident, Leak-free Flare!
        </h1>
        <p className="text-white text-xl italic font-semibold mt-8 md:mt-0">
          Perfect for Ductless Mini Split installations.
        </p>
        <p className="text-white mb-8">
          The Flare Seal prevents and eliminates refrigerant leaks in
          Refrigeration and HVAC systems.
        </p>
        <Link href="/shop" className="btn btn__white px-4">
          Shop Now &rarr;
        </Link>
      </div>
      <div className="w-full md:w-1/2 mt-6">
        <Image
          alt="Leak free flare connection using FlareSeal"
          src="/images/home-hero-flare.png"
          width={450}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  </section>
  );
}