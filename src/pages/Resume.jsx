import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import resumeData from '../data/resume.json';
import Header from '../components/Header';
import PersonalInfo from '../components/PersonalInfo';
import SkillsFilter from '../components/SkillsFilter';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import '../styles/Resume.css';

function Resume() {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [filteredExperience, setFilteredExperience] = useState(resumeData.experience);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Filter experience based on selected skills and search query
    let filtered = resumeData.experience;

    // Filter by skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(exp =>
        exp.skills.some(skill =>
          selectedSkills.includes(skill)
        )
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exp =>
        exp.company.toLowerCase().includes(query) ||
        exp.position.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        exp.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    setFilteredExperience(filtered);
  }, [selectedSkills, searchQuery]);

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleClearFilters = () => {
    setSelectedSkills([]);
    setSearchQuery('');
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const allSkills = Object.values(resumeData.skills).flat();
  const uniqueSkills = [...new Set(allSkills)];

  return (
    <div className="resume-page">
      <Header onDownload={handleDownloadPDF} />
      
      <div className="container">
        <div className="resume-content">
          <PersonalInfo data={resumeData.personalInfo} />

          <div className="controls-section no-print">
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="Search by company, role, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
                aria-label="Search resume"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                  aria-label="Clear search"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
                aria-label="Card view"
                aria-pressed={viewMode === 'cards'}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Cards
              </button>
              <button
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                aria-label="Table view"
                aria-pressed={viewMode === 'table'}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v2h10V5H5zm10 4H5v2h10V9zm-10 4v2h10v-2H5z" clipRule="evenodd" />
                </svg>
                Table
              </button>
            </div>
          </div>

          <SkillsFilter
            skills={uniqueSkills}
            selectedSkills={selectedSkills}
            onSkillToggle={handleSkillToggle}
            onClearFilters={handleClearFilters}
          />

          {filteredExperience.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3>No results found</h3>
              <p>Try adjusting your filters or search query</p>
              <button onClick={handleClearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          )}

          {filteredExperience.length > 0 && (
            <Experience
              experiences={filteredExperience}
              viewMode={viewMode}
            />
          )}

          <Education education={resumeData.education} />
          <Projects projects={resumeData.projects} />
          <Certifications certifications={resumeData.certifications} />
        </div>
      </div>
    </div>
  );
}

export default Resume;
