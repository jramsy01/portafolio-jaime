import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Menu, X, Code, Palette, Rocket, Award, Users, Target } from 'lucide-react';
import emailjs from '@emailjs/browser'; // AGREGAR ESTA LÍNEA

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);

  // AGREGAR ESTOS ESTADOS PARA EL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Mouse tracking para efectos parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer para animaciones al scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // AGREGAR ESTAS FUNCIONES PARA EL FORMULARIO
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // AQUÍ VAN TUS CREDENCIALES DE EMAILJS
      const serviceId = 'service_ar7ujka'; // Reemplaza con tu Service ID
      const templateId = 'template_6wnfiot'; // Reemplaza con tu Template ID
      const publicKey = 'rQ0d_M3irhwfkEADb'; // Reemplaza con tu Public Key

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.nombre,
          from_email: formData.email,
          subject: formData.asunto,
          message: formData.mensaje,
          to_name: 'Jaime Rojas',
        },
        publicKey
      );

      setMessage({ 
        text: '¡Mensaje enviado con éxito! Te contactaré pronto.', 
        type: 'success' 
      });
      
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      setMessage({ 
        text: 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 
        type: 'error' 
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const projects = [
    {
      id: 1,
      title: "Juego de Chess, Con integracion de IA",
      description: "Juego de Chess, con integracion de IA y Sistema de Pagos con Stripe",
      image: "/chess.png",
      tech: ["React", "Node.js", "MongoDB", "Stripe", "AI"],
      github: "https://github.com/jramsy01/grupo-10.git",
      live: "#"
    },
    {
      id: 2,
      title: "Pagina De Informacion Sobre Inteligencia Artificial",
      description: "Pagina De Informacion Sobre Inteligencia Artificial con animaciones llamativas y Dinamicas",
      image: "/smartroom.png",
      tech: ["React", "Express", "PostgreSQL", "Stripe"],
      github: "https://github.com/jramsy01/inteligencia-artificial.html.git",
      live: "#"
    },
    {
      id: 3,
      title: "Gestion De pagos de bancos PHP",
      description: "Gestion De pagos de bancos PHP con sistema de autenticacion y Sistema de Generacion de reportes con PHP",
      image: "/banco.png",
      tech: ["PHP", "MySQL", "PHPMyAdmin"],
      github: "https://github.com/jramsy01/formv.git",
      live: "#"
    }
  ];

  const skills = [
    { name: "Frontend", items: ["React", "TypeScript", "Css", "TailwindCSS"], icon: <Code className="w-8 h-8" /> },
    { name: "Backend", items: ["Csharp", "PHP", "JavaScript", "Python", "MongoDB", "SQL", "Node.js", "Express", "Stripe", "AI","Android Studio",], icon: <Rocket className="w-8 h-8" /> },
    { name: "Diseño", items: ["Figma", "Adobe XD", "Photoshop", "Canva", "Responsive Design"], icon: <Palette className="w-8 h-8" /> }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-x-hidden">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Cursor follower */}
      <div 
        className="fixed w-20 h-20 bg-purple-500/20 rounded-full pointer-events-none z-50 blur-xl transition-transform duration-100"
        style={{
          transform: `translate(${mousePosition.x - 40}px, ${mousePosition.y - 40}px)`
        }}
      />

      {/* Header */}
      <header className="fixed w-full bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              JR
            </div>
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
              {['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'contacto'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`capitalize hover:text-purple-400 transition-colors duration-300 ${
                      activeSection === item ? 'text-purple-400' : ''
                    }`}
                  >
                    {item.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-gray-900/95 backdrop-blur-md transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}>
          <ul className="px-6 py-4 space-y-4">
            {['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'contacto'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="capitalize hover:text-purple-400 transition-colors w-full text-left"
                >
                  {item.replace('-', ' ')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{
                width: Math.random() * 4 + 'px',
                height: Math.random() * 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 10 + 's',
                animationDuration: Math.random() * 20 + 10 + 's'
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-gradient">
              Jaime Rojas
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 animate-fade-in-delay">
            Full Stack Developer & Creative Mind
          </p>
          <div className="flex justify-center space-x-4 mb-12 animate-fade-in-delay-2">
            <a href="https://github.com/jramsy01" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/jaime-rojas-1913a6223" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:jramsy.jr@gmail.com" className="p-3 bg-gray-800 rounded-full hover:bg-purple-500 transition-all duration-300 hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
          <button
            onClick={() => scrollToSection('proyectos')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 animate-fade-in-delay-3"
          >
            Ver Proyectos
          </button>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 opacity-0 section-animate">
            Sobre <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Mí</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="opacity-0 section-animate">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src="/yo.jpg" 
                  alt="Jaime Rojas"
                  className="relative rounded-lg w-full"
                />
              </div>
            </div>
            <div className="space-y-6 opacity-0 section-animate">
              <p className="text-gray-300 leading-relaxed">
                Soy un desarrollador apasionado por crear experiencias digitales únicas y memorables. 
                Con más de 4 años de experiencia en desarrollo web, me especializo en construir 
                aplicaciones escalables y con un diseño excepcional.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Mi enfoque combina creatividad técnica con un profundo entendimiento de las necesidades 
                del usuario, siempre buscando la innovación y la excelencia en cada proyecto.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm text-gray-400">Proyectos</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold">10+</div>
                  <div className="text-sm text-gray-400">Clientes</div>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-gray-400">Satisfacción</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 px-6 bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 opacity-0 section-animate">
            Mis <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Proyectos</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="group opacity-0 section-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a href={project.github} className="flex items-center hover:text-purple-400 transition-colors">
                        <Github size={20} className="mr-2" /> Code
                      </a>
                        {/* <a href={project.live} className="flex items-center hover:text-purple-400 transition-colors">
                          <ExternalLink size={20} className="mr-2" /> Demo
                        </a> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 opacity-0 section-animate">
            Mis <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Habilidades</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <div 
                key={category.name}
                className="bg-gray-800/50 rounded-lg p-8 hover:bg-gray-800 transition-all duration-300 opacity-0 section-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                </div>
                <div className="space-y-3">
                  {category.items.map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-gray-300">{skill}</span>
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full skill-bar" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - REEMPLAZAR TODA ESTA SECCIÓN */}
      <section id="contacto" className="py-20 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 opacity-0 section-animate">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Contacto</span>
          </h2>
          <div className="bg-gray-900 rounded-lg p-8 md:p-12 opacity-0 section-animate">
            <p className="text-center text-gray-300 mb-8">
              ¿Tienes un proyecto en mente? ¡Me encantaría escucharte!
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <textarea
                name="mensaje"
                placeholder="Mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
              
              {/* Mensaje de estado */}
              {message.text && (
                <div className={`p-4 rounded-lg text-center ${
                  message.type === 'success' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {message.text}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold transition-all duration-300 
                  ${isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                  }`}
              >
                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Jaime Rojas. Construido con ❤️ y React
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;