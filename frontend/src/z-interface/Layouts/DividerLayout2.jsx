import React, { useState, useRef } from 'react';
import './DividerLayout2.css'; // Import your CSS file

const DividerLayout2 = ({LeftColumn, RightColumn}) => {
  const containerRef = useRef(null);
  const [leftColumnWidth, setLeftColumnWidth] = useState('20%');
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      setLeftColumnWidth(`${(newWidth / containerRect.width) * 100}%`);
    }
  };

  return (

    <div
      className="container-columns"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="column" style={{ width: leftColumnWidth }}>
        {/* Content for the left column */}
        {LeftColumn}
      </div>
      <div className="divider" onMouseDown={handleMouseDown}>
        {/* Center-aligned border/divider */}
      </div>
      <div className="column" style={{ width: `calc(100% - ${leftColumnWidth})` }}>
        {/* Content for the right column */}
        {RightColumn}
      </div>
    </div>

  );
};

export default DividerLayout2;
