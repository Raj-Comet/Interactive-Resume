import { useState } from 'react';
import '../styles/Experience.css';

function Experience({ experiences, viewMode }) {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(expId => expId !== id)
        : [...prev, id]
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'Present') return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (viewMode === 'table') {
    return (
      <section className="experience-section">
        <h2 className="section-title">Work Experience</h2>
        <div className="table-container">
          <table className="experience-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Duration</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map(exp => (
                <tr key={exp.id}>
                  <td>
                    <strong>{exp.company}</strong>
                    <br />
                    <small>{exp.location}</small>
                  </td>
                  <td>{exp.position}</td>
                  <td>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </td>
                  <td>
                    <div className="table-skills">
                      {exp.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                      {exp.skills.length > 3 && (
                        <span className="skill-tag">+{exp.skills.length - 3}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="experience-section">
      <h2 className="section-title">Work Experience</h2>
      <div className="timeline">
        {experiences.map(exp => {
          const isExpanded = expandedIds.includes(exp.id);
          return (
            <div key={exp.id} className="timeline-item card">
              <div className="timeline-marker">
                {exp.current && <span className="current-badge">Current</span>}
              </div>

              <div className="experience-header">
                <div className="experience-main">
                  <h3 className="experience-position">{exp.position}</h3>
                  <p className="experience-company">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="experience-date">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>

                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="expand-btn"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <p className="experience-description">{exp.description}</p>

              {isExpanded && (
                <div className="experience-details">
                  <h4>Key Achievements:</h4>
                  <ul className="achievements-list">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="experience-skills">
                {exp.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
