import React, { useState } from 'react';

const Desktop = ({ children }) => {
    const [showRecycleBin, setShowRecycleBin] = useState(true);
    const [notepadContent, setNotepadContent] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);

    const handleDrag = () => {
        setDragCounter(prev => {
            if (prev + 1 > 5) {
                setShowEasterEgg(true);
                setTimeout(() => setShowEasterEgg(false), 3000);
                return 0;
            }
            return prev + 1;
        });
    };

    const handleRecycleBinClick = () => {
        setShowRecycleBin(false);
        setTimeout(() => setShowRecycleBin(true), 500);
    };

    return (
        <div className="desktop" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 28, // Height of taskbar
            overflow: 'hidden',
            backgroundColor: '#008080'
        }}>
            <div className="desktop-icons">
                {children}

                {showRecycleBin && (
                    <div
                        className="desktop-icon"
                        onClick={handleRecycleBinClick}
                        onDragEnd={handleDrag}
                    >
                        <img src="/icons/recyclebin.png" alt="Recycle Bin" />
                        <span>Recycle Bin</span>
                    </div>
                )}

                <div
                    className="desktop-icon"
                    onClick={() => setNotepadContent(!notepadContent)}
                >
                    <img src="/icons/notepad.png" alt="Read Me" />
                    <span>README.txt</span>
                </div>
            </div>
        </div>
    );
};

export default Desktop;