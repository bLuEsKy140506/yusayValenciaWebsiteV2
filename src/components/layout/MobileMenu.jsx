import { HiOutlineMenu } from "react-icons/hi";

export default function MobileMenu() {
  return (
    <button
      className="rounded-lg p-2 text-[#28352E] transition hover:bg-gray-100 lg:hidden"
      aria-label="Open Menu"
    >
      <HiOutlineMenu size={28} />
    </button>
  );
}