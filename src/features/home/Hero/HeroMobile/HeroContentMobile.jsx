import { HiCheck } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import colors from "@/constants/colors";
const FEATURES = [
  "Fast approval",
  "1% monthly interest",
  "Flexible payment terms",
];

export default function HeroContentMobile() {
  return (
    <>
      <div className="mt-4 text-center">

        <h1
          className="
            text-[2rem]
            font-black
            leading-tight
            tracking-tight
          "
        >
          Fast & Affordable Loans in
          <br />

          <span style={{ color: colors.primary }}>
            Valencia City
          </span>
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-xs
            text-sm
            leading-6
            text-gray-700
          "
        >
          We provide trusted lending solutions for
          SSS/GSIS pensioners and real estate owners,
          helping clients access financing quickly
          and responsibly.
        </p>

        <div
          className="
            mt-5
            flex
            flex-wrap
            justify-center
            gap-2
          "
        >
          {FEATURES.map((item) => (
            <span
              key={item}
              className="
                rounded-full
                border
                border-green-100
                bg-white
                px-3
                py-1
                text-[11px]
                font-semibold
                shadow-sm
              "
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 space-y-3">

          <Button className="w-full">
            Apply Now
          </Button>

          <Button
            variant="secondary"
            className="w-full"
          >
            Loan Calculator
          </Button>

        </div>

      </div>
    </>
  );
}