import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import './App.css';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="logo">Portfolio Collectif</div>
      <ul className="nav-links">
        <li><NavLink to="/" end>Accueil</NavLink></li>
        <li><NavLink to="/equipe">Équipe</NavLink></li>
        <li><NavLink to="/projets">Projets</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
      </button>
    </nav>
  );
}

function Home() {
  return (
    <div className="page-container hero-container">
      <div className="badge-promo">✨ Portfolio Officiel</div>
      <h1 className="hero-title">Développement Web & Solutions Digitales</h1>
      <p className="hero-subtitle">
        Bienvenue sur la plateforme de notre équipe. Nous concevons des applications web modernes, performantes et évolutives.
      </p>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="icon">🚀</div>
          <h3>Performance</h3>
          <p>Applications rapides basées sur React et Vite.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🛠️</div>
          <h3>Backend Solide</h3>
          <p>Architecture API REST sécurisée avec Express.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🎨</div>
          <h3>UI/UX Soigné</h3>
          <p>Design responsive adaptatif avec support du Mode Sombre.</p>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const teamMembers = [
    {
      username: "marty-rfm",
      name: "Pierre Marticerne",
      role: "Intégration UI/UX & Accessibilité",
      bio: "Spécialiste du design interface, de l'accessibilité et de la mise en page responsive CSS."
    },
    {
      username: "drochekalouis2003-web",
      name: "Louis Drocheka",
      role: "Architecture React & Routage",
      bio: "Développeur React en charge de l'architecture par composants, du State Global et de React Router v6."
    },
    {
      username: "widaniel",
      name: "Jn Joseph Widaniel",
      role: "Développement Backend Express & DevOps",
      bio: "Responsable de l'API Node.js/Express, de la persistance des données JSON et du déploiement."
    }
  ];

  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      teamMembers.map(member =>
        fetch(`https://api.github.com/users/${member.username}`)
          .then(res => res.json())
          .then(data => {
            // Avatar de secours propre avec les initiales si la photo GitHub n'existe pas
            const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4338ca&color=fff&size=128`;
            return {
              ...member,
              avatar: data.avatar_url || fallbackAvatar,
              repos: data.public_repos ?? 0,
              followers: data.followers ?? 0
            };
          })
          .catch(() => ({
            ...member,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4338ca&color=fff&size=128`,
            repos: 0,
            followers: 0
          }))
      )
    ).then(data => {
      setMembersData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h2>Notre Équipe</h2>
        <p>Chargement de l'équipe...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Notre Équipe</h2>
      <p className="hero-subtitle">
        Développeurs ayant collaboré à la conception de l'application web.
      </p>

      <div className="team-grid">
        {membersData.map((member, index) => (
          <div key={index} className="card team-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <img 
              src={member.avatar} 
              alt={member.name} 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                margin: '0 auto 1rem auto', 
                display: 'block',
                border: '3px solid #4338ca' 
              }} 
            />
            <h3 style={{ margin: '0.5rem 0' }}>{member.name}</h3>
            <span className="badge" style={{ margin: '0.5rem 0', display: 'inline-block' }}>{member.role}</span>
            <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '0.8rem 0' }}>{member.bio}</p>
            <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
              <strong>GitHub:</strong> @{member.username}<br />
              <strong>Dépôts publics :</strong> {member.repos} | <strong>Abonnés :</strong> {member.followers}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    { id: 1, title: 'Intégration & Design Responsive', category: 'frontend', desc: 'Mise en page CSS moderne et composants réutilisables.' },
    { id: 2, title: 'Application Single Page React', category: 'frontend', desc: 'Gestion d\'état avec Context API et routes dynamiques.' },
    { id: 3, title: 'API REST & Persistance de Données', category: 'backend', desc: 'Gestion du stockage des messages et contrôles API.' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="page-container">
      <h1>Nos Realisations</h1>
      
      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tous</button>
        <button className={filter === 'frontend' ? 'active' : ''} onClick={() => setFilter('frontend')}>Frontend</button>
        <button className={filter === 'backend' ? 'active' : ''} onClick={() => setFilter('backend')}>Backend</button>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="card">
            <span className="badge">{project.category}</span>
            <h3 style={{ marginTop: '0.5rem' }}>{project.title}</h3>
            <p>{project.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Message enregistré avec succès !');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ Erreur : ${result.error}`);
      }
    } catch (err) {
      setStatus('❌ Impossible de contacter le serveur backend.');
    }
  };

  return (
    <div className="page-container">
      <h1>Formulaire de Contact</h1>
      <p className="section-desc">Laissez-nous un message. Il sera transmis et enregistré sur le serveur.</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Nom complet</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Ex: Jean Dupont"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Adresse e-mail</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Ex: jean@example.com"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Votre message</label>
          <textarea 
            name="message" 
            placeholder="Écrivez votre message ici..."
            value={formData.message} 
            onChange={handleChange} 
            rows="5" 
            required 
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Envoyer le message</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-main">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/equipe" element={<Team />} />
              <Route path="/projets" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}