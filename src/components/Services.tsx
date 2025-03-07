
import React from 'react';
import { useIntersectionObserver, useScrollReveal } from '@/hooks/useAnimations';
import { Layers, Globe, Monitor, Camera, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`glass-card p-6 flex flex-col h-full transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-3 mb-4 bg-gray-50 rounded-md inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <a 
        href="#contact" 
        className="mt-auto inline-flex items-center text-sm font-medium hover:underline"
      >
        Learn more <ArrowRight className="ml-1 h-3 w-3" />
      </a>
    </div>
  );
};

const Services: React.FC = () => {
  useScrollReveal();
  
  const services = [
    {
      icon: <Layers className="h-6 w-6" />,
      title: "3D Modeling & Rendering",
      description: "Transform concepts into detailed 3D models with realistic textures, materials, and lighting for immersive visual experiences."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Interactive Experiences",
      description: "Create engaging web-based 3D experiences that captivate users through intuitive interfaces and seamless interactions."
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Motion Design",
      description: "Bring static designs to life with fluid animations, transitions, and visual effects that enhance storytelling and engagement."
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "AR/VR Development",
      description: "Develop immersive augmented and virtual reality experiences that blur the line between digital and physical worlds."
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative bg-gradient-subtle">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-black/10 bg-white/80 backdrop-blur-sm mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Transforming ideas into digital experiences
          </h2>
          <p className="text-gray-600">
            We specialize in creating immersive digital experiences that engage audiences and bring brands to life through innovative design and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
