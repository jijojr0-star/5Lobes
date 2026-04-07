import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * ModalContext — single source of truth for which service modal is open.
 *
 * Replaces the previous window.dispatchEvent / window.addEventListener pattern.
 * Any component can call openServiceModal(key) via the useModal() hook.
 */
const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [activeServiceKey, setActiveServiceKey] = useState(null);

    const openServiceModal = useCallback((key) => {
        setActiveServiceKey(key);
    }, []);

    const closeServiceModal = useCallback(() => {
        setActiveServiceKey(null);
    }, []);

    return (
        <ModalContext.Provider value={{ activeServiceKey, openServiceModal, closeServiceModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal must be used inside <ModalProvider>');
    return ctx;
};
