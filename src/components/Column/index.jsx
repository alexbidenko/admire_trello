import style from './Column.module.css';
import Card from "../Card";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

const Column = ({ title, cards, columnId, index }) => {
    const [isRedact, setIsRedact] = useState(!title);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const addCard = (e) => {
        e.preventDefault();
        dispatch({
            type: 'add_card',
            payload: {
                column_id: columnId,
                content: '',
            },
        });
    };

    useEffect(() => {
        if (isRedact) ref.current.focus();
    }, [isRedact]);

    return (
        <Draggable draggableId={`column_${columnId}`} index={index}>
            {(provided) => (
                <div
                    className={style.column}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className={style.column__card}>
                        <div className={style.column__cardHeader} {...provided.dragHandleProps}>
                            {
                                isRedact
                                    ? (
                                        <input value={title} ref={ref} onChange={(v) => dispatch({
                                            type: 'update_column_title',
                                            payload: {
                                                column_id: columnId,
                                                title: v.target.value,
                                            },
                                        })} onBlur={() => setIsRedact(false)} className={style.column__redactTitle} />
                                    )
                                    : <h4 className={style.column__cardTitle} onClick={() => setIsRedact(true)}>{title}</h4>
                            }
                        </div>
                        <Droppable
                            droppableId={`column_${columnId}`}
                            type="COLUMN"
                        >
                            {innerProvided => (
                                <div className={style.column__cardBody} ref={innerProvided.innerRef} {...innerProvided.droppableProps}>
                                    {cards.map((el, index) => <Card key={el.id} content={el.content} onUpdate={dispatch} columnId={columnId} cardId={el.id} index={index} />)}
                                    {innerProvided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <button className={style.column__addButton} onClick={addCard}>+ Добавить еще одну карточку</button>
                        <button className={style.column__deleteButton} onClick={() => dispatch({
                            type: 'delete_column',
                            payload: {
                                delete_column_id: columnId,
                            },
                        })}><span>+</span></button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
