import style from './RedactCard.module.css';
import {useDispatch} from "react-redux";

const RedactCard = ({ content, columnId, cardId }) => {
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
                <textarea className={style.redactCard__textarea} placeholder="Добавить более подробное описание..." />
            </div>
        </div>
    );
};

export default RedactCard;
