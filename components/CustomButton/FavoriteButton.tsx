// components/FavoriteButton.tsx

import React, { useState } from "react";
import { Star, StarIcon } from "lucide-react"; // Import icons from lucide-react

interface FavoriteButtonProps {
  onClick?: () => void;
  isFavorite: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  onClick,
  isFavorite,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 p-1 rounded-full transition-all duration-200 text-yellow-500 text-center `}
    >
      {isFavorite ? (
        <Star className="w-full h-full" fill="currentColor" />
      ) : (
        <Star className="w-full h-full" fill="none" />
      )}
    </button>
  );
};

export default FavoriteButton;
