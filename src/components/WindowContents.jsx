import React, { useState } from 'react';

const AboutMe = () => {
    const [isPixelated, setIsPixelated] = useState(true);

    const togglePixelation = () => {
        setIsPixelated(!isPixelated);
    };

    const imageUrl = isPixelated
        ? "/me-tiny.jpg"  
        : "/me.jpeg";  

    return (
        <div className="p-4">
            <h4 className="text-xl font-bold mb-4">About Me</h4>
            <div className="space-y-4">
                <div className="profile-image-container">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className={isPixelated ? 'image-pixelated' : 'image-clear'}
                        onClick={togglePixelation}
                    />
                    <button onClick={togglePixelation}>
                        {isPixelated ? 'Click to enhance' : 'Click to pixelate'}
                    </button>
                </div><br /><br /><br />
                <p className="text-lg">Hello! I'm Will Sexton, a junior software engineer, passionate about code, infrastructure and design!</p>
                <div className="bg-gray-100 p-4 rounded window-style">
                    <h4 className="font-bold mb-2">Skills</h4>
                    <ul className="list-disc pl-4 space-y-2">
                        <p>Knowledge in JavaScript, TypeScript and Python</p>
                        <p>React & Frontend Development</p>
                        <p>UI/UX Design</p>
                        <p>Backend Development using Python Django and Typescript with Express</p>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <div className="p-4">
            <h4 className="text-xl font-bold mb-4">My Projects</h4><br />
            <div className="grid gap-4">
                {[
                    {
                        title: "Will's Wild Words",
                        deployedUrl: "https://ws-bit.github.io/wills-wild-words/",
                        frontendUrl: "https://github.com/WS-Bit/wills-wild-words",
                        description: "A Wordle clone built with Javascript/HTML/CSS",
                        tech: "Javascript, VSCode, Github"
                    },
                    {
                        title: "Brew Buddy",
                        deployedUrl: "https://brewbudddy.netlify.app/",
                        frontendUrl: "https://github.com/WS-Bit/brew-buddy",
                        description: "A React front-end using Open Brewery DB, an API containing information about worldwide breweries",
                        tech: "React, Vite, Javascript"
                    },
                    {
                        title: "Melody Memo",
                        deployedUrl: "https://melody-memo.netlify.app/",
                        frontendUrl: "https://github.com/WS-Bit/project-3-front-end",
                        backendUrl: "https://github.com/WS-Bit/project-3-back-end",
                        description: "A full-stack app, using a React front-end and a Typescript Express back-end, with the database stored on cloud using MongoDB",
                        tech: "React, Vite, Typescript, MongoDB"
                    },
                    {
                        title: "My Wedding Website",
                        deployedUrl: "https://wedding-front-end-ga.netlify.app/",
                        frontendUrl: "https://github.com/WS-Bit/wedding-project-4-front-end",
                        backendUrl: "https://github.com/WS-Bit/wedding-project-4-back-end",
                        description: "A full-stack app, using a React front-end and a Python Django REST-Framework back-end",
                        tech: "React, Vite, Typescript, Python, Django"
                    }
                ].map((project, index) => (
                    <div key={index} className="border p-3 rounded">
                        <h3 className="project-title text-blue-600 block mb-3">
                            {project.title}
                        </h3>
                        <div className="project-buttons">
                            <button onClick={() => window.open(project.deployedUrl, '_blank')}>
                                View Project
                            </button>
                            <button onClick={() => window.open(project.frontendUrl, '_blank')}>
                                View Frontend
                            </button>
                            {project.backendUrl && (
                                <button onClick={() => window.open(project.backendUrl, '_blank')}>
                                    View Backend
                                </button>
                            )}
                        </div>
                        <p>{project.description}</p>
                        <p className="text-sm text-gray-600">Tech: {project.tech}</p><br />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Contact = () => {
    const handleEmailClick = () => {
        window.location.href = 'mailto:wmsexton@btinternet.com';
    };

    const handleGitHubClick = () => {
        window.open('https://github.com/WS-Bit', '_blank');
    };

    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/william-sexton-861a88154/', '_blank');
    };

    const buttonStyle = {
        width: '280px',
        height: '40px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px'
    };

    const iconStyle = {
        width: '24px',
        height: '24px',
        marginRight: '10px'
    };

    return (
        <div className="window-body">
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Me</h4>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px'
            }}>
                <button
                    onClick={handleEmailClick}
                    style={buttonStyle}
                >
                    <img
                        src="/icons/email.png"
                        alt="Email"
                        style={iconStyle}
                    />
                    Email Me
                </button>

                <button
                    onClick={handleGitHubClick}
                    style={buttonStyle}
                >
                    <img
                        src="/icons/github.png"
                        alt="GitHub"
                        style={iconStyle}
                    />
                    GitHub
                </button>

                <button
                    onClick={handleLinkedInClick}
                    style={buttonStyle}
                >
                    <img
                        src="/icons/linkedin.png"
                        alt="LinkedIn"
                        style={iconStyle}
                    />
                    LinkedIn
                </button>
            </div>
        </div>
    );
};

export { AboutMe, Projects, Contact };