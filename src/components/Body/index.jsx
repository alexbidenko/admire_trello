import style from './Body.module.css';
import Column from "../Column";
import {useCallback} from "react";
import {Droppable, DragDropContext} from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";
import {useDispatch, useSelector} from "react-redux";

const Body = () => {
    const data = useSelector((store) => store.board);
    const dispatch = useDispatch();

    const onDragEnd = useCallback(({ source, destination }) => {
        if (!destination) return;

        if (source.droppableId === 'board') {
            dispatch({
                type: 'reorder_columns',
                payload: {
                    source_index: source.index,
                    destination_index: destination.index
                },
            })
            return;
        }

        if (source.droppableId === destination.droppableId) {
            if (destination.index === source.index) {
                return;
            }

            dispatch({
                type: 'reorder_cards',
                payload: {
                    column_id: +source.droppableId.replace('column_', ''),
                    source_index: source.index,
                    destination_index: destination.index
                },
            })
        } else {
            dispatch({
                type: 'reorder_cards_between_columns',
                payload: {
                    source_column_id: +source.droppableId.replace('column_', ''),
                    destination_column_id: +destination.droppableId.replace('column_', ''),
                    source_index: source.index,
                    destination_index: destination.index
                },
            })
        }
    }, [dispatch]);

    return (
        <ScrollContainer ignoreElements={`.${style.body__content} > *`} className={style.body}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="board" direction="horizontal" type="BOARD">
                    {(provided) => (
                        <div
                            className={style.body__content}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {data.map((el, index) => <Column key={el.id} title={el.title} cards={el.cards} columnId={el.id} index={index} />)}
                            {provided.placeholder}
                            <button className={style.body__addColumn} onClick={() => dispatch({
                                type: 'add_column',
                            })}>+ Добавить {data.length ? 'еще одну ' : ''}колонку</button>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </ScrollContainer>
    );
};

export default Body;
