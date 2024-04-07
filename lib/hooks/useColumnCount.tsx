import { useState, useEffect } from 'react';

// Custom hook for determining the number of columns
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1300) {
        setColumnCount(6);
      } else if (window.innerWidth >= 1200) {
        setColumnCount(5);
      } else if (window.innerWidth >= 992) {
        setColumnCount(4);
      } else if (window.innerWidth >= 768) {
        setColumnCount(3);
      } else if (window.innerWidth >= 576) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return columnCount;
}

export default useColumnCount;
