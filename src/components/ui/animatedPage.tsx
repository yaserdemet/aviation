import React from 'react';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, className }) => {
  return (
    <div className={`animate-page-in will-change-[transform,opacity,filter] ${className || ""}`}>
      {children}
    </div>
  );
};

export default AnimatedPage;
