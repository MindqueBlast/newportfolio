const portfolioData = {
    projects: [
        {
            title: "TerraWatch",
            description: "A full-stack geospatial analytics platform that detects environmental changes using real Sentinel-2 satellite imagery from the Microsoft Planetary Computer. Users can select any region in the world, compare historical and current imagery through NDVI analysis, and visualize vegetation loss or gain. The backend uses asynchronous tile-based processing, intelligent disk caching, and progressive streaming to efficiently analyze large geographic regions while maintaining a responsive user experience.",
            tags: ["Geospatial", "Satellite Data", "Environmental"],
            tech: ["Next.js", "React", "FastAPI", "Python", "Leaflet", "Microsoft Planetary Computer", "pystac-client", "odc-stac", "xarray", "SciPy", "diskcache"],
            linkText: "Live Demo",
            link: "https://terra-watch-mu.vercel.app",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "1.1s",
            type: "hero-right"
        },
        {
            title: "Relativistic Black Hole Ray Tracer",
            description: "An interactive WebGL simulation that visualizes how light propagates around a Schwarzschild black hole by numerically integrating null geodesics in curved spacetime. The renderer performs real-time GPU ray tracing to simulate gravitational lensing, Einstein rings, gravitational redshift, relativistic Doppler beaming, and accretion disk rendering, while an educational dashboard allows users to explore the underlying physics through interactive controls and real-time visualization.",
            tags: ["Physics", "Computer Graphics", "Simulation"],
            tech: ["JavaScript", "Vite", "Three.js", "WebGL", "GLSL", "GPU Shaders"],
            linkText: "Live Demo",
            link: "[https://black-hole-raytracer.vercel.app]",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "1.2s",
            type: "hero-right"
        },
        {
            title: "City Crisis Simulation Dashboard",
            description: "An interactive real-time simulation tool that models how failures propagate through a city’s infrastructure network using graph theory. Users can run different scenarios such as power grid failures, floods, or disease spread and observe how interconnected systems like transport, healthcare, and energy influence cascading effects. Built as a full-stack system with a Python backend simulation engine and a real-time web visualization frontend.",
            tags: ["Simulation", "Systems", "Real-time"],
            tech: ["Python", "NetworkX", "FastAPI", "JavaScript", "Canvas", "WebSockets", "HTML/CSS"],
            linkText: "Live Simulation",
            link: "https://city-crisis-simulator.vercel.app/",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "1.0s",
            type: "hero-right"
        },

        {
            title: "Debate Elo Tracker",
            description: "A full-stack MERN application for tracking competitive debate performance in real time. Features dynamic rankings, analytics visualizations, tournament management, and Elo history computation.",
            tags: ["Full-stack", "Data", "Real-time"],
            tech: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
            linkText: "Project View",
            link: "https://mindqueblast.github.io/debate-elo-tracker/",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "0.1s",
            type: "hero-right"
        },
        {
            title: "Fullstack Chat App",
            description: "A real-time chat application built with MERN stack supporting multiple rooms, user authentication, and live message updates.",
            tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
            linkText: "Project View",
            link: "https://mern-fullstack-chat-app-1ihp.onrender.com",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.2s",
            type: "standard"
        },
        {
            title: "Webcraft Academy",
            description: "A demo website teaching web development concepts with interactive examples and structured lessons for beginners.",
            tech: ["HTML", "CSS", "JavaScript", "React"],
            linkText: "Visit Site",
            link: "https://khanacademy.org/cs/i/5407525888114688",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.3s",
            type: "standard"
        },
        {
            title: "Unity Game Development",
            description: "A 3D Unity game developed to explore game mechanics, physics, and interactive design.",
            tech: ["Unity", "C#"],
            linkText: "Project Demo",
            link: "#",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "0.4s",
            type: "hero-left"
        },
        {
            title: "ProcessingJS Games",
            description: "Created multiple games on Khan Academy: a Dino platformer, a top-down zombie shooter, and other interactive demos.",
            tech: ["ProcessingJS", "JavaScript"],
            linkText: "Play Games",
            link: "https://www.khanacademy.org/profile/kaid_336884561727810616466311/",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.5s",
            type: "standard"
        },
        {
            title: "VEX Science Olympiad Robot",
            description: "Programmed a VEX robot with PID algorithms for precise driving, strafing, and turning, used in competitive robotics events.",
            tech: ["C++", "PID Control", "Robotics"],
            linkText: "Robot Demo",
            link: "https://github.com/MindqueBlast/vex25-26",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.6s",
            type: "standard"
        },
        {
            title: "Arduino Paper Folder Sorter",
            description: "Built a tiny Arduino-controlled paper sorter using a webcam to detect Lucky Charms vs. Marshmallows, automating sorting tasks.",
            tech: ["Arduino", "Python", "Computer Vision"],
            linkText: "Project Details",
            link: "#",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.7s",
            type: "standard"
        },
        {
            title: "Foam RC Airplane",
            description: "Designed and constructed a functional foam RC airplane for recreational and educational purposes, experimenting with aerodynamics.",
            tech: ["Mechanical Design", "Electronics"],
            linkText: "Project View",
            link: "#",
            colSpan: "md:col-span-6 lg:col-span-4",
            delay: "0.8s",
            type: "standard"
        },
        {
            title: "Python Drone Navigation",
            description: "Coded a drone in Python capable of searching for a landing pad and performing an automated landing sequence.",
            tech: ["Python", "Computer Vision", "Drone Control"],
            linkText: "Project Demo",
            link: "#",
            colSpan: "md:col-span-6 lg:col-span-8",
            delay: "0.9s",
            type: "hero-left"
        }
    ],
    skills: [
        {
            category: "Programming",
            icon: "terminal",
            items: ["Python", "ProcessingJS", "Java", "ReactJS", "NodeJS", "C#", "HTML", "CSS"],
            isSecondary: false
        },
        {
            category: "AI & Machine Learning",
            icon: "analytics",
            items: ["PyTorch", "TensorFlow", "ML Pipelines", "Data Modeling", "Agentic Development"],
            isSecondary: false
        },
        {
            category: "Systems & Hardware",
            icon: "memory",
            items: ["Raspberry Pi", "Arduino", "RTOS", "VEX Robotics"],
            isSecondary: false
        },
        {
            category: "Analytical & Design",
            icon: "architecture",
            items: ["System Design", "UX Strategy", "Data Visualization", "Game Logic"],
            isSecondary: true
        }
    ],
    awards: [
        {
            badge: "Winner",
            title: "Khan Academy Programming Competitions",
            description: "Won multiple competitions for games and interactive projects built using ProcessingJS.",
            type: "Computer Science"
        },
        {
            badge: "Distinguished Honorable Mention",
            title: "Berkeley Math Tournament",
            description: "Awarded for Algebra",
            type: "Math"
        },
        {
            badge: "Honorable Mention",
            title: "Stanford Math Tournament",
            description: "Awarded for Algebra.",
            type: "Math"
        },
        {
            badge: "Silver Award",
            title: "American Mathematics Olympiad",
            description: "Recognized for outstanding achievement in national mathematics competitions.",
            type: "Math"
        },
        {
            badge: "Prize Award",
            title: "Australian Mathematics Competition",
            description: "Placed in the top 0.3% of participants internationally.",
            type: "Math"
        },
        {
            badge: "1st Place",
            title: "Bungee Drop - Regional Science Olympiad",
            description: "Won first place at the regional Science Olympiad competition.",
            type: "Science"
        },
        {
            badge: "1st Place",
            title: "Astronomy - Regional Science Olympiad",
            description: "Won first place at the regional Science Olympiad competition.",
            type: "Science"
        },
        {
            badge: "5th Place",
            title: "Robot Tour - Regional Science Olympiad",
            description: "Placed fifth at the regional Science Olympiad competition, showcasing robotics and PID control skills.",
            type: "Science"
        },
        {
            badge: "2nd Place",
            title: "Water Quality - Regional Science Olympiad",
            description: "Placed second at the regional Science Olympiad competition with hands-on environmental analysis and data collection.",
            type: "Science"
        },
        {
            badge: "3rd Place",
            title: "Experimental Design - Regional Science Olympiad",
            description: "Placed third at the regional Science Olympiad competition for designing and testing a novel experiment.",
            type: "Science"
        },
        {
            badge: "5th Place",
            title: "Astronomy - New York State Science Olympiad",
            description: "Placed fifth in the state-level Astronomy competition, demonstrating advanced understanding of celestial events.",
            type: "Science"
        }

    ],
    timeline: [
        {
            year: "2017",
            title: "Started Coding",
            description: "Learned programming on Khan Academy at age 7, experimenting with basic interactive graphics.",
            style: "standard"
        },
        {
            year: "2019",
            title: "Completed All Courses",
            description: "Finished every programming course on Khan Academy and started building custom games for fun.",
            style: "standard"
        },
        {
            year: "2020-2022",
            title: "Game Development & Competitions",
            description: "Created multiple games, won a few competitions, and migrated to advanced learning platforms like Pluralsight and YouTube tutorials.",
            style: "standard"
        },
        {
            year: "2023-2024",
            title: "Hardware Experiments",
            description: "Started experimenting with Arduinos, wiring projects, and robotics, building small machines and automation tools.",
            style: "standard"
        },
        {
            year: "Summer 2025",
            title: "AI & Machine Learning",
            description: "Focused on AI and machine learning, including fine-tuning LLaMA models and exploring neural network applications.",
            style: "standard"
        },
        {
            year: "2025-2026",
            title: "Intense Robotics & Fullstack",
            description: "Started developing more complex robotics systems and MERN Applications.",
            style: "future"
        }
    ]
};