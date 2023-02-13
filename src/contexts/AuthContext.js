import { createContext} from 'react';

export default createContext({
    // on définit les propriétés du contexte
    isAuthenticated: false,
    // on définit les méthodes du contexte
    setIsAuthenticated: value => {}
    
    });
