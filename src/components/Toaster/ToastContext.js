// ToastContext.js
import React, { createContext, useContext, useRef } from 'react';
import Toaster from './Toaster';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const toasterRef = useRef();

  const addToast = (message, duration) => {
    if (toasterRef.current) {
      toasterRef.current.addToast(message, duration);
    }
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toaster ref={toasterRef} />
    </ToastContext.Provider>
  );
};