import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";

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

          <Button to="/apply" className="hidden lg:inline-flex hover:-translate-y-0.5 hover:shadow-lg">
            Apply Now
          </Button>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
