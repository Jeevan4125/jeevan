export const profile = {
  name: "Jeevan Kumar S",
  role: "Full Stack Developer",
  location: "Chennai, India",
  phone: "+91 8122544643",
  email: "jeevanskumar0512@gmail.com",
  linkedin: "https://www.linkedin.com/in/jeevan-kumar-s-74894b294",
  github: "https://github.com/Jeevan4125",
  summary:
    "Final-year AI & Data Science student building production-ready web applications and intelligent systems. Comfortable across the full stack: React.js and Node.js on the web, MongoDB and SQL databases underneath. Looking for a Full Stack role where I can turn data into interfaces people actually want to use.",
};

export const stats = [
  { value: "8.51", label: "CGPA", note: "up to 6th semester" },
  { value: "5", label: "Shipped projects", note: "web, desktop, ML, robotics, security" },
  { value: "8", label: "Certifications", note: "AI · Python · cloud" },
  { value: "2027", label: "Graduating", note: "B.Tech AI & DS" },
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "HTML5", "CSS3", "C"] },
  { group: "Databases", items: ["MySQL", "MongoDB", "SQLite", "Oracle Database", "Firebase Firestore"] },
  { group: "Frameworks & Tools", items: ["Firebase", "Git", "GitHub", "React.js", "Node.js", "Express.js", "Android Studio"] },
  { group: "Core Concepts", items: ["Data Structures And Algorithms", "DBMS", "Machine Learning", "REST API Development"] },
];

export const skillOrbit = [
  { name: "React.js", track: "web", icon: "react" },
  { name: "Node.js", track: "web", icon: "nodedotjs" },
  { name: "Express.js", track: "web", icon: "express" },
  { name: "JavaScript", track: "web", icon: "javascript" },
  { name: "HTML5", track: "web", icon: "html5" },
  { name: "CSS3", track: "web", icon: "css3" },
  { name: "Python", track: "data", icon: "python" },
  { name: "Machine Learning", track: "data", icon: "scikitlearn" },
  { name: "MongoDB", track: "data", icon: "mongodb" },
  { name: "Firebase Firestore", track: "data", icon: "firebase" },
  { name: "MySQL", track: "core", icon: "mysql" },
  { name: "SQLite", track: "core", icon: "sqlite" },
  { name: "DBMS", track: "core", icon: null },
  { name: "Data Structures And Algorithms", track: "core", icon: null },
  { name: "REST API Development", track: "core", icon: null },
  { name: "Git", track: "core", icon: "git" },
  { name: "GitHub", track: "core", icon: "github" },
  { name: "Java", track: "core", icon: "openjdk" },
];

export const projects = [
  {
    id: "workforge",
    name: "WORK-FORGE",
    subtitle: "Project Management System",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    description:
      "Team and task management platform built during the internship. Handles 5+ roles and 10+ tasks with real-time CRUD, permissioning, and status tracking. Designed a role-based access layer so admins, managers, and members each see a scoped view of the board, with live status updates propagating across the team without a page refresh.",
    highlights: [
      "Role-based access for admins, managers, and team members.",
      "Project and task CRUD with status tracking.",
      "Scoped board views based on each user's role.",
      "Live status updates without a page refresh.",
    ],
    metric: "5+ roles · 10+ tasks",
    link: "https://github.com/Jeevan4125",
    track: "web",
  },
  {
    id: "fraud-detection",
    name: "Fraud Detection System",
    subtitle: "Machine Learning Pipeline",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    description:
      "Detection pipeline for identifying fraudulent transactions in an imbalanced dataset, tuned and evaluated on precision-recall rather than raw accuracy. Applied resampling and feature engineering to counter class imbalance, then benchmarked multiple classifiers to land on a model that catches fraud without drowning the team in false positives.",
    highlights: [
      "Analyzes transaction data to identify patterns associated with fraud.",
      "Uses resampling and feature engineering to address class imbalance.",
      "Benchmarks multiple classifiers using precision and recall.",
      "Balances fraud detection with reducing false-positive alerts.",
    ],
    metric: "Precision–recall tuned",
    link: "https://github.com/Jeevan4125",
    track: "data",
  },
  {
    id: "autonomous-vehicles-robotics",
    name: "Autonomous Vehicles & Robotics",
    subtitle: "Perception & Control Simulation",
    stack: ["Python", "OpenCV", "NumPy", "Robotics"],
    description:
      "Simulation project exploring autonomous navigation — combining computer-vision perception with control logic so a virtual agent can sense its environment and react to it. Covers core building blocks of self-driving systems: lane/obstacle detection, path planning, and decision logic that closes the loop between sensing and movement.",
    highlights: [
      "Combines computer-vision perception with control logic in a simulation.",
      "Explores lane and obstacle detection for environmental awareness.",
      "Uses path planning to guide navigation.",
      "Connects sensing, decision-making, and movement in a perception-control loop.",
    ],
    metric: "Perception + control loop",
    link: "https://github.com/Jeevan4125/Autonomous-Vechiles-And-Robotics.git",
    track: "robotics",
  },
  {
    id: "phishing-url-scan",
    name: "Phishing URL Scan",
    subtitle: "Cybersecurity / ML Classifier",
    stack: ["Python", "Machine Learning", "Scikit-learn"],
    description:
      "A URL-analysis tool that flags likely phishing links before a user clicks them. Extracts lexical and structural features from a URL — length, special characters, domain patterns — and feeds them into a trained classifier to score how trustworthy a link actually is, aimed at catching threats that simple blocklists miss.",
    highlights: [
      "Extracts lexical and structural signals, including URL length and special characters.",
      "Examines domain patterns as part of the URL feature set.",
      "Uses a trained classifier to estimate whether a URL is trustworthy.",
      "Provides URL risk scoring to help identify suspicious links.",
    ],
    metric: "Real-time URL scoring",
    link: "https://github.com/Jeevan4125/Phishing-URL-Scan.git",
    track: "security",
  },
  {
    id: "c2x-desktop-ide",
    name: "C2X — AI-Powered Desktop IDE",
    subtitle: "Desktop Application / Developer Tools",
    stack: ["Desktop IDE", "Developer Tools", "AI-assisted workflow"],
    description:
      "An AI-powered desktop IDE designed around a modern coding workspace, with a focus on code editing, workspace management, AI assistance, and collaborative development.",
    highlights: [
      "Provides a desktop workspace for code editing and project work.",
      "Includes workspace-management capabilities.",
      "Integrates AI assistance into the development workflow.",
      "Focuses on supporting collaborative software development.",
    ],
    metric: "Desktop developer workspace",
    link: "https://github.com/Jeevan4125/codesync",
    track: "desktop",
    cta: "View on GitHub",
    thumbnail: true,
  },
];

export const certifications = [
  { name: "Artificial Intelligence", issuer: "Infosys", date: "July 2025" },
  { name: "Python for Data Science & AI", issuer: "IBM · Coursera", date: "July 2025" },
  { name: "Model Context Protocol", issuer: "Anthropic", date: "March 2026" },
  { name: "AWS AI & ML Fundamentals", issuer: "AWS Training and Certification", date: "July 28, 2025" },
  { name: "GitHub Copilot Fundamentals", issuer: "Microsoft", date: "August 5, 2025" },
  { name: "Artificial Intelligence Fundamentals", issuer: "IBM", date: "July 26, 2025" },
  { name: "Python for Data Science, AI & Development", issuer: "IBM", date: "July 2025" },
  { name: "Building Decision-Making Skills in the Age of AI", issuer: "LinkedIn · Microsoft", date: "November 8, 2024" },
];

export const achievements = [
  {
    title: "Hackathon Finalist",
    date: "23 Sep 2025",
    detail:
      "Selected as a finalist in the Intra-College Hackathon; team built a Job Recommendation System in a 24-hour development sprint.",
  },
  {
    title: "SQL Problem Solving",
    date: "HackerRank",
    detail: "Solved SQL problems on HackerRank, strengthening database querying and problem-solving skills.",
  },
];

export const education = [
  {
    degree: "B.Tech — Artificial Intelligence & Data Science",
    school: "Aalim Muhammed Salegh College of Engineering, Avadi",
    note: "Affiliated to Anna University",
    period: "2023 – 2027",
    detail: "CGPA: 8.51 (up to 6th semester)",
  },
  {
    degree: "Higher Secondary Certificate (Class XII)",
    school: "Bethel Matriculation Higher Secondary School, Chennai",
    note: "Tamil Nadu State Board",
    period: "2023",
    detail: "73.5%",
  },
];

export const softSkills = ["Problem Solving", "Team Collaboration", "Communication", "Adaptability"];

export const languages = ["English", "Tamil"];