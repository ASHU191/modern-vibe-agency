
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Background 3D Canvas */}
      <ThreeCanvas className="opacity-50" />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-black/10 bg-white/80 backdrop-blur-sm animate-fade-in">
                Innovative 3D Design Agency
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight animate-fade-in">
              We craft digital <span className="text-gradient">experiences</span> that inspire & engage
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg animate-fade-in animation-delay-200">
              Transforming ideas into immersive digital realities through innovative 3D design, motion graphics, and interactive experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
              <a 
                href="#works" 
                className="px-6 py-3 bg-black text-white rounded-full flex items-center justify-center transition-all hover:bg-gray-900"
              >
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              
              <a 
                href="#contact" 
                className="px-6 py-3 border border-black/10 rounded-full flex items-center justify-center hover:bg-black/5 transition-all"
              >
                Get in Touch
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full glass-card p-4 overflow-hidden animate-float">
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-[80%] h-[80%]">
                  {/* Abstract 3D shape representation */}
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <div className="w-36 h-36 bg-white rounded-full shadow-xl animate-pulse-soft"></div>
                    <div className="absolute w-32 h-32 bg-gray-50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute w-28 h-28 border-4 border-gray-200 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gray-50 rounded-full z-[-1] opacity-70"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-gray-100 rounded-full z-[-1] opacity-50"></div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animation-delay-600">
          <span className="text-xs font-medium mb-2">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-black/20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
