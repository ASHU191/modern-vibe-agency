
import React, { useRef, useEffect } from 'react';
import { useIntersectionObserver, useScrollReveal } from '@/hooks/useAnimations';
import { Layers, Globe, Database, Code, ShoppingBag, Search, ArrowRight, Smartphone } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, index }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add 3D hover effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const rotateY = (x - 0.5) * 10; // 10 degree rotation
      const rotateX = (y - 0.5) * -10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div 
        ref={cardRef}
        className="service-box h-full flex flex-col"
        style={{ 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transformStyle: 'preserve-3d' 
        }}
      >
        <div className="service-icon" style={{ transformStyle: 'preserve-3d' }}>
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2" style={{ transform: 'translateZ(15px)' }}>{title}</h3>
        
        <p className="text-gray-600 mb-4 flex-grow" style={{ transform: 'translateZ(10px)' }}>{description}</p>
        
        <a 
          href="#contact" 
          className="mt-auto inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-all group"
          style={{ transform: 'translateZ(15px)' }}
        >
          Learn more 
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
        
        {/* 3D decoration elements */}
        <div 
          className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-20"
          style={{
            background: `rgba(31, 66, 135, ${0.1 + (index % 3) * 0.05})`,
            transform: 'translateZ(-5px)',
            transformStyle: 'preserve-3d',
            animation: `float ${6 + index}s ease-in-out infinite`
          }}
        ></div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  useScrollReveal();
  
  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Development",
      description: "Custom responsive websites built with modern technologies that deliver exceptional user experiences and drive business results."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "App Development",
      description: "Native and cross-platform mobile applications that extend your digital presence and engage users on any device."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "WordPress Solutions",
      description: "Custom WordPress themes and plugins development that transform this powerful CMS into your perfect business platform."
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Shopify E-commerce",
      description: "Beautifully designed and highly functional Shopify stores that convert visitors into customers and boost your sales."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "SEO Optimization",
      description: "Strategic search engine optimization that improves your visibility, drives qualified traffic, and increases your online presence."
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Application",
      description: "Powerful, scalable web applications with robust backends and intuitive frontends that solve complex business challenges."
    }
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-screen-xl relative z-10">
        <div className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm mb-4 blue-accent">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Digital solutions for <span className="text-gradient">modern businesses</span>
          </h2>
          <p className="text-gray-600">
            We offer end-to-end digital services to help you establish a strong online presence, 
            engage your audience, and achieve your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Background 3D decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-50 opacity-50 animate-pulse-soft"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-100 opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-blue-200 opacity-20 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Services;
