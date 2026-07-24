import { NavLink } from "react-router-dom";
import colors from "@/constants/colors";

const links = [
  { name: "Home", path: "/" },
  { name: "Calculator", path: "/calculator" },
  { name: "Properties", path: "/properties" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {links.map((link) => (
        <NavLink key={link.path} to={link.path}>
          {({ isActive }) => (
            <div
              className="group relative cursor-pointer select-none pb-1 font-medium transition-all duration-300 active:scale-95"
              style={{
                color: isActive ? colors.primary : colors.text,
              }}
            >
              <span
                className="transition-colors duration-300 group-hover:opacity-90"
                style={{
                  color: isActive ? colors.primary : undefined,
                }}
              >
                {link.name}
              </span>

              {/* Underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
                style={{
                  backgroundColor: colors.primary,
                }}
              />
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}