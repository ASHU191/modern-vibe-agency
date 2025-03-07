
import React from 'react';
import { useIntersectionObserver, useScrollReveal, useParallax } from '@/hooks/useAnimations';

const About: React.FC = () => {
  useScrollReveal();
  const parallaxBg = useParallax(0.1);
  
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300"
    },
    {
      name: "Sarah Chen",
      role: "3D Artist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300"
    },
    {
      name: "Michael Rodriguez",
      role: "Technical Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div 
        ref={parallaxBg}
        className="absolute top-0 right-0 w-1/2 h-1/2 bg-gray-50 rounded-full opacity-70 transform translate-x-1/4 -translate-y-1/4"
      ></div>
      
      <div className="container mx-auto max-w-screen-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-black/10 bg-white/80 backdrop-blur-sm mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Pushing the boundaries of digital design
            </h2>
            <p className="text-gray-600 mb-6">
              Founded in 2018, Cubic is a design studio specializing in 3D digital experiences. We're a team of designers, developers, and creative technologists passionate about crafting immersive and innovative digital experiences.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to blend cutting-edge technology with thoughtful design to create memorable experiences that engage, inspire, and transform how people interact with brands and products in the digital space.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <span className="block text-3xl font-bold mb-1">5+</span>
                <span className="text-sm text-gray-500">Years of Experience</span>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <span className="block text-3xl font-bold mb-1">50+</span>
                <span className="text-sm text-gray-500">Projects Completed</span>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <span className="block text-3xl font-bold mb-1">20+</span>
                <span className="text-sm text-gray-500">Happy Clients</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 reveal">
              <h3 className="text-xl font-semibold mb-6">Meet our team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {teamMembers.map((member, index) => (
                  <TeamMember 
                    key={index}
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    delay={index * 100}
                  />
                ))}
              </div>
            </div>
            
            {/* Background patterns */}
            <div className="absolute w-48 h-48 bg-gray-50 rounded-full -bottom-10 -left-10 z-0"></div>
            <div className="absolute w-24 h-24 bg-gray-100 rounded-full top-10 right-10 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-square overflow-hidden rounded-lg mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
};

export default About;
