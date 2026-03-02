import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  FileSpreadsheet,
  Github,
  Globe,
  GraduationCap,
  Landmark,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  ShieldCheck,
  Workflow,
  X,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import BlurText from './components/reactbits/BlurText';
import ShinyText from './components/reactbits/ShinyText';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'enfoque', label: 'Perfil' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
];

const IMPACT_PROJECTS = [
  {
    id: 'contrataciones',
    tabLabel: 'Contrataciones',
    icon: Landmark,
    title: '🏛 Sistema de Contrataciones Institucionales',
    description:
      'Sistema desarrollado para gestionar procesos de contratación dentro de una institución pública, automatizando flujos que antes se realizaban manualmente en hojas de cálculo.',
    technologies: [
      'ASP.NET Core MVC',
      'SQL Server',
      'Arquitectura en capas',
      'Procedimientos almacenados',
      'Integración con Google Sheets (migración a base de datos normalizada)',
    ],
    impact: [
      'Reducción de errores en validaciones manuales',
      'Centralización de datos de funcionarios',
      'Automatización de procesos administrativos',
      'Base estructural para migración a sistema integral de RRHH',
    ],
  },
  {
    id: 'sircad',
    tabLabel: 'SIRCAD',
    icon: FileSpreadsheet,
    title: '📑 SIRCAD – Sistema de Registro y Control Administrativo Digital',
    description:
      'Sistema diseñado para el control y registro administrativo digital, permitiendo seguimiento estructurado de procesos internos y documentación oficial.',
    technologies: [
      'ASP.NET Core',
      'SQL Server',
      'Arquitectura modular',
      'Control de estados y trazabilidad',
    ],
    impact: [
      'Digitalización de procesos físicos',
      'Trazabilidad de cada registro',
      'Mejora en auditorías internas',
      'Base para escalabilidad institucional',
    ],
  },
  {
    id: 'ternas',
    tabLabel: 'Ternas',
    icon: GraduationCap,
    title: '📊 Sistema de Ternas Académicas',
    description:
      'Módulo especializado para la gestión de ternas académicas, permitiendo asignación, validación y control de docentes en procesos formales institucionales.',
    technologies: [
      'ASP.NET Core MVC',
      'SQL Server',
      'Integración con datos estructurados de RRHH',
      'Procedimientos almacenados',
    ],
    impact: [
      'Eliminación de duplicidad de información',
      'Automatización de asignaciones',
      'Mejora en transparencia del proceso',
      'Integración con módulos existentes (Planilla / Funcionarios)',
    ],
  },
  {
    id: 'web-corporativo',
    tabLabel: 'Web Corporativo',
    icon: Globe,
    title: '🌐 Desarrollo Web Corporativo',
    description:
      'Soluciones de presencia digital y automatización liviana para empresas que requieren velocidad de implementación y mantenimiento eficiente.',
    highlights: [
      'MA&B Auditores',
      'Sistemas empresariales personalizados',
      'Landing pages corporativas',
      'Automatización con Google Forms + Apps Script',
    ],
    technologies: [
      'HTML5 / CSS3',
      'JavaScript',
      'Google Apps Script',
      'Integraciones automatizadas',
      'Diseño responsive',
    ],
    impact: [
      'Posicionamiento digital de empresas',
      'Automatización de publicación de noticias',
      'Integración de formularios inteligentes',
      'Optimización de procesos sin base de datos tradicional',
    ],
  },
];

const SKILLS = [
  {
    title: 'Arquitectura y Backend',
    icon: Layers3,
    items: ['ASP.NET Core', 'Arquitectura en capas', 'SQL Server', 'Procedimientos almacenados'],
  },
  {
    title: 'Procesos Institucionales',
    icon: Workflow,
    items: [
      'Automatización de flujos administrativos',
      'Trazabilidad y control de estados',
      'Integración entre módulos (RRHH / Planilla)',
      'Migración desde hojas de cálculo a bases normalizadas',
    ],
  },
  {
    title: 'Calidad y Entrega',
    icon: ShieldCheck,
    items: [
      'Diseño responsive',
      'UI enfocada en claridad operativa',
      'Mantenibilidad de código',
      'Escalabilidad para crecimiento institucional',
    ],
  },
];

const INITIAL_FORM = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: '',
};

function App() {
  const publicBase = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  const profileSources = [
    `${publicBase}/yo.webp`,
    `${publicBase}/yo.jpg`,
    '/yo.webp',
    '/yo.jpg',
    'yo.webp',
    'yo.jpg',
  ].filter(
    (value, index, array) => Boolean(value) && array.indexOf(value) === index,
  );
  const [profileSourceIndex, setProfileSourceIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [activeProject, setActiveProject] = useState(IMPACT_PROJECTS[0].id);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const selectedProject = useMemo(
    () => IMPACT_PROJECTS.find((project) => project.id === activeProject) ?? IMPACT_PROJECTS[0],
    [activeProject],
  );

  useEffect(() => {
    const observedSections = document.querySelectorAll('section[data-track-section]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      observedSections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatusMessage({ type: '', text: '' });

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const canUseEmailJS = Boolean(serviceId && templateId && publicKey);

    try {
      if (canUseEmailJS) {
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
          publicKey,
        );

        setStatusMessage({
          type: 'success',
          text: 'Correo enviado correctamente. Si me demoro un poco, estoy peleando con SQL.',
        });
      } else {
        const subject = encodeURIComponent(formData.asunto);
        const body = encodeURIComponent(
          `Nombre: ${formData.nombre}\nEmail: ${formData.email}\n\n${formData.mensaje}`,
        );

        window.location.href = `mailto:jramsy.jr@gmail.com?subject=${subject}&body=${body}`;
        setStatusMessage({
          type: 'success',
          text: 'Tu correo está casi enviado correctamente: dale a "Enviar" y sale volando.',
        });
      }

      setFormData(INITIAL_FORM);
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'No se pudo enviar el mensaje. Intenta nuevamente.' });
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="site-shell">
      <div className="ambient-overlay" aria-hidden="true" />

      <header className="topbar">
        <div className="container topbar-inner">
          <button className="brand" onClick={() => scrollToSection('inicio')} type="button">
            JR
          </button>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu" role="dialog" aria-label="Menú móvil">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="mobile-nav-link"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="inicio" data-track-section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Portafolio profesional</span>
              <BlurText
                text="Jaime Rojas"
                className="hero-title"
                animateBy="words"
                direction="top"
                delay={150}
              />
              <ShinyText
                text="Desarrollo de sistemas institucionales con impacto real"
                className="hero-subtitle"
                speed={3}
                color="#6a7686"
                shineColor="#f4f7fa"
                spread={145}
              />

              <p className="hero-description">
                Construyo soluciones digitales orientadas a procesos críticos, priorizando trazabilidad,
                mantenibilidad y experiencia de uso para equipos administrativos y operativos.
              </p>

              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={() => scrollToSection('proyectos')}>
                  Ver Proyectos
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('contacto')}>
                  Contactar
                </button>
              </div>
            </div>

            <aside className="hero-panel" aria-label="Resumen profesional">
              <figure className="profile-photo-wrap">
                <img
                  src={profileSources[profileSourceIndex]}
                  alt="Foto de Jaime Rojas"
                  className="profile-photo"
                  loading="lazy"
                  onError={() =>
                    setProfileSourceIndex((prev) =>
                      prev < profileSources.length - 1 ? prev + 1 : prev,
                    )
                  }
                />
              </figure>
              <h2>Enfoque de trabajo</h2>
              <ul>
                <li>Sistemas administrativos de alta responsabilidad</li>
                <li>Automatización de procesos manuales</li>
                <li>Arquitectura preparada para crecimiento institucional</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="enfoque" data-track-section className="section section-soft">
          <div className="container">
            <h2 className="section-title">Perfil y criterio técnico</h2>
            <p className="section-intro">
              Experiencia desarrollando módulos y plataformas para instituciones, con foco en la reducción de
              errores operativos, integración de datos y transparencia en los procesos.
            </p>

            <div className="stats-grid">
              <article className="stat-card">
                <span className="stat-value">4+</span>
                <span className="stat-label">Años construyendo software</span>
              </article>
              <article className="stat-card">
                <span className="stat-value">100%</span>
                <span className="stat-label">Enfoque en trazabilidad</span>
              </article>
              <article className="stat-card">
                <span className="stat-value">End-to-End</span>
                <span className="stat-label">Desde análisis hasta despliegue</span>
              </article>
            </div>
          </div>
        </section>

        <section id="proyectos" data-track-section className="section">
          <div className="container">
            <h2 className="section-title">🚀 Proyectos de Gran Impacto</h2>
            <p className="section-intro">
              Implementaciones con orientación institucional, diseñadas para mejorar control interno,
              continuidad operativa y capacidad de auditoría.
            </p>

            <div className="tabs-wrapper" role="tablist" aria-label="Proyectos destacados">
              {IMPACT_PROJECTS.map((project) => {
                const Icon = project.icon;
                const isActive = project.id === activeProject;

                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${project.id}`}
                    id={`tab-${project.id}`}
                    className={`tab-trigger ${isActive ? 'tab-trigger-active' : ''}`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <Icon size={16} />
                    <span>{project.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            <article
              key={selectedProject.id}
              id={`panel-${selectedProject.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${selectedProject.id}`}
              className="project-panel"
            >
              <h3 className="project-title">{selectedProject.title}</h3>

              <div className="project-block">
                <h4>📌 Descripción</h4>
                <p>{selectedProject.description}</p>
              </div>

              {selectedProject.highlights && (
                <div className="project-block">
                  <h4>📌 Proyectos destacados</h4>
                  <ul className="project-list">
                    {selectedProject.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-grid">
                <div className="project-block">
                  <h4>⚙ Tecnologías</h4>
                  <ul className="chip-list">
                    {selectedProject.technologies.map((tech) => (
                      <li key={tech} className="chip-item">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-block">
                  <h4>🎯 Impacto</h4>
                  <ul className="project-list">
                    {selectedProject.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="habilidades" data-track-section className="section section-soft">
          <div className="container">
            <h2 className="section-title">Capacidades clave</h2>
            <div className="skills-grid">
              {SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <article key={skill.title} className="skill-card">
                    <div className="skill-head">
                      <Icon size={18} />
                      <h3>{skill.title}</h3>
                    </div>
                    <ul className="project-list">
                      {skill.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contacto" data-track-section className="section">
          <div className="container contact-grid">
            <div>
              <h2 className="section-title">Contacto</h2>
              <p className="section-intro">
                Si tienes un reto institucional o corporativo, conversemos la solución técnica y el plan de
                implementación.
              </p>

              <div className="social-links">
                <a href="https://github.com/jramsy01" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jaime-rojas-1913a6223"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a href="mailto:jramsy.jr@gmail.com" aria-label="Correo">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={onInputChange}
                  required
                />
              </label>

              <label>
                Correo
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  required
                />
              </label>

              <label>
                Asunto
                <input
                  type="text"
                  name="asunto"
                  value={formData.asunto}
                  onChange={onInputChange}
                  required
                />
              </label>

              <label>
                Mensaje
                <textarea
                  name="mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={onInputChange}
                  required
                />
              </label>

              {statusMessage.text && (
                <p className={`form-status ${statusMessage.type === 'success' ? 'ok' : 'error'}`}>
                  {statusMessage.text}
                </p>
              )}

              <button type="submit" className="btn btn-primary" disabled={isSending}>
                {isSending ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Jaime Rojas</span>
          <span>
            <BriefcaseBusiness size={14} />
            Portafolio profesional
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
