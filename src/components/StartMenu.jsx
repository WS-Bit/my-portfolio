import React from 'react';
import Icon from './Icon';

const StartMenu = ({ onClose }) => {
    return (
        <div className="start-menu">
            <Icon
                icon="mycomputer"
                label="About Me"
                onClick={() => {
                    console.log('Open About Me');
                    onClose();
                }}
            />
            <Icon
                icon="folder"
                label="Projects"
                onClick={() => {
                    console.log('Open Projects');
                    onClose();
                }}
            />
            <Icon
                icon="msie"
                label="Contact"
                onClick={() => {
                    console.log('Open Contact');
                    onClose();
                }}
            />
            {/* Add more icons as needed */}
        </div>
    );
};

export default StartMenu;
