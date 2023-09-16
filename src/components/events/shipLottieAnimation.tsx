import React, { useState } from 'react';
import Lottie from 'react-lottie';
import pirateShip from '../../assets/lottie/priateShip.json';

interface shipLottieAnimationProps {
  onComplete: () => void;
}

const LottieAnimation1: React.FC<shipLottieAnimationProps> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: pirateShip,
  };

  const playAnimation = () => {
    setIsPlaying(true);
  };

  return (
    <div onClick={playAnimation}>
      <Lottie
        options={defaultOptions}
        eventListeners={[
          {
            eventName: 'complete',
            callback: onComplete,
          },
        ]}
      />
    </div>
  );
};

export default LottieAnimation1;
