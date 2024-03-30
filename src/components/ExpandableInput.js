import React, { useRef, useEffect } from 'react';

const ExpandableInput = ({ className, value, onChange, readOnly }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    const scrollWidth = inputElement.scrollWidth;
    
    // Adding some extra width to account for padding and borders
    const newWidth = scrollWidth + 10;
    
    inputElement.style.width = `${newWidth}px`;
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={className}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      style={{
        overflow: 'auto',
        resize: 'none',
        width: 'auto', // Initial width
      }}
    />
  );
};

export default ExpandableInput;
