import {getBoard, saveBoard} from "../api/board";

const initialState = getBoard();

export default (prev = initialState, { type, payload = {} }) => {
    let newData = [...prev];
    const columnIndex = newData.findIndex((c) => c.id === payload.column_id);
    const column = columnIndex > -1 ? { ...newData[columnIndex] } : null;
    switch (type) {
        case 'update_card':
            column.cards.find((c) => c.id === payload.card_id).content = payload.content;
            break;
        case 'update_column_title':
            column.title = payload.title;
            break;
        case 'add_card':
            column.cards = [...column.cards, {
                id: new Date().getTime(),
                content: payload.content,
            }];
            break;
        case 'add_column':
            newData = [...newData, {
                id: new Date().getTime(),
                title: '',
                cards: [],
            }];
            break;
        case 'delete_card':
            column.cards = column.cards.filter((f) => f.id !== payload.card_id);
            break;
        case 'delete_column':
            newData = newData.filter((f) => f.id !== payload.delete_column_id);
            break;
        case 'reorder_columns':
            const [removedColumn] = newData.splice(payload.source_index, 1);
            newData.splice(payload.destination_index, 0, removedColumn);
            break;
        case 'reorder_cards':
            const result = [...column.cards];
            const [removed] = result.splice(payload.source_index, 1);
            result.splice(payload.destination_index, 0, removed);
            column.cards = result;
            break;
        case 'reorder_cards_between_columns':
            const sourceCloneIndex = newData.findIndex((c) => c.id === payload.source_column_id);
            const destinationCloneIndex = newData.findIndex((c) => c.id === payload.destination_column_id);
            const sourceClone = newData[sourceCloneIndex];
            const destinationClone = newData[destinationCloneIndex];
            const [sourceRemoved] = sourceClone.cards.splice(payload.source_index, 1);

            destinationClone.cards.splice(payload.destination_index, 0, sourceRemoved);

            newData[sourceCloneIndex] = sourceClone;
            newData[destinationCloneIndex] = destinationClone;
            break;
        default:
            break;
    }
    if (column) newData[columnIndex] = column;
    saveBoard(newData);
    return newData;
};
