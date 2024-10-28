import React, { useState } from 'react';
import './styles/Win98.css';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import Icon from './components/Icon';
import { AboutMe, Projects, Contact } from './components/WindowContents';
import '98.css';

const App = () => {
  const [openWindows, setOpenWindows] = useState([]);

  const windowContents = {
    'About Me': <AboutMe />,
    'Projects': <Projects />,
    'Contact': <Contact />
  };

  const handleOpenWindow = (title) => {
    if (!openWindows.some(window => window.title === title)) {
      setOpenWindows((prev) => [...prev, { title, id: Date.now() }]);
    }
  };

  const handleCloseWindow = (id) => {
    setOpenWindows((prev) => prev.filter(window => window.id !== id));
  };

  return (
    <div className="win98-portfolio" style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Desktop>
        <Icon
          icon="mycomputer"
          label="About Me"
          onClick={() => handleOpenWindow('About Me')}
        />
        <Icon
          icon="folder"
          label="Projects"
          onClick={() => handleOpenWindow('Projects')}
        />
        <Icon
          icon="msie"
          label="Contact"
          onClick={() => handleOpenWindow('Contact')}
        />

        {openWindows.map((window) => (
          <Window
            key={window.id}
            title={window.title}
            onClose={() => handleCloseWindow(window.id)}
          >
            {windowContents[window.title]}
          </Window>
        ))}
      </Desktop>
      <Taskbar />
    </div>
  );
};

export default App;