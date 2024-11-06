import React, { useState, useCallback, useRef } from 'react';
import Draggable from 'react-draggable';
import '98.css';

const Window = ({ title, children, onClose }) => {
    const [size, setSize] = useState({ width: 600, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [zIndex, setZIndex] = useState(1);
    const nodeRef = useRef(null);

    // Calculate a random position within a reasonable area of the screen
    const getInitialPosition = () => {
        const maxOffset = 300; // Maximum random offset
        const baseX = 40; // Base X position from left
        const baseY = -60; // Base Y position from top

        return {
            x: baseX + Math.random() * maxOffset,
            y: baseY + Math.random() * maxOffset
        };
    };

    const startResize = useCallback((e) => {
        if (!isMobile) {
            setIsResizing(true);
            setInitialMousePosition({ x: e.clientX, y: e.clientY });
            e.preventDefault();
        }
    }, [isMobile]);

    const stopResize = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (e) => {
            if (isResizing && !isMobile) {
                const newWidth = size.width + (e.clientX - initialMousePosition.x);
                const newHeight = size.height + (e.clientY - initialMousePosition.y);
                setSize({
                    width: Math.max(newWidth, 300),
                    height: Math.max(newHeight, 300),
                });
                setInitialMousePosition({ x: e.clientX, y: e.clientY });
            }
        },
        [isResizing, size.width, size.height, initialMousePosition, isMobile]
    );

    React.useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResize);
        };
    }, [isResizing, resize, stopResize]);

    const bringToFront = useCallback(() => {
        const allWindows = document.querySelectorAll('.window');
        let maxZ = 0;
        allWindows.forEach(win => {
            const z = parseInt(win.style.zIndex || '0');
            maxZ = Math.max(maxZ, z);
        });
        setZIndex(maxZ + 1);
    }, []);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".title-bar"
            defaultPosition={getInitialPosition()}
            onStart={bringToFront}
            bounds=".desktop"
        >
            <div
                ref={nodeRef}
                className="window"
                style={{
                    width: isMobile ? '90vw' : `${size.width}px`,
                    height: isMobile ? '80vh' : `${size.height}px`,
                    position: 'absolute',
                    zIndex: zIndex,
                }}
                onMouseDown={bringToFront}
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
                        padding: '15px',
                        height: 'calc(100% - 30px)',
                        fontSize: isMobile ? '16px' : '18px'
                    }}
                >
                    {children}
                </div>
                {!isMobile && <div className="resizer" onMouseDown={startResize} />}
            </div>
        </Draggable>
    );
};

export default Window;