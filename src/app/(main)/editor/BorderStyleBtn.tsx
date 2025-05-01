import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

interface BorderStyleBtnProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export const BorderStyles = {
  SQUARE: "square",
  CIRCLE: "circle",
  SQUIRCLE: "squircle",
};

const borderStyles = Object.values(BorderStyles);

export default function BorderStyleBtn({
  borderStyle,
  onChange,
}: BorderStyleBtnProps) {
  function handleOnClick() {
    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      title="Change border style"
      onClick={handleOnClick}
    >
      <Icon className="size-5" />
    </Button>
  );
}
