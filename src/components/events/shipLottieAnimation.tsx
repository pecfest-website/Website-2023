import React, { useState } from 'react';
import Lottie from 'react-lottie';
import pirateShip from '../../assets/lottie/priateShip.json';

interface shipLottieAnimationProps {
  onComplete: () => void;
}

const PirateShipLottie: React.FC<shipLottieAnimationProps> = ({ onComplete }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: pirateShip,
  };

  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
      eventListeners={[
        {
          eventName: 'complete',
          callback: onComplete,
        },
      ]}
    />
  );
};

export default PirateShipLottie;
