import { cn } from "@/lib/utils";

type Props = {
  direction: "right" | "left";
};
export default function Separator({ direction }: Props) {
  return (
    <div
      className={cn(
        "bg-separator-gradient-left hidden lg:block w-full p-[1px]",
        {
          "bg-separator-gradient-right": direction === "right",
        }
      )}
    />
  );
}
