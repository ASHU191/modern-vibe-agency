
import React from 'react';
import { useIntersectionObserver, useScrollReveal } from '@/hooks/useAnimations';
import { Layers, Globe, Database, Code, ShoppingBag, Search, ArrowRight, Smartphone } from 'lucide-react';

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
      className={`service-box transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="service-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <a 
        href="#contact" 
        className="mt-auto inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
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
    <section id="services" className="py-24 px-6 md:px-12 relative bg-gradient-subtle">
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm mb-4 blue-accent">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Comprehensive web solutions for your business
          </h2>
          <p className="text-gray-600">
            We offer end-to-end digital services to help you establish a strong online presence, 
            engage your audience, and achieve your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
