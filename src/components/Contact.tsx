
import React, { useState } from 'react';
import { useIntersectionObserver, useScrollReveal } from '@/hooks/useAnimations';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  useScrollReveal();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "hello@cubic.studio",
      link: "mailto:hello@cubic.studio"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      details: "123 Design Street, Creative City",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-gradient-subtle">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider rounded-full border border-black/10 bg-white/80 backdrop-blur-sm mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Let's create something amazing together
            </h2>
            <p className="text-gray-600 mb-8">
              Have a project in mind or want to learn more about our services? Get in touch with us, and we'll be happy to discuss how we can bring your ideas to life.
            </p>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <ContactItem 
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  details={item.details}
                  link={item.link}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
          
          <div className="reveal">
            <div className="glass-card p-8 h-full">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Message sent!</h4>
                  <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-black text-white rounded-full flex items-center justify-center transition-all hover:bg-gray-900 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  link: string;
  delay: number;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, details, link, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      className={`flex items-start group transition-all duration-500 opacity-0 transform translate-y-8 ${
        isVisible ? 'opacity-100 translate-y-0' : ''
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-2 bg-black/5 rounded-full mr-4 group-hover:bg-black/10 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-gray-600 group-hover:text-black transition-colors">{details}</p>
      </div>
    </a>
  );
};

export default Contact;
