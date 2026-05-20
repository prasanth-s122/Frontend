import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sqlConcepts } from '../data/sqlConcepts';
import Navbar from '../components/Navbar';
import SqlTerminal from '../components/SqlTerminal';

export default function ConceptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleConceptComplete, isCompleted } = useAuth();
  
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Scroll to top when concept changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [id]);

  // Find active concept
  const conceptIndex = sqlConcepts.findIndex(c => c.id === id);
  const concept = sqlConcepts[conceptIndex];

  if (!concept) {
    return (
      <div className="landing-page">
        <Navbar />
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px' }}>Concept Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The SQL module you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary">Return to SQL Hub</Link>
        </div>
      </div>
    );
  }

  // Sidebar Filtering
  const filteredSidebarConcepts = sqlConcepts.filter(c => 
    c.title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  // Pagination navigation helpers
  const prevConcept = conceptIndex > 0 ? sqlConcepts[conceptIndex - 1] : null;
  const nextConcept = conceptIndex < sqlConcepts.length - 1 ? sqlConcepts[conceptIndex + 1] : null;

  const handleChallengeComplete = () => {
    if (!isCompleted(concept.id)) {
      toggleConceptComplete(concept.id);
    }
  };

  return (
    <div className="concept-detail-page">
      <Navbar />

      {/* Mobile Drawer Trigger Bar */}
      <div className="mobile-sidebar-toggle-bar">
        <button className="btn btn-secondary btn-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginRight: '6px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {sidebarOpen ? 'Hide Modules' : 'View Modules'}
        </button>
        <span className="mobile-active-title">{concept.title}</span>
      </div>

      <div className="detail-workspace-wrapper">
        {/* Left Side Pane: Concept Sidebar */}
        <aside className={`detail-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header-block">
            <Link to="/" className="btn btn-secondary btn-back-hub">
              ← Back to Hub
            </Link>
            
            <div className="sidebar-search-wrapper">
              <input
                type="text"
                placeholder="Search modules..."
                className="form-control sidebar-search-input"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
              />
              {sidebarSearch && (
                <button className="clear-sidebar-search" onClick={() => setSidebarSearch('')}>×</button>
              )}
            </div>
          </div>

          <nav className="sidebar-concept-list">
            {filteredSidebarConcepts.map((c) => {
              const active = c.id === id;
              const completed = isCompleted(c.id);
              return (
                <div key={c.id} className={`sidebar-item-card ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
                  <label className="sidebar-checkbox-wrapper" title={completed ? "Mark Incomplete" : "Mark Complete"}>
                    <input 
                      type="checkbox" 
                      checked={completed} 
                      onChange={() => toggleConceptComplete(c.id)}
                      className="concept-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                  </label>
                  
                  <Link to={`/concept/${c.id}`} className="sidebar-item-link">
                    <span className="sidebar-item-title">{c.title}</span>
                    <div className="sidebar-item-meta">
                      <span className={`difficulty-dot dot-${c.difficulty}`}></span>
                      <span className="meta-text">{c.difficulty}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
            
            {filteredSidebarConcepts.length === 0 && (
              <div className="sidebar-no-results">No modules match search.</div>
            )}
          </nav>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>}

        {/* Right Side Pane: Learning Core & Interactive Playground */}
        <main className="detail-content-pane">
          <div className="lesson-body-card glass-card animate-fade-up">
            <div className="lesson-header-row">
              <div className="lesson-breadcrumbs">
                <Link to="/">Hub</Link> / <span className="active-breadcrumb">{concept.title}</span>
              </div>
              <div className="lesson-meta-badges">
                <span className={`badge badge-${concept.difficulty}`}>{concept.difficulty}</span>
                <span className={`badge badge-${concept.category}`}>{concept.category}</span>
                
                <button 
                  onClick={() => toggleConceptComplete(concept.id)} 
                  className={`btn btn-complete-toggle ${isCompleted(concept.id) ? 'completed' : ''}`}
                >
                  {isCompleted(concept.id) ? 'Mastered ✓' : 'Mark Mastered'}
                </button>
              </div>
            </div>

            <h1 className="lesson-title">{concept.title}</h1>
            
            {/* Detailed Explanations */}
            <div className="lesson-content-html" dangerouslySetInnerHTML={{ __html: concept.description }} />

            {/* Syntax Blueprint Area */}
            <div className="syntax-blueprint-container">
              <h4 className="syntax-section-title">SQL Syntax Template</h4>
              <div className="code-container">
                <code className="syntax-code">{concept.syntax}</code>
              </div>
              <div className="cheat-sheet-bar">
                <span className="cheat-sheet-icon">💡</span>
                <span className="cheat-sheet-text">{concept.cheatSheet}</span>
              </div>
            </div>
          </div>

          {/* Interactive Playground Widget */}
          <div className="playground-section animate-fade-up">
            <SqlTerminal 
              playgroundData={concept.playground} 
              onComplete={handleChallengeComplete} 
              isCompleted={isCompleted(concept.id)} 
            />
          </div>

          {/* Bottom Pagination Flow Buttons */}
          <footer className="pagination-footer-nav animate-fade-up">
            {prevConcept ? (
              <Link to={`/concept/${prevConcept.id}`} className="btn btn-secondary btn-pagination prev-btn">
                <div className="pagination-direction">Previous Module</div>
                <div className="pagination-title">← {prevConcept.title}</div>
              </Link>
            ) : (
              <div className="pagination-placeholder"></div>
            )}

            {nextConcept ? (
              <Link to={`/concept/${nextConcept.id}`} className="btn btn-primary btn-pagination next-btn">
                <div className="pagination-direction">Next Module</div>
                <div className="pagination-title">{nextConcept.title} →</div>
              </Link>
            ) : (
              <Link to="/" className="btn btn-primary btn-pagination next-btn">
                <div className="pagination-direction">Congratulations!</div>
                <div className="pagination-title">Back to SQL Hub Dashboard →</div>
              </Link>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
}
