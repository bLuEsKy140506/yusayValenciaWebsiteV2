import HeroDesktop from "./HeroDesktop";
import HeroMobile from "./HeroMobile";

export default function Hero() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>

      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        <HeroMobile />
      </div>
    </>
  );
}