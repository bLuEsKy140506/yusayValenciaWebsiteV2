import { Link } from "react-router-dom";

import colors from "@/constants/colors";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">

      <Link
        to="/calculator"
        className="rounded-xl px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{
          backgroundColor: colors.primary,
        }}
      >
        Apply Now
      </Link>

      <Link
        to="/properties"
        className="rounded-xl border-2 px-8 py-4 font-semibold transition-all duration-300 hover:bg-gray-50"
        style={{
          borderColor: colors.primary,
          color: colors.primary,
        }}
      >
        Calculate My Loan
      </Link>

    </div>
  );
}