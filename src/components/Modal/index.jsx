import {CSSTransition} from "react-transition-group";
import {useMemo, Suspense, lazy} from "react";
import {createPortal} from "react-dom";
import style from './Modal.module.css';
import './ModalTransition.css';

const RedactCard = lazy(() => import("../RedactCard"));

const Modal = ({ isOpen, onClose, ...props }) => {
    const modals = useMemo(() => {
        return document.getElementById('modals');
    }, []);

    return createPortal(
        <CSSTransition in={isOpen} timeout={300} classNames="modalTransition" unmountOnExit>
            <div className={style.modal}>
                <div className={style.modal__overlay} onClick={onClose} />
                <div className={style.modal__card}>
                    <Suspense fallback="Загрузка...">
                        <RedactCard {...props} />
                    </Suspense>
                </div>
            </div>
        </CSSTransition>,
        modals,
    );
};

export default Modal;
