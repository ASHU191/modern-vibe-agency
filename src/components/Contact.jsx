
import React, { useRef, useState } from 'react';
import { ArrowRight, Mail, MessageSquare, Phone } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useAnimations';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const contactRef = useRef<HTMLDivElement>(null);
  const [formRef, isFormVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to send the form data to a server
    
    // Reset form and show success
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative bg-gradient-subtle" ref={contactRef}>
      <div className="container mx-auto max-w-screen-xl">
        <div className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm mb-4 blue-accent">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let's discuss your <span className="text-gradient">project</span>
          </h2>
          <p className="text-gray-600">
            Ready to bring your ideas to life? Contact us today and let's start 
            building something amazing together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 reveal">
            <div className="blue-glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                    <a href="mailto:hello@webcraft.com" className="text-lg font-medium hover:text-blue-600 transition-colors">
                      hello@webcraft.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-lg font-medium hover:text-blue-600 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Social Media</h4>
                    <div className="flex space-x-4 mt-2">
                      <a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Twitter
                      </a>
                      <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href="https://instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-blue-100">
                <h4 className="text-lg font-medium mb-4">Our Office</h4>
                <p className="text-gray-600">
                  123 Web Avenue, Digital District<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </div>
            </div>
          </div>
          
          <div 
            ref={formRef}
            className={`md:col-span-7 blue-glass-card p-8 transition-all duration-500 transform ${
              isFormVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you shortly!
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-blue-600 font-medium flex items-center"
                >
                  Send another message
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-6 blue-gradient text-white rounded-lg flex items-center justify-center transition-all hover:shadow-lg group"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
