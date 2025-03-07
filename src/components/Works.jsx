
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
      title: "E-commerce Platform",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
      description: "Modern e-commerce solution with seamless checkout and inventory management"
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000",
      description: "Complete redesign of a corporate website with improved UX and performance"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      category: "App Development",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000",
      description: "Secure and intuitive mobile banking application with real-time notifications"
    },
    {
      id: 4,
      title: "Health & Fitness Platform",
      category: "Web Application",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000",
      description: "Comprehensive health tracking platform with user dashboard and progress analytics"
    },
    {
      id: 5,
      title: "Restaurant Booking System",
      category: "WordPress",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000",
      description: "Custom WordPress solution with integrated booking and customer management"
    },
    {
      id: 6,
      title: "Fashion Retail Store",
      category: "Shopify",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000",
      description: "High-conversion Shopify store with custom theme and product showcasing"
    }
  ];

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Web Development', value: 'Web Development' },
    { label: 'App Development', value: 'App Development' },
    { label: 'WordPress', value: 'WordPress' },
    { label: 'Shopify', value: 'Shopify' },
    { label: 'Web Application', value: 'Web Application' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="works" className="py-24 px-6 md:px-12 relative bg-blue-gradient">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-16 max-w-2xl reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm mb-4 blue-accent">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Projects that deliver results
          </h2>
          <p className="text-gray-600">
            Browse our collection of successful projects that have helped businesses establish 
            their digital presence and achieve their goals.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 reveal overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                activeFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-blue-50 border border-blue-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
      className={`group relative overflow-hidden rounded-xl transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <span className="text-xs font-medium tracking-wider px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-2">
            {project.category}
          </span>
          <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
          <p className="text-sm text-white/90 mb-4">{project.description}</p>
          <a href="#" className="inline-flex items-center text-sm font-medium text-white hover:text-blue-100">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-b-xl border border-blue-50">
        <span className="text-xs font-medium text-blue-600">{project.category}</span>
        <h3 className="text-lg font-semibold mt-1">{project.title}</h3>
      </div>
    </div>
  );
};

export default Works;
