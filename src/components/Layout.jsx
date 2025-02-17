import { Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
  const hasToken = document.cookie.includes("auth_token=");
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  return (
    <div className="container">
      <header className={`header ${hasToken ? 'header-auth' : 'header-public'}`}>
        <div className="logo">
          <img src={`${import.meta.env.BASE_URL}assets/tos.svg`} alt="Terminal Operating System" className="skyshop-logo" />
        </div>
        {hasToken && (
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 