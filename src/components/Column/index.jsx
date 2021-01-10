import style from './Column.module.css';
import Card from "../Card";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useState} from "react";
import {useDispatch} from "react-redux";
import useAutoFocus from "../../hooks/useAutoFocus";
import BaseToggle from "./TextToggle";

const Column = ({ title, cards, columnId, index }) => {
    const [isRedact, setIsRedact] = useState(!title);
    const ref = useAutoFocus({ isRedact });
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
                            <BaseToggle isRedact={isRedact} content={title} onChange={(v) => dispatch({
                                type: 'update_column_title',
                                payload: {
                                    column_id: columnId,
                                    title: v.target.value,
                                },
                            })} inputRef={ref} onRedactToggle={() => setIsRedact(!isRedact)} />
                        </div>
                        <Droppable
                            droppableId={`column_${columnId}`}
                            type="COLUMN"
                        >
                            {innerProvided => (
                                <div className={style.column__cardBody} ref={innerProvided.innerRef} {...innerProvided.droppableProps}>
                                    {cards.map((el, index) => <Card key={el.id} content={el.content} onUpdate={dispatch} columnId={columnId} cardId={el.id} index={index} description={el.description} />)}
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
