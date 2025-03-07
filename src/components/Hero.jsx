
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Code, Globe, Database, Layers } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Add tilt effect to the 3D card
  useEffect(() => {
    if (!imageRef.current || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = imageRef.current!.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      const tiltX = (y - 0.5) * 20; // Tilt angle based on mouse position
      const tiltY = (x - 0.5) * -20;
      
      imageRef.current!.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    
    const handleMouseLeave = () => {
      imageRef.current!.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    const container = imageRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);
  
  // Custom cursor
  useEffect(() => {
    if (isMobile) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    const handleMouseOver = () => {
      cursor.classList.add('hover');
    };
    
    const handleMouseOut = () => {
      cursor.classList.remove('hover');
    };
    
    document.addEventListener('mousemove', updateCursor);
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });
    
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
      document.body.removeChild(cursor);
    };
  }, [isMobile]);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-16 pb-24 px-6 md:px-12 overflow-hidden bg-blue-gradient"
    >
      {/* Background 3D Canvas */}
      <ThreeCanvas className="opacity-40" />
      
      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm animate-fade-in blue-accent">
                Premium Web Development Agency
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-tight animate-fade-in">
              We Craft <span className="text-gradient">Digital Experiences</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg animate-fade-in animation-delay-200">
              Your vision, our expertise. We build cutting-edge websites and applications that transform businesses and deliver exceptional user experiences.
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
          
          <div className="lg:col-span-6 relative">
            <div 
              ref={imageRef}
              className="relative transition-all duration-300 will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="card-3d overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
                  {/* 3D Layers */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-blue-300/10 z-20 rounded-2xl"></div>
                  
                  <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-white/90 backdrop-blur-md">
                    <div className="w-full h-full relative">
                      <div className="absolute top-4 left-4 right-4 h-8 bg-gray-100 rounded flex items-center px-3 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        <div className="text-xs text-gray-400 ml-2">webcraft.io</div>
                      </div>
                      
                      <div className="absolute top-16 left-4 right-4 bottom-4 overflow-hidden flex flex-col rounded-lg">
                        <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 p-4 overflow-hidden relative">
                          <div className="code-snippet w-full max-w-full text-left">
                            <span className="code-line"><span className="code-keyword">const</span> <span>createWebsite</span> = <span className="code-keyword">async</span>() =&gt; {`{`}</span>
                            <span className="code-line ml-4"><span className="code-keyword">const</span> design = <span className="code-keyword">await</span> <span>generateDesign</span>({`{`}</span>
                            <span className="code-line ml-8">style: <span className="code-value">'modern'</span>,</span>
                            <span className="code-line ml-8">responsive: <span className="code-value">true</span>,</span>
                            <span className="code-line ml-8">animations: <span className="code-value">'smooth'</span></span>
                            <span className="code-line ml-4">{`}`});</span>
                            <span className="code-line ml-4"></span>
                            <span className="code-line ml-4"><span className="code-keyword">const</span> development = <span className="code-keyword">await</span> <span>buildWebsite</span>({`{`}</span>
                            <span className="code-line ml-8">design,</span>
                            <span className="code-line ml-8">performance: <span className="code-value">'optimized'</span>,</span>
                            <span className="code-line ml-8">seo: <span className="code-value">'enhanced'</span></span>
                            <span className="code-line ml-4">{`}`});</span>
                            <span className="code-line ml-4"></span>
                            <span className="code-line ml-4"><span className="code-keyword">return</span> <span>launchWebsite</span>(development);</span>
                            <span className="code-line">{`}`};</span>
                            <span className="code-line mt-2"><span className="code-comment">// Transform your business</span></span>
                            <span className="code-line"><span>createWebsite</span>().then(<span>success</span> =&gt; <span>grow</span>());</span>
                          </div>
                          
                          {/* Floating elements */}
                          <div className="absolute top-10 right-4 w-16 h-16 bg-blue-400/20 rounded-full float-animation-slow"></div>
                          <div className="absolute bottom-6 left-10 w-8 h-8 bg-blue-800/20 rounded-full float-animation"></div>
                          <div className="absolute top-1/2 right-20 w-12 h-12 bg-blue-600/20 rounded-full float-animation-fast"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background gradient */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-blue-600"></div>
                </div>
              </div>
              
              {/* 3D floating elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-100 rounded-full z-[-1] opacity-70 float-animation-slow"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-200 rounded-full z-[-1] opacity-50 float-animation"></div>
              <div className="absolute top-1/2 -right-6 w-16 h-16 bg-blue-300 rounded-full z-[-1] opacity-60 float-animation-fast"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animation-delay-600">
          <span className="text-xs font-medium mb-2">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-blue-300 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
