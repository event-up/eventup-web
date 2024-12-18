import React, { PropsWithChildren } from 'react';
import './VoteContestantCard.scss';

interface ContestantCardProps extends PropsWithChildren {
  onClick: () => void;
}

export const ContestantCard: React.FC<ContestantCardProps> = ({
  children,
  onClick,
}) => {
  return (
    <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div
        className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#39270e]"
        onClick={onClick}
      >
        {children}
      </div>
      <div className="glow glow-effect" />
    </div>
  );
};
