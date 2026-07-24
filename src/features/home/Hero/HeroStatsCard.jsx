import { HiCheck } from "react-icons/hi2";

import colors from "@/constants/colors";

const STATS = [
  "Established in 1960",
  "Serving Valencia since 2004",
  "Fast & Personalized Service",
];

export default function HeroStatsCard() {
  return (
    <div
      className="
        w-full
        max-w-[500px]
        rounded-[36px]
        px-8
        py-10

        lg:px-12
        lg:py-14

        shadow-[0_25px_60px_rgba(0,0,0,0.18)]
      "
      style={{
        backgroundColor: colors.primary,
      }}
    >
      {/* Number */}

      <h2
        className="
          text-center
          text-6xl
          font-black
          leading-none
          tracking-tight
          text-white

          lg:text-8xl
        "
      >
        65+
      </h2>

      {/* Title */}

      <p
        className="
          mt-3
          text-center
          text-xl
          font-semibold
          text-white

          lg:text-[2rem]
        "
      >
        Years of Trusted Service
      </p>

      {/* Divider */}

      <div className="mx-auto mt-8 mb-8 h-px w-full bg-white/25" />

      {/* Trust Items */}

      <div className="space-y-6">

        {STATS.map((item) => (

          <div
            key={item}
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <div className="rounded-full bg-white/15 p-1.5">

              <HiCheck className="h-4 w-4 text-white" />

            </div>

            <span
              className="
                text-base
                font-medium
                tracking-wide
                text-white

                lg:text-xl
              "
            >
              {item}
            </span>

          </div>

        ))}

      </div>
    </div>
  );
}