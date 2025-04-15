import { useEffect, useRef } from 'react';

/**
 * A custom hook that sets the document title and reverts it when the component unmounts
 * This is a fallback for when Helmet doesn't work as expected
 */
export function useDocumentTitle(title: string) {
  const previousTitle = useRef(document.title);
  
  useEffect(() => {
    document.title = title;
    
    return () => {
      document.title = previousTitle.current;
    };
  }, [title]);
} 