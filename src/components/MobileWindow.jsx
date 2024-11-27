// src/components/MobileWindow.jsx
import React from 'react';

const MobileWindow = ({ title, children, onClose }) => {
    return (
        <div className="mobile-window">
            <div className="mobile-title-bar">
                <div className="mobile-title-text">{title}</div>
                <button className="mobile-close-button" onClick={onClose}>×</button>
            </div>
            <div className="mobile-window-body">
                {children}
            </div>
        </div>
    );
};

export default MobileWindow;