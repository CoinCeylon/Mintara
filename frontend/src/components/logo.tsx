import Image from "next/image";
import logo from "@public/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        className="w-[144px] h-[24px] md:w-[234px] md:h-[50px]"
        alt="Logo"
      />
    </Link>
  );
}
