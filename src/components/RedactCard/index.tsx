import style from './RedactCard.module.css';
import {useDispatch} from "react-redux";
import React from 'react';

export type RedactCardProps = {
    content: string;
    description?: string;
    columnId: number;
    cardId: number;
};

const RedactCard: React.FC<RedactCardProps> = ({ content, description, columnId, cardId }) => {
    const dispatch = useDispatch();

    return (
        <div className={style.redactCard}>
            <div className={style.redactCard__header}>
                <input value={content} className={style.redactCard__title} onChange={(v) => dispatch({
                    type: 'update_card',
                    payload: {
                        content: v.target.value,
                        column_id: columnId,
                        card_id: cardId,
                    }
                })} />
                <p className={style.redactCard__column}>в колонке Название колонки 1</p>
                <h5 className={style.redactCard__description}>Описание</h5>
                <textarea className={style.redactCard__textarea} placeholder="Добавить более подробное описание..." value={description} onChange={(v) => dispatch({
                    type: 'update_card_description',
                    payload: {
                        description: v.target.value,
                        column_id: columnId,
                        card_id: cardId,
                    }
                })} />
            </div>
        </div>
    );
};

export default RedactCard;
