import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

import colors from "@/constants/colors";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-100 shadow-sm backdrop-blur-md"
      style={{
        backgroundColor: `${colors.white}E6`, // 90% opacity
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-10">
        <Logo />

        <div className="flex items-center gap-6">
          <NavLinks />

          <button
            className="hidden cursor-pointer rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:block"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary;
            }}
          >
            Apply Now
          </button>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}