import style from './Header.module.css';
import {useEffect, useRef, useState} from "react";
import {getMeta, saveMeta} from "../../api/board";

const Header = () => {
    const [isRedact, setIsRedact] = useState(false);
    const [title, setTitle] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        if (isRedact) ref.current.focus();
    }, [isRedact]);

    useEffect(() => {
        setTitle(getMeta().title);
    }, []);

    useEffect(() => {
        saveMeta({ title });
    }, [title]);

    return (
        <header className={style.header}>
            {
                isRedact
                    ? <input value={title} className={style.header__redactTitle} onChange={(v) => setTitle(v.target.value)} ref={ref} onBlur={() => setIsRedact(false)} />
                    : <h1 className={style.header__title} onClick={() => setIsRedact(true)}>{title}</h1>
            }
        </header>
    );
};

export default Header;
