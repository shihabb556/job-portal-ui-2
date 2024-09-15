import { useState } from 'react';

const ErrorBoundary = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);

  const getDerivedStateFromError = (error) => {
    setHasError(true);
  };

  if (hasError) {
    return fallback;
  }

  return children;
};

export default ErrorBoundary;
