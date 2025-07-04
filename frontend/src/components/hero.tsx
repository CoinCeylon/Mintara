import Image from "next/image";
import hero_background from "@public/hero-background.png";
import gamer from "@public/gamer.png";
import ConnectWallet from "./connect-wallet";
export default function Hero() {
  return (
    <div className="relative">
      <Image
        src={hero_background}
        objectFit="cover"
        width={1440}
        height={960}
        quality={100}
        alt="hero background image"
        className="z-[-100] absolute top-0 left-0 object-cover"
      />
      <div className="absolute h-screen w-full top-0 left-0 flex flex-col md:flex-row items-center justify-center md:justify-between z-[50]">
        <div className="flex flex-2 flex-col gap-12 justify-start">
          <h1 className="bg-[#020A09] bg-heading-text-gradient lg:max-w-[692px] bg-clip-text  text-[24px] lg:text-[48px] font-[400] text-transparent text-center md:text-left">
            Unleashing Innovation, One Challenge at a Time
          </h1>
          <p className="text-left text-primary_color">
            Own powerful cards, battle real players, and build your legacy in
            the world of Mintara. Every card is an NFT. Every move is yours to
            make. Strategy meets ownership in the next generation of gaming.
          </p>
          <ConnectWallet />
        </div>
        <Image
          src={gamer}
          width={920}
          height={920}
          alt="Image of a gamer"
          className="flex-1 bg-transparent"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
