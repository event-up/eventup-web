import React, { PropsWithChildren } from 'react';
import './VoteContestantCard.scss';

interface ContestantCardProps extends PropsWithChildren {
  onClick: (() => void) | undefined;
}

export const ContestantCard: React.FC<ContestantCardProps> = ({
  children,
  onClick,
}) => {
  return (
    <div
      className={`${
        onClick ? 'hover:scale-90' : ''
      }  scale-100 transition-all m-1  `}
    >
      <div
        className=" flex  p-3 w-[150px] overflow-hidden  h-[170px] flex-col items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#39270e]"
        onClick={onClick}
      >
        {children}
      </div>
      {/* <div className="glow glow-effect" /> */}
    </div>
  );
};
