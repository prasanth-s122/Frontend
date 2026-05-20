import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sqlConcepts } from '../data/sqlConcepts';
import Navbar from '../components/Navbar';

export default function Landing() {
  const { user, completedConcepts } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'basics', label: 'Basics' },
    { id: 'joins', label: 'Joins' },
    { id: 'manipulation', label: 'Manipulation' },
    { id: 'advanced', label: 'Advanced' }
  ];

  // Filtering Logic
  const filteredConcepts = sqlConcepts.filter(concept => {
    const matchesSearch = 
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || concept.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const completionPercent = Math.round((completedConcepts.length / sqlConcepts.length) * 100) || 0;

  return (
    <div className="landing-page">
      <Navbar />
      
      <main className="container landing-container animate-fade-up">
        {/* SQL Header Block */}
        <section className="sql-hero">
          <div className="sql-hero-backdrop"></div>
          <h1 className="sql-main-title">SQL</h1>
          <p className="sql-subtitle">Interactive Query Arena & Knowledge Forge</p>
          
          {user && (
            <div className="progress-summary-card glass-card">
              <div className="progress-info">
                <h3>Your Training Progress</h3>
                <p>{completedConcepts.length} of {sqlConcepts.length} concepts completed</p>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${completionPercent}%` }}></div>
                <span className="progress-bar-label">{completionPercent}%</span>
              </div>
            </div>
          )}
        </section>

        {/* Filter & Search Bar */}
        <section className="filter-search-section">
          <div className="search-box-wrapper">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search concepts by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
            )}
          </div>

          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Concept Cards Grid */}
        <section className="concept-grid-section">
          {filteredConcepts.length > 0 ? (
            <div className="concept-grid">
              {filteredConcepts.map((concept, index) => {
                const isCompleted = completedConcepts.includes(concept.id);
                return (
                  <Link 
                    key={concept.id} 
                    to={`/concept/${concept.id}`} 
                    className={`concept-card glass-card ${isCompleted ? 'completed' : ''}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="card-top-badges">
                      <span className={`badge badge-${concept.difficulty}`}>
                        {concept.difficulty}
                      </span>
                      <span className={`badge badge-${concept.category}`}>
                        {concept.category}
                      </span>
                    </div>

                    <h2 className="concept-card-title">{concept.title}</h2>
                    <p className="concept-card-desc">{concept.shortDescription}</p>

                    <div className="card-action-bar">
                      {isCompleted ? (
                        <div className="completion-tag">
                          <svg className="check-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Mastered</span>
                        </div>
                      ) : (
                        <div className="start-tag">
                          <span>Begin Training</span>
                          <span className="arrow-span">→</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="no-results glass-card">
              <svg className="no-results-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3>No Concepts Found</h3>
              <p>We couldn't find any concepts matching "{searchTerm}". Try another search or category!</p>
              <button className="btn btn-secondary btn-reset" onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
