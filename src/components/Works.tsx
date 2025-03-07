
import React, { useState } from 'react';
import { useIntersectionObserver, useScrollReveal } from '@/hooks/useAnimations';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const Works: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Immersive Product Visualization",
      category: "3D Modeling",
      image: "https://images.unsplash.com/photo-1633467067670-47ab1b34fe9a?q=80&w=1000",
      description: "Interactive 3D product configurator for a luxury watch brand"
    },
    {
      id: 2,
      title: "Architectural Visualization",
      category: "Rendering",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000",
      description: "Photorealistic renderings for a high-end residential development"
    },
    {
      id: 3,
      title: "Virtual Gallery Experience",
      category: "Interactive",
      image: "https://images.unsplash.com/photo-1573221566340-81bdde00e00b?q=80&w=1000",
      description: "Web-based virtual art gallery with interactive elements"
    },
    {
      id: 4,
      title: "Brand Motion Identity",
      category: "Motion",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000",
      description: "Animated brand identity system for a tech startup"
    }
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: '3D Modeling', value: '3D Modeling' },
    { label: 'Rendering', value: 'Rendering' },
    { label: 'Interactive', value: 'Interactive' },
    { label: 'Motion', value: 'Motion' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="works" className="py-24 px-6 md:px-12 relative">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-16 max-w-2xl reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-black/10 bg-white/80 backdrop-blur-sm mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Selected works
          </h2>
          <p className="text-gray-600">
            Explore our portfolio of innovative projects that showcase our expertise in 3D design, motion graphics, and interactive experiences.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 reveal">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === filter.value
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`group relative overflow-hidden rounded-lg transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="text-xs font-medium tracking-wider px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-2">
            {project.category}
          </span>
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="text-sm text-white/80 mb-4">{project.description}</p>
          <a href="#" className="inline-flex items-center text-sm font-medium">
            View Project <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
      
      <div className="p-4">
        <span className="text-xs font-medium text-gray-500">{project.category}</span>
        <h3 className="text-lg font-semibold mt-1">{project.title}</h3>
      </div>
    </div>
  );
};

export default Works;
