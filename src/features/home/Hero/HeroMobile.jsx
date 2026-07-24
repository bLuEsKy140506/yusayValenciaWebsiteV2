import heroBg from "@/assets/images/hero/hero-bg.jpg";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function HeroMobile() {
  return (
    <section className="relative min-h-[calc(100svh-64px)] overflow-hidden">

      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: "center center",
        }}
      />

      {/* White Overlay */}

      <div className="absolute inset-0 bg-white/78" />

      {/* Soft Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(40,53,46,0.08),transparent_45%),radial-gradient(circle_at_bottom,rgba(246,232,74,0.10),transparent_45%)]" />

      {/* Content */}

      <div className="relative mx-auto flex min-h-[calc(100svh-64px)] max-w-md flex-col justify-center px-5 py-5">

        {/* Trust Card */}

        <div className="mb-8">

          <HeroImage />

        </div>

        {/* Content */}

        <HeroContent />

      </div>

    </section>
  );
}