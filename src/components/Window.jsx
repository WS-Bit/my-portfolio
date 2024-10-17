import React, { useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';

const Window = ({ title, children, onClose }) => {
    const [size, setSize] = useState({ width: 400, height: 300 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

    const startResize = useCallback((e) => {
        setIsResizing(true);
        
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
        e.preventDefault();
    }, []);

    const stopResize = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e) => {
        if (isResizing) {
            const newWidth = size.width + (e.clientX - initialMousePosition.x);
            const newHeight = size.height + (e.clientY - initialMousePosition.y);
            setSize({
                width: Math.max(newWidth, 100), // Minimum width
                height: Math.max(newHeight, 100), // Minimum height
            });
            setInitialMousePosition({ x: e.clientX, y: e.clientY }); // Update the initial position
        }
    }, [isResizing, size.width, size.height, initialMousePosition]);

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

    return (
        <Draggable
            handle=".title-bar"
            bounds="parent"
            position={position}
            onDrag={handleDrag}
        >
            <div className="window" style={{ width: `${size.width}px`, height: `${size.height}px` }}>
                <div className="title-bar">
                    <span className="title">{title}</span>
                    <button className="close-button" onClick={onClose}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                            <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
                <div className="window-content">{children}</div>
                <div
                    className="resizer"
                    onMouseDown={startResize}
                />
            </div>
        </Draggable>
    );
};

export default Window;
