import React, { useState, useCallback, useRef } from 'react';
import Draggable from 'react-draggable';
import MobileWindow from './MobileWindow';

const Window = ({ title, children, onClose }) => {
    const [size, setSize] = useState({ width: 600, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile] = useState(window.innerWidth <= 768);
    const [zIndex, setZIndex] = useState(1);
    const nodeRef = useRef(null);

    if (isMobile) {
        return <MobileWindow title={title} onClose={onClose}>{children}</MobileWindow>;
    }

    // Calculate a random position within a reasonable area of the screen
    const getInitialPosition = () => {
        // Each new window starts 20px offset from previous
        const windowCount = document.querySelectorAll('.window').length;
        return {
            x: 200 + (windowCount * 20),
            y: -100 + (windowCount * 20)
        };
    };

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

    const bringToFront = useCallback(() => {
        const allWindows = document.querySelectorAll('.window');
        let maxZ = 0;
        allWindows.forEach(win => {
            const z = parseInt(win.style.zIndex || '0');
            maxZ = Math.max(maxZ, z);
        });
        setZIndex(maxZ + 1);
    }, []);

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
                    width: `${size.width}px`,
                    height: `${size.height}px`,
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
                <div className="window-body">
                    {children}
                </div>
                <div className="resizer" onMouseDown={startResize} />
            </div>
        </Draggable>
    );
};

export default Window;