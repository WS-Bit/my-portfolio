import React, { useState, useEffect } from 'react';
import StartMenu from './StartMenu'; // Import the StartMenu component

const Taskbar = () => {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000); // Update every minute
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const toggleStartMenu = () => {
        setIsStartMenuOpen((prev) => !prev);
    };

    return (
        <div className="taskbar">
            <div
                className="start-button"
                onClick={toggleStartMenu}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleStartMenu()}
            >
                <img src="/icons/startbutton.png" alt="Start" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
                Start
            </div>
            {isStartMenuOpen && <StartMenu onClose={toggleStartMenu} />} {/* Pass toggle function */}
            <div className="time">{currentTime}</div>
        </div>
    );
};

export default Taskbar;
