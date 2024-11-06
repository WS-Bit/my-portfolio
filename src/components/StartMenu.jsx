import React from 'react';

const StartMenu = ({ onClose, handleOpenWindow }) => {
    const menuItems = [
        {
            icon: 'mycomputer',
            label: 'About Me',
            onClick: () => {
                handleOpenWindow('About Me');
                onClose();
            }
        },
        {
            icon: 'folder',
            label: 'Projects',
            onClick: () => {
                handleOpenWindow('Projects');
                onClose();
            }
        },
        {
            icon: 'msie',
            label: 'Contact',
            onClick: () => {
                handleOpenWindow('Contact');
                onClose();
            }
        }
    ];

    const bottomMenuItems = [
        {
            icon: 'shutdown',
            label: 'Shut Down...',
            onClick: () => window.location.href = 'https://github.com/WS-Bit'
        }
    ];

    return (
        <div className="start-menu">
            <div className="start-menu-header">
                <div className="windows98-logo">
                    <span className="windows98-text">Will Sexton</span>
                    <span className="portfolio-text">Portfolio</span>
                </div>
            </div>

            <div className="start-menu-content">
                <div className="start-menu-items">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="start-menu-item"
                            onClick={item.onClick}
                        >
                            <img
                                src={`/icons/${item.icon}.png`}
                                alt={item.label}
                                className="start-menu-icon"
                            />
                            <span className="start-menu-label">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="start-menu-separator" />

                <div className="start-menu-bottom">
                    {bottomMenuItems.map((item, index) => (
                        <div
                            key={index}
                            className="start-menu-item shutdown-item"
                            onClick={item.onClick}
                        >
                            <img
                                src={`/icons/${item.icon}.png`}
                                alt={item.label}
                                className="start-menu-icon"
                            />
                            <span className="start-menu-label">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StartMenu;