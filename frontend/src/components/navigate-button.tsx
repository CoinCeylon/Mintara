"use client";

import { useRouter } from "next/navigation";
import { Button } from "@components/ui/button";

type Props = {
  navigateTo: string;
  children: string;
  className?: string;
};

export default function NavigateButton({
  navigateTo,
  className,
  children,
}: Props) {
  const router = useRouter();

  const handleClick = () => router.push(navigateTo);

  return (
    <Button variant={"default"} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}
