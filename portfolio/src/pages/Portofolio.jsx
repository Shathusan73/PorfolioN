import React, { useEffect, useState, useCallback } from "react";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, ChevronDown, ChevronUp } from "lucide-react";
import projects from "../components/constants/ProjectDetails";

const techStacks = [
  { icon: 'https://cdn.simpleicons.org/html5', language: "HTML" },
  // { icon: 'https://cdn.simpleicons.org/css3', language: "CSS" },
  { icon: 'https://cdn.simpleicons.org/javascript', language: "JavaScript" },
  { icon: 'https://cdn.simpleicons.org/tailwindcss', language: "Tailwind CSS" },
  { icon: 'https://cdn.simpleicons.org/react', language: "ReactJS" },
  { icon: 'https://cdn.simpleicons.org/vite', language: "Vite" },
  { icon: 'https://cdn.simpleicons.org/nodedotjs', language: "Node JS" },
  { icon: 'https://cdn.simpleicons.org/bootstrap', language: "Bootstrap" },
  { icon: 'https://cdn.simpleicons.org/firebase', language: "Firebase" },
  { icon: 'https://cdn.simpleicons.org/mui', language: "Material UI" },
  { icon: 'https://cdn.simpleicons.org/vercel', language: "Vercel" },

];

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-4 py-2
      text-purple-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-gradient-to-r from-purple-900/30 to-indigo-900/30
      hover:from-purple-900/40 hover:to-indigo-900/40
      rounded-lg
      border 
      border-purple-500/20
      hover:border-purple-500/40
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      shadow-lg hover:shadow-purple-500/20
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "Show Less" : "Show More"}
      {isShowingMore ? (
        <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
      ) : (
        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      )}
    </span>
    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  </button>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-3 rounded-xl flex flex-col items-center justify-center
      transition-all duration-300
      ${active 
        ? "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10" 
        : "text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50"
      }
      relative overflow-hidden
    `}
  >
    <div className="relative z-10 flex flex-col items-center gap-2">
      <Icon className={`w-5 h-5 transition-all duration-300 ${active ? "text-purple-400 scale-110" : ""}`} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 animate-pulse"></div>
    )}
  </button>
);

export default function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);

  return (
    <div className="px-4 md:px-10 lg:px-20 w-full py-16 bg-gradient-to-b from-[#030014] to-[#0a0a1a] overflow-hidden" id="Portfolio">
      <div className="text-center pb-12" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-4xl md:text-5xl font-bold text-center mx-auto mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Explore my journey through projects. Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center gap-3 mb-8">
          <TabButton
            active={activeTab === 0}
            onClick={() => setActiveTab(0)}
            icon={Code}
            label="Projects"
          />
          <TabButton
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
            icon={Award}
            label="Certificates"
          />
          <TabButton
            active={activeTab === 2}
            onClick={() => setActiveTab(2)}
            icon={Boxes}
            label="Tech Stack"
          />
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Projects Tab */}
          <div 
            className={`transition-all duration-500 ${activeTab === 0 ? 'opacity-100 block' : 'opacity-0 hidden'}`}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "800" : index % 3 === 1 ? "1000" : "800"}
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="mt-8 flex justify-center">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </div>

          {/* Certificates Tab */}
          <div 
            className={`transition-all duration-500 ${activeTab === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Certificate items would go here */}
              <div className="text-center py-12 text-gray-400">
                <Award className="mx-auto w-12 h-12 mb-4 text-purple-400" />
                <p>Certificate showcase coming soon</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Tab */}
          <div 
            className={`transition-all duration-500 ${activeTab === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                  data-aos-duration={index % 3 === 0 ? "800" : index % 3 === 1 ? "1000" : "800"}
                >
                  <TechStackIcon 
                    TechStackIcon={stack.icon} 
                    Language={stack.language} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}