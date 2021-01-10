import {CSSTransition} from "react-transition-group";
import React, {useMemo, Suspense, lazy} from "react";
import {createPortal} from "react-dom";
import './ModalTransition.css';
import {RedactCardProps} from "../RedactCard";
import styled from 'styled-components';

const RedactCard = lazy(() => import("../RedactCard"));

const ModalOverlay = styled.div`
    background-color: rgba(0,0,0,.64);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const ModalCard = styled.div`
    background-color: #f4f5f7;
    border-radius: 2px;
    overflow: hidden;
    width: 768px;
    z-index: 25;
    height: 400px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 48px;
`;

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
            <div>
                <ModalOverlay onClick={onClose} />
                <ModalCard>
                    <Suspense fallback="Загрузка...">
                        <RedactCard {...props} />
                    </Suspense>
                </ModalCard>
            </div>
        </CSSTransition>,
        modals,
    );
};

export default Modal;
