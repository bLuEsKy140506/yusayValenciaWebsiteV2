import { Link } from "react-router-dom";
import logo from "@/assets/logos/logo.png";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="Yusay Credit and Finance Corporation"
        className="h-12 w-25 transition-transform duration-300 hover:scale-105"
      />

      {/* <div className="hidden sm:block leading-tight">
        <h1 className="text-lg font-bold tracking-wide text-[#28352E]">
          YCFC
        </h1>

        <p className="text-xs uppercase tracking-widest text-gray-500">
          Valencia Branch
        </p>
      </div> */}
    </Link>
  );
}