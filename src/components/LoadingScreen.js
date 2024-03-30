import React from 'react';
import { Oval } from 'react-loader-spinner';

const LoadingScreen = () => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: 'rgba(100, 100, 100, 0.5)' /* Red color with some transparency */
      }}
    >
      <Oval
        color="#FF4500" // Orange color
        height={100}
        width={100}
        style={{
          position: 'relative',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: 'auto'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
