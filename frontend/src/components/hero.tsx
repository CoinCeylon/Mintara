import Image from "next/image";
import gamer from "@public/gamer.png";
import NavigateButton from "@components/navigate-button";
export default function Hero() {
  return (
    <div>
      <div className="h-screen w-full inset-0 mx-auto flex flex-col gap-12 md:gap-0 md:flex-row items-center justify-center md:justify-between z-[50]">
        <div className="flex sm:w-1/2 order-2 md:order-1 flex-col gap-12 justify-start">
          <h1 className="bg-[#020A09] bg-heading-text-gradient lg:max-w-[692px] bg-clip-text  text-[24px] lg:text-[48px] font-[400] text-transparent text-center md:text-left">
            Unleash the Magic of Mintara
          </h1>
          <p className="text-justify md:text-left text-primary_color">
            Own powerful cards, battle real players, and build your legacy in
            the world of Mintara. Every card is an NFT. Every move is yours to
            make. Strategy meets ownership in the next generation of gaming.
          </p>
          <NavigateButton navigateTo="/sign-in" className="w-full">
            Start your journey
          </NavigateButton>
        </div>
        <Image
          src={gamer}
          width={920}
          height={920}
          alt="Image of a gamer"
          className="sm:w-1/2 bg-transparent order-1 md:order-2"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
