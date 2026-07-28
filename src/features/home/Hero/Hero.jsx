import HeroDesktop from "./HeroDesktop/HeroDesktop";
import HeroMobile from "./HeroMobile/HeroMobile";

export default function Hero() {
  return (
    <>
      <div className="hidden lg:block">
        <HeroDesktop />
      </div>

      <div className="lg:hidden">
        <HeroMobile />
      </div>
    </>
  );
}