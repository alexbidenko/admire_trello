import {CSSTransition} from "react-transition-group";
import React, {useMemo, Suspense, lazy} from "react";
import {createPortal} from "react-dom";
import style from './Modal.module.css';
import './ModalTransition.css';
import {RedactCardProps} from "../RedactCard";

const RedactCard = lazy(() => import("../RedactCard"));

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
} & RedactCardProps;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, ...props }) => {
    const modals = useMemo(() => {
        return document.getElementById('modals')!;
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
