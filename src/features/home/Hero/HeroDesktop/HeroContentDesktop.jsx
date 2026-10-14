import { HiCheck } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import colors from "@/constants/colors";

const FEATURES = [
  "Fast Approval",
  "1% Monthly Interest",
  "Flexible Terms",
];

export default function HeroContent() {
  return (
    <div className="mx-auto max-w-[600px] lg:mx-0">

      {/* Eyebrow */}

      <div className="mb-7 flex justify-center lg:justify-start">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-green-100
            bg-white/90
            px-5
            py-2
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            shadow-sm
          "
          style={{ color: colors.primary }}
        >
          Trusted Since 1960 • Fast & Personalized Service
        </span>
      </div>

      {/* Heading */}

      <h1
        className="
          text-center
          font-black
          leading-[0.92]
          tracking-[-0.045em]

          text-[2.8rem]

          sm:text-[3.4rem]

          lg:text-left
          lg:text-[4.3rem]

          xl:text-[4.7rem]
        "
      >
        Fast & Affordable

        <br />

        Loans in

        <br />

        <span
          style={{
            color: colors.primary,
          }}
        >
          Valencia City
        </span>
      </h1>

      {/* Description */}

      <p
        className="
          mx-auto
          mt-7
          max-w-[540px]
          text-center
          text-lg
          leading-8
          text-gray-700

          lg:mx-0
          lg:text-left
        "
      >
        Helping <strong>SSS/GSIS pensioners</strong>,
        <strong> homeowners</strong>, and
        <strong> business owners</strong> achieve their financial
        goals through trusted financing solutions that are
        fast, transparent, and personalized.
      </p>

      {/* Features */}

      <div
        className="
          mt-8
          flex
          flex-wrap
          justify-center
          gap-3

          lg:justify-start
        "
      >
        {FEATURES.map((feature) => (
          <div
            key={feature}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-100
              bg-white
              px-5
              py-2
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
            "
          >
            <HiCheck
              className="h-4 w-4"
              style={{
                color: colors.primary,
              }}
            />

            <span className="text-sm font-semibold text-gray-800">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}

      <div
        className="
          mt-9
          flex
          flex-wrap
          justify-center
          gap-4

          lg:justify-start
        "
      >
        <Button to="/apply">
          Apply Now
        </Button>

        <Button variant="secondary">
          Loan Calculator
        </Button>
      </div>

    </div>
  );
}
