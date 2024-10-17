import React from 'react';

const Icon = ({ icon, label, onClick }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClick();
        }
    };

    return (
        <div
            className="desktop-icon"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <img src={`/icons/${icon}.png`} alt={label} />
            <span>{label}</span>
        </div>
    );
};

export default Icon;
