import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface ScrollSectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ScrollSectionContext = createContext<ScrollSectionContextType>({
  activeSection: 'home',
  setActiveSection: () => {},
});

export const ScrollSectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <ScrollSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollSectionContext.Provider>
  );
};

export const useScrollSectionContext = () => useContext(ScrollSectionContext);
