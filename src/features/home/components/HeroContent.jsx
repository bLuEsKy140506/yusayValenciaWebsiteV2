import {
  HiCheckCircle,
  HiShieldCheck,
} from "react-icons/hi2";

import HeroButtons from "./HeroButtons";
import colors from "@/constants/colors";

const benefits = [
  "Fast Loan Processing",
  "1% Monthly Interest",
  "Personalized Assistance",
];

export default function HeroContent() {
  return (
    <div>

      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
        style={{
          backgroundColor: colors.secondary,
          color: colors.primary,
        }}
      >
        <HiShieldCheck />

        Trusted Since 1959
      </div>

      <h1
        className="mb-6 text-5xl font-black leading-tight lg:text-6xl"
        style={{ color: colors.primary }}
      >
        Fast &
        <br />

        Personalized
        <br />

        Financial Solutions
      </h1>

      <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600">
        Helping pensioners, homeowners, and business owners
        achieve their financial goals through trusted,
        fast, and personalized lending solutions.
      </p>

      <div className="mb-10 space-y-4">
        {benefits.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <HiCheckCircle
              className="text-2xl"
              style={{ color: colors.primary }}
            />

            <span className="text-lg font-medium">
              {item}
            </span>
          </div>
        ))}
      </div>

      <HeroButtons />

    </div>
  );
}