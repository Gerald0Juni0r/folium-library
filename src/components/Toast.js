import React, { useState, useEffect, createContext, useContext } from "react";
import "./Toast.css";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now().toString();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    // Remove toast automaticamente após 4 segundos
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    warning: (message) => addToast(message, "warning"),
    info: (message) => addToast(message, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === "success" && "✓"}
              {toast.type === "error" && "✗"}
              {toast.type === "warning" && "⚠"}
              {toast.type === "info" && "ℹ"}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// Hook global para usar em qualquer lugar
let globalToast = null;

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    globalToast = {
      success: (message) => addToast(message, "success"),
      error: (message) => addToast(message, "error"),
      warning: (message) => addToast(message, "warning"),
      info: (message) => addToast(message, "info"),
    };
  }, []);

  const addToast = (message, type = "success") => {
    const id = Date.now().toString();
    const toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return <ToastContainer toasts={toasts} removeToast={removeToast} />;
};

// Função global para mostrar toasts
export const toast = {
  success: (message) => globalToast?.success(message),
  error: (message) => globalToast?.error(message),
  warning: (message) => globalToast?.warning(message),
  info: (message) => globalToast?.info(message),
};

export default Toast;
