import React, { useState, useEffect } from 'react';

import styles from './Toaster.module.css'

const Toaster = React.forwardRef((_, ref) => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addToast: (message, duration = 3000) => {
          const id = new Date().getTime(); // Unique ID for each toast

          setToasts((prev) => [...prev, { id, message }]);

          // Remove toast after duration
          setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
          }, duration);
        },
      };
    }
  }, [ref]);

  return (
    <div className={styles.toaster}>
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
            <div className={styles.toastDescription}>   {toast.message}   </div>
            <div className={styles.toastTime}>   {Date().slice(0,24)}   </div>
        </div>
      ))}
    </div>
  );
});

export default Toaster;