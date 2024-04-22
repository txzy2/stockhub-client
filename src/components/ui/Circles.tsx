import React, {useState, useEffect} from 'react';
import {UseTg} from '../../hooks/useTg';

interface Circle {
  size: number;
  x: number;
  y: number;
  animationDuration: number;
  delay: number;
}

const generateRandomCircleData = (numCircles: number): Circle[] => {
  const circleData: Circle[] = [];
  for (let i = 0; i < numCircles; i++) {
    const size = Math.random() * 10 + 10;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const animationDuration = Math.random() * 5 + 5;
    const delay = Math.random();
    circleData.push({size, x, y, animationDuration, delay});
  }
  return circleData;
};

const Circles = () => {
  const {user} = UseTg();
  const circles: number = user?.id ? 50 : 30;
  const [numCircles, setNumCircles] = useState(circles);
  const [circleData, setCircleData] = useState<Circle[]>([]);

  useEffect(() => {
    setCircleData(generateRandomCircleData(numCircles));
  }, [numCircles]);

  return (
    <div className={user?.id ? 'background' : 'backround-desk'}>
      {circleData.map((circle, index) => (
        <div
          key={index}
          className={user?.id ? 'circle' : 'circle-desk'}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            animationDuration: `${circle.animationDuration}s`,
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Circles;
