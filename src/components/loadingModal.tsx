import React from 'react';
import '../styles/LoadingModal.css'; // Custom CSS file

interface LoadingModalProps {
    show: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
    if (!show) return null;

    return (
        <div className="loading-modal-backdrop">
            <div className="loading-modal-content">
                <div className="spinner-border text-warning" role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                </div>
                <p className="loading-text">Cooking up something good</p>
                <div className="falling-leaves"></div> {/* Optional decorative leaves */}
            </div>
        </div>
    );
};

export default LoadingModal;