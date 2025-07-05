import Separator from "@components/separator";

type Props = {
  children: string;
};

export default function Heading({ children }: Props) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Separator direction="left" />
      <h1 className="bg-heading-text-gradient text-transparent w-max lg:text-nowrap lg:max-w-[1000px] py-[30px] bg-clip-text mx-auto text-[20px] lg:text-[40px] font-[400] text-center">
        {children}
      </h1>
      <Separator direction="right" />
    </div>
  );
}
