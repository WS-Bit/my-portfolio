import React, { useState } from 'react';
import './styles/Win98.css';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import Icon from './components/Icon';

const App = () => {
  const [openWindows, setOpenWindows] = useState([]); // Manage visibility of multiple windows

  const handleOpenWindow = (title) => {
    setOpenWindows((prev) => [...prev, { title, id: Date.now() }]); // Add a new window with a unique ID
  };

  const handleCloseWindow = (id) => {
    setOpenWindows((prev) => prev.filter(window => window.id !== id)); // Close the window by ID
  };

  return (
    <div className="win98-portfolio">
      <Desktop>
        <Icon icon="mycomputer" label="About Me" onClick={() => handleOpenWindow('About Me')} />
        <Icon icon="folder" label="Projects" onClick={() => handleOpenWindow('Projects')} />
        <Icon icon="msie" label="Contact" onClick={() => handleOpenWindow('Contact')} />

        {openWindows.map((window) => (
          <Window key={window.id} title={window.title} onClose={() => handleCloseWindow(window.id)}>
            <p>This is the {window.title} section.</p>
          </Window>
        ))}
      </Desktop>
      <Taskbar />
    </div>
  );
};

export default App;
