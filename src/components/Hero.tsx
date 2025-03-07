
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Code, Globe, Database, Layers } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-6 md:px-12 overflow-hidden bg-blue-gradient"
    >
      {/* Background 3D Canvas */}
      <ThreeCanvas className="opacity-40" />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm animate-fade-in blue-accent">
                Premium Web Development Agency
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tight animate-fade-in">
              Transforming ideas into <span className="text-gradient">digital solutions</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg animate-fade-in animation-delay-200">
              We build cutting-edge websites, e-commerce platforms, and web applications that help businesses grow and succeed in the digital world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-300">
              <a 
                href="#works" 
                className="px-6 py-3 blue-gradient text-white rounded-full flex items-center justify-center transition-all hover:shadow-lg"
              >
                View Our Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              
              <a 
                href="#contact" 
                className="px-6 py-3 border border-blue-200 rounded-full flex items-center justify-center hover:bg-blue-50 transition-all"
              >
                Get in Touch
              </a>
            </div>

            {/* Quick service indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 animate-fade-in animation-delay-400">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Web Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">App Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">WordPress</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Shopify</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full blue-glass-card p-4 overflow-hidden animate-float">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-[80%] h-[80%]">
                  {/* Abstract code representation */}
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <div className="code-snippet w-full max-w-[240px] text-left">
                      <span className="code-line"><span className="code-keyword">const</span> <span>website</span> = <span className="code-keyword">new</span> <span>Website</span>({`{`}</span>
                      <span className="code-line ml-4">design: <span className="code-value">'modern'</span>,</span>
                      <span className="code-line ml-4">responsive: <span className="code-value">true</span>,</span>
                      <span className="code-line ml-4">performance: <span className="code-value">'optimized'</span></span>
                      <span className="code-line">{`}`});</span>
                      <span className="code-line mt-2"><span className="code-comment">// Launch your business</span></span>
                      <span className="code-line">website.deploy();</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-50 rounded-full z-[-1] opacity-70"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full z-[-1] opacity-50"></div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animation-delay-600">
          <span className="text-xs font-medium mb-2">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-blue-300"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
