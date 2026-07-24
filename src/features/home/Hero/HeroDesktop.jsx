import heroBg from "@/assets/images/hero/hero-bg.jpg";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function HeroDesktop() {
  return (
    <section
      className="
        relative
        h-[calc(100dvh-72px)]
        overflow-hidden
      "
    >
      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundPosition: "center center",
        }}
      />

      {/* White Overlay */}

      <div className="absolute inset-0 bg-white/72" />

      {/* Accent Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(40,53,46,0.08),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(246,232,74,0.10),transparent_45%)]" />

      {/* Content */}

    <div className="relative mx-auto flex h-full max-w-7xl items-center px-8 pt-6 pb-6 lg:px-12 xl:px-16">

        <div className="grid w-full grid-cols-12 items-center gap-16">

          {/* LEFT */}

          <div
            className="
              col-span-7
              flex
              justify-center
            "
          >
            <div className="w-full max-w-[620px]">

              <HeroContent />

            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              col-span-5
              flex
              justify-end
             items-start
            "
          >
            <HeroImage />
          </div>

        </div>

      </div>
    </section>
  );
}