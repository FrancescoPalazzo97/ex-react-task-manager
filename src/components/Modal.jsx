import { createPortal } from "react-dom"

const Modal = ({
    title = `N/A`,
    content = `N/A`,
    show = false,
    onClose = () => { },
    onConfirm = () => { },
    confirmText = "Conferma"
}) => {
    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return createPortal(
        <div
            className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
            style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}
            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-light border-secondary">
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title fw-bold">{title}</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body py-4">
                        <p className="mb-0">{content}</p>
                    </div>
                    <div className="modal-footer border-secondary">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Annulla
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        ,
        document.body
    )
}

export default Modal
