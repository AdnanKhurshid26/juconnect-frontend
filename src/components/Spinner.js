import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const circleStyle = {
    border: '8px solid rgba(255, 165, 0, 0.8)',
    borderRadius: '50%',
    borderTop: '8px solid #ffffff',
    width: '100px',
    height: '100px',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={spinnerStyle}>
      <style>{keyframes}</style>
      <div style={circleStyle}></div>
    </div>
  );
};

export default Spinner;
