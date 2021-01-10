const initialData = [
    {
        id: 1,
        title: 'Название колонки 1',
        cards: [
            {
                id: 1,
                content: 'Содержимое заметки 1',
            },
            {
                id: 2,
                content: 'Содержимое заметки 2',
            },
            {
                id: 3,
                content: 'Содержимое заметки 3',
            },
        ]
    },
    {
        id: 2,
        title: 'Название колонки 2',
        cards: [
            {
                id: 4,
                content: 'Содержимое заметки 1',
            },
            {
                id: 5,
                content: 'Содержимое заметки 2',
            },
            {
                id: 6,
                content: 'Содержимое заметки 3',
            },
        ]
    },
    {
        id: 3,
        title: 'Название колонки 3',
        cards: [
            {
                id: 7,
                content: 'Содержимое заметки 1',
            },
            {
                id: 8,
                content: 'Содержимое заметки 2',
            },
            {
                id: 9,
                content: 'Содержимое заметки 3',
            },
        ]
    },
];

export const saveBoard = (data) => {
    localStorage.setItem('data:board', JSON.stringify(data));
};

export const getBoard = () => {
    return localStorage.getItem('data:board') ? JSON.parse(localStorage.getItem('data:board')) : initialData;
};

export const saveMeta = (data) => {
    localStorage.setItem('data:meta', JSON.stringify(data));
};

export const getMeta = () => {
    return localStorage.getItem('data:meta') ? JSON.parse(localStorage.getItem('data:meta')) : { title: 'Курс React - разработка Trello' };
};
