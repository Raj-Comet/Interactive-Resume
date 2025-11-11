import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header({ onDownload }) {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header className="header no-print">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">Interactive Resume</h1>
            {userEmail && (
              <span className="user-email">{userEmail}</span>
            )}
          </div>
          
          <div className="header-actions">
            <button 
              onClick={onDownload} 
              className="btn btn-secondary"
              aria-label="Download resume as PDF"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </button>
            
            <button 
              onClick={handleLogout} 
              className="btn btn-danger"
              aria-label="Log out"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
