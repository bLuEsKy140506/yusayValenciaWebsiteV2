import heroBg from "@/assets/images/hero/hero-bg.jpg";

import HeroImageMobile from "./HeroImageMobile";
import HeroContentMobile from "./HeroContentMobile";

export default function HeroMobile() {
  return (
    <section
      className="
        relative
        h-[calc(100dvh-64px)]
        overflow-hidden
      "
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/82" />

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(40,53,46,0.08),transparent_45%),radial-gradient(circle_at_bottom,rgba(246,232,74,0.10),transparent_45%)]" />

      <div
        className="
          relative
          mx-auto
          flex
          h-full
          max-w-md
          flex-col
          justify-center
          px-4
          py-4
        "
      >
        <div className="space-y-6">
          <HeroImageMobile />

          <HeroContentMobile />
        </div>
      </div>
    </section>
  );
}