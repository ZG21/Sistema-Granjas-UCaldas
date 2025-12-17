// src/components/Common/Modal.tsx
import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    width?: string;
    showCloseButton?: boolean;
    closeOnOutsideClick?: boolean;
    // Nueva prop opcional para controlar altura máxima
    maxHeight?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    width = 'max-w-lg',
    showCloseButton = true,
    closeOnOutsideClick = true,
    maxHeight // Prop opcional
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Previene scroll del body
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleOutsideClick}
            />

            {/* Contenedor del modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    ref={modalRef}
                    className={`relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full ${width}`}
                    style={maxHeight ? { maxHeight } : undefined}
                >
                    {/* Contenido del modal - Estructura flexible */}
                    <div className="h-full flex flex-col">
                        {/* Botón de cerrar - posicionado absolutamente */}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="absolute right-3 top-3 z-20 rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}

                        {/* Área de contenido con scroll automático cuando sea necesario */}
                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;