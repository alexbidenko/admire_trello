import style from './Card.module.css';
import {memo, useEffect, useRef, useState} from "react";
import {Draggable} from "react-beautiful-dnd";
import Modal from "../Modal";

const Card = ({ content, onUpdate, columnId, cardId, index }) => {
    const [isRedact, setIsRedact] = useState(!content);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (isRedact) ref.current.focus();
    }, [isRedact]);

    const deleteCard = () => {
        onUpdate({
            type: 'delete_card',
            payload: {
                column_id: columnId,
                card_id: cardId,
            },
        });
    };

    return (
        <>
            <Draggable draggableId={`card_${cardId}`} index={index}>
                {provided => (
                    <div
                        className={style.card}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {
                            isRedact
                                ? <textarea className={style.card__content} value={content} onBlur={() => setIsRedact(false)} ref={ref} onChange={(v) => onUpdate({
                                    type: 'update_card',
                                    payload: {
                                        content: v.target.value,
                                        column_id: columnId,
                                        card_id: cardId,
                                    }
                                })} />
                                : <div className={style.card__content} onClick={() => setIsOpen(true)}>{content}</div>
                        }
                        <button className={style.card__deleteButton} onClick={deleteCard}><span>+</span></button>
                    </div>
                )}
            </Draggable>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} content={content} columnId={columnId} cardId={cardId} />
        </>
    );
};

export default memo(Card);
