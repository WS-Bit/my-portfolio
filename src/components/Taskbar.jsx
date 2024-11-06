import React, { useState, useEffect, useRef } from 'react';
import StartMenu from './StartMenu';

const TaskbarClock = () => {
    const [showDatePopup, setShowDatePopup] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const clockRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        const handleClickOutside = (event) => {
            if (clockRef.current && !clockRef.current.contains(event.target)) {
                setShowDatePopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            clearInterval(timer);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div
            ref={clockRef}
            className="taskbar-clock"
            onClick={() => setShowDatePopup(!showDatePopup)}
        >
            <div className="time-display">
                {formatTime(dateTime)}
            </div>

            {showDatePopup && (
                <div className="date-popup">
                    <div className="date-header">
                        {dateTime.toLocaleDateString([], {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    <div className="time-large">
                        {dateTime.toLocaleTimeString([], {
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const Taskbar = ({ handleOpenWindow }) => {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    const toggleStartMenu = () => {
        setIsStartMenuOpen(!isStartMenuOpen);
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
                <img
                    src="/icons/startbutton.png"
                    alt="Start"
                    style={{ width: '16px', height: '16px', marginRight: '5px' }}
                />
                Start
            </div>
            {isStartMenuOpen && (
                <StartMenu
                    onClose={toggleStartMenu}
                    handleOpenWindow={handleOpenWindow}
                />
            )}
            <div className="taskbar-middle"></div>
            <TaskbarClock />
        </div>
    );
};

export default Taskbar;