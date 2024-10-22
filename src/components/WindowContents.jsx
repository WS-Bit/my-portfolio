import React from 'react';

const AboutMe = () => {
    return (
        <div className="p-4">
            <h4 className="text-xl font-bold mb-4">About Me</h4><br />
            <div className="space-y-4">
                <p>Hello! I'm Will Sexton, a junior software engineer, passionate about code, infrastructure and design!</p><br />
                <div className="bg-gray-100 p-4 rounded">
                    <h4 className="font-bold mb-2">Skills</h4><br />
                    <ul className="list-disc pl-4">
                        <li>Knowledge in JavaScript, TypeScript and Python</li><br />
                        <li>React & Frontend Development</li><br />
                        <li>UI/UX Design</li><br />
                        <li>Backend Development using Python Django and Typescript with Express</li><br />
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
                        <a
                            href={project.deployedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-title text-blue-600 hover:underline block mb-3"
                        >
                            {project.title}
                        </a>
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={() => window.open(project.frontendUrl, '_blank')}
                                className="px-4 py-2 bg-gray-200 border-2 border-gray-400 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                            >
                                Frontend Repository
                            </button>
                            {project.backendUrl && (
                                <button
                                    onClick={() => window.open(project.backendUrl, '_blank')}
                                    className="px-4 py-2 bg-gray-200 border-2 border-gray-400 rounded shadow-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none"
                                >
                                    Backend Repository
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

    return (
        <div className="p-4">
            <h4 className="text-xl font-bold mb-4">Contact Me</h4><br />
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleEmailClick}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Email Me
                    </button>
                </div><br />
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleGitHubClick}
                        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
                        GitHub
                    </button>
                </div><br />
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleLinkedInClick}
                        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
                        LinkedIn
                    </button>
                </div><br />
            </div>
        </div>
    );
};

export { AboutMe, Projects, Contact };