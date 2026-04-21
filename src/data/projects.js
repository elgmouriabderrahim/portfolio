import domGamificationImg from '@/assets/images/projects/dom-gamification.png';
import typingSpeedImg from '@/assets/images/projects/typingspeedgame.png';
import pixelQuestImg from '@/assets/images/projects/pixelquest.png';
import workSphereImg from '@/assets/images/projects/worksphere.png';
import blogSpaceImg from '@/assets/images/projects/blogspace.png';
import debriefingSystemImg from '@/assets/images/projects/debriefing-system.png';
import localMindImg from '@/assets/images/projects/localmind.png';
import easyColocImg from '@/assets/images/projects/easycoloc.png';
import localMindApiImg from '@/assets/images/projects/localmind-api.png';
import debriefingLaravelImg from '@/assets/images/projects/debriefing-laravel.png';
import ecoShopImg from '@/assets/images/projects/ecoshop.png';

export const projects = [
  {
    id: 1,
    title: 'Memory Game - DOM Gamification',
    image: domGamificationImg,
    description: 'Interactive memory card game built with JavaScript DOM manipulation. Includes score tracking, animations, and game logic.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'LocalStorage'],
    github: 'https://github.com/elgmouriabderrahim/brief4-Memory_Game',
    featured: true,
  },
  {
    id: 2,
    title: 'Typing Speed Game - DOM Gamification',
    image: typingSpeedImg,
    description: 'Typing speed test game measuring WPM and accuracy with real-time feedback and timer system.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'DOM Manipulation'],
    github: 'https://github.com/elgmouriabderrahim/brief4-Typing-Speed-Game',
    featured: false,
  },
  {
    id: 3,
    title: 'PixelQuest - Catalogue de Jeux Video',
    image: pixelQuestImg,
    description: 'Game discovery platform using RAWG API with filters, search, pagination, and favorites system.',
    techStack: ['JavaScript', 'Tailwind CSS', 'API', 'LocalStorage'],
    github: 'https://github.com/elgmouriabderrahim/Brief5-PixelQuest',
    featured: true,
  },
  {
    id: 4,
    title: 'WorkSphere - Virtual Workspace',
    image: workSphereImg,
    description: 'Interactive employee management system with drag & drop and role-based zone restrictions.',
    techStack: ['JavaScript', 'CSS Grid', 'Flexbox'],
    github: 'https://github.com/elgmouriabderrahim/brief6-WorkSphere',
    featured: false,
  },
  {
    id: 5,
    title: 'BlogSpace - MVC Blog System (PHP OOP)',
    image: blogSpaceImg,
    description: 'Custom PHP MVC blog system with routing, authentication, and MySQL database integration.',
    techStack: ['PHP', 'MySQL', 'MVC', 'OOP', 'PDO'],
    github: 'https://github.com/elgmouriabderrahim/blogSpace',
    featured: false,
  },
  {
    id: 6,
    title: 'Pedagogical Debriefing System',
    image: debriefingSystemImg,
    description: 'Educational platform for managing briefs, sprints, classes, and competency evaluations.',
    techStack: ['PHP', 'MVC', 'PostgreSQL', 'OOP'],
    github: 'https://github.com/elgmouriabderrahim/debriefing-system',
    featured: false,
  },
  {
    id: 7,
    title: 'LocalMind - Geo Q&A Platform',
    image: localMindImg,
    description: 'Laravel-based platform for geolocated questions and answers with authentication and roles.',
    techStack: ['Laravel', 'Eloquent', 'MVC', 'PostgreSQL'],
    github: 'https://github.com/elgmouriabderrahim/local-mind',
    featured: false,
  },
  {
    id: 8,
    title: 'EasyColoc - Colocation Management System',
    image: easyColocImg,
    description: 'Laravel SaaS for managing shared housing expenses, debts, and automated balance calculation.',
    techStack: ['Laravel', 'Eloquent ORM', 'Auth', 'MySQL'],
    github: 'https://github.com/elgmouriabderrahim/easyColoc',
    featured: true,
  },
  {
    id: 9,
    title: 'LocalMind API - Full Stack (Vue + Laravel)',
    image: localMindApiImg,
    description: 'REST API backend with Laravel Sanctum and Vue.js SPA frontend.',
    techStack: ['Laravel', 'Vue.js', 'Sanctum', 'REST API'],
    github: 'https://github.com/elgmouriabderrahim/local-mind-api-fullstack',
    featured: true,
  },
  {
    id: 10,
    title: 'Debriefing System - Laravel Advanced Version',
    image: debriefingLaravelImg,
    description: 'Advanced Laravel architecture using enums, policies, middleware, and clean service layers.',
    techStack: ['Laravel', 'Enums', 'Policies', 'Services', 'PostgreSQL'],
    github: 'https://github.com/elgmouriabderrahim/debriefing-system-laravel',
    featured: true,
  },
  {
    id: 11,
    title: 'EcoShop API - E-commerce Backend (Laravel)',
    image: ecoShopImg,
    description: 'E-commerce REST API with cart, orders, events, queues, stock management, and automated testing using Pest.',
    techStack: ['Laravel', 'Sanctum', 'Queues', 'Events', 'Pest', 'MySQL', 'REST API'],
    github: 'https://github.com/elgmouriabderrahim/EcoShop',
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);