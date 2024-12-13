"use client";

import { useDraggable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { Position } from "@prisma/client";
import { CSS } from "@dnd-kit/utilities";

interface DraggablePlayerProps {
  id: string;
  firstName: string;
  position: Position;
  jerseyNumber: number;
  className?: string;
  style?: React.CSSProperties;
}

export function DraggablePlayer({
  id,
  firstName,
  position,
  jerseyNumber,
  className = "",
  style = {},
}: DraggablePlayerProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      type: "player",
      position,
      firstName,
      jerseyNumber,
    },
  });

  const getBadgeBorderColor = (position: Position) => {
    switch (position) {
      case "GK":
        return "border-yellow-500";
      case "DF":
        return "border-blue-500";
      case "MF":
        return "border-green-500";
      case "FW":
        return "border-red-500";
      default:
        return "border-gray-500";
    }
  };

  const draggableStyle = {
    transform: CSS.Translate.toString(transform),
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={draggableStyle}
      {...listeners}
      {...attributes}
      className={`absolute cursor-grab active:cursor-grabbing ${className}`}
    >
      <Badge
        className={`md:w-12 md:h-12 rounded-full flex items-center justify-center hover:border-primary/50 shadow-lg transition-transform hover:scale-110 ${getBadgeBorderColor(
          position
        )}`}
        variant="secondary"
      >
        <span className="text-[10px] duration-200 ease-out transition-all w-fit">
          {jerseyNumber}
        </span>
      </Badge>
    </div>
  );
}