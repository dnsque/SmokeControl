import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Set default title
    let title = 'SmokeControl';
    
    // Update title based on current path
    switch(location.pathname) {
      case '/':
        title = 'SmokeControl - Pagrindinis';
        break;
      case '/login':
        title = 'SmokeControl - Prisijungimas';
        break;
      case '/articles':
        title = 'SmokeControl - Straipsniai';
        break;
      case '/register':
        title = 'SmokeControl - Registracija';
        break;
      case '/account':
        title = 'SmokeControl - Paskyra';
        break;
      case '/ratings':
        title = 'SmokeControl - Vartotojų reitingas';
        break;
      default:
        // Check if it's an article page
        if (location.pathname.startsWith('/articles/')) {
          title = 'SmokeControl - Straipsnis';
        } else {
          title = 'SmokeControl';
        }
    }
    
    // Update document title
    document.title = title;
  }, [location]);

  return null;
}

export default TitleUpdater; 