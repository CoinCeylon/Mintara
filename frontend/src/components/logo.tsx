import Image from "next/image";
import logo from "@public/logo.png";

export default function Logo() {
  return (
    <Image
      src={logo}
      className="w-[144px] h-[34px] md:w-[234px] md:h-[50px]"
      alt="Logo"
    />
  );
}
