import React, { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import '98.css'; // Importing 98.css styles

let highestZIndex = 1; // Global variable to track the highest z-index

const Window = ({ title, children, onClose }) => {
    const [size, setSize] = useState({ width: 600, height: 500 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zIndex, setZIndex] = useState(0); // Start z-index at 0
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        bringToFront(); // Set z-index when component mounts
    }, []);

    const startResize = useCallback((e) => {
        setIsResizing(true);
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
        e.preventDefault();
    }, []);

    const stopResize = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (e) => {
            if (isResizing) {
                const newWidth = size.width + (e.clientX - initialMousePosition.x);
                const newHeight = size.height + (e.clientY - initialMousePosition.y);
                setSize({
                    width: Math.max(newWidth, 300),
                    height: Math.max(newHeight, 300),
                });
                setInitialMousePosition({ x: e.clientX, y: e.clientY });
            }
        },
        [isResizing, size.width, size.height, initialMousePosition]
    );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };
    }, [isResizing, resize, stopResize]);

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    const bringToFront = () => {
        highestZIndex += 1; // Increment the global z-index counter
        setZIndex(highestZIndex); // Update the window's z-index
    };

    return (
        <Draggable handle=".title-bar" bounds="parent" position={position} onDrag={handleDrag}>
            <div
                className="window"
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                    zIndex: zIndex, // Apply the z-index
                    position: 'absolute'
                }}
                onMouseDown={bringToFront} // Bring the window to the front on click
            >
                <div className="title-bar">
                    <div className="title-bar-text">{title}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>
                <div
                    className="window-body"
                    style={{
                        overflow: 'auto',
                        padding: '10px',
                        height: 'calc(100% - 30px)'
                    }}
                >
                    {children}
                </div>
                <div className="resizer" onMouseDown={startResize} />
            </div>
        </Draggable>
    );
};

export default Window;
