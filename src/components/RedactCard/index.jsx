import style from './RedactCard.module.css';

const RedactCard = () => {
    return (
        <div className={style.redactCard}>
            <div className={style.redactCard__header}>
                <h4 className={style.redactCard__title}>Заметка 1</h4>
                <p className={style.redactCard__column}>в колонке Название колонки 1</p>
                <h5 className={style.redactCard__description}>Описание</h5>
                <textarea className={style.redactCard__textarea} placeholder="Добавить более подробное описание..." />
            </div>
        </div>
    );
};

export default RedactCard;
