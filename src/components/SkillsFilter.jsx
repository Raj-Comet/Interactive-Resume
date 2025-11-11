import '../styles/SkillsFilter.css';

function SkillsFilter({ skills, selectedSkills, onSkillToggle, onClearFilters }) {
  return (
    <section className="skills-filter no-print">
      <div className="filter-header">
        <h3 className="filter-title">Filter by Skills</h3>
        {selectedSkills.length > 0 && (
          <button 
            onClick={onClearFilters} 
            className="clear-btn"
            aria-label="Clear all filters"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Clear All ({selectedSkills.length})
          </button>
        )}
      </div>

      <div className="skills-container">
        {skills.map(skill => (
          <button
            key={skill}
            onClick={() => onSkillToggle(skill)}
            className={`badge ${selectedSkills.includes(skill) ? 'active' : ''}`}
            aria-pressed={selectedSkills.includes(skill)}
            aria-label={`Filter by ${skill}`}
          >
            {skill}
            {selectedSkills.includes(skill) && (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SkillsFilter;
