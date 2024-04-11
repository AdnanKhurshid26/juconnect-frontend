import React, { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import PageNotFound from './PageNotFound';


const LoadingScreen = () => {
  const [redirectToNotFound, setRedirectToNotFound] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRedirectToNotFound(true);
    }, 30000); // 600000 milliseconds = 10 minutes

    return () => clearTimeout(timeout); // Clear timeout on unmount or when component re-renders
  }, []);

  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  const pageStyle = {
    backgroundColor: 'rgba(255, 165, 0, 0.5)' // Orange color with 50% transparency
  };

  const logoContainerStyle = {
    position: 'relative'
  };

  const logoStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%'
  };

  const spinnerOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Adjust opacity and color as needed
  };

  if (redirectToNotFound) {
    return <PageNotFound />;
  }

  return (
    <div style={pageStyle}>
      <div style={spinnerContainerStyle}>
        <div style={logoContainerStyle}>
          <img src={require("../assets/logo.png")} alt="Logo" style={logoStyle} />
          <div style={spinnerOverlayStyle}>
            <TailSpin
              type="TailSpin"
              color="#FFA500"
              height={130}
              width={130}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
