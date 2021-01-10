import style from './Header.module.css';
import {useEffect, useState} from "react";
import {getMeta, saveMeta} from "../../api/board";
import {Link, useLocation} from "react-router-dom";
import useAutoFocus from "../../hooks/useAutoFocus";
import BaseToggle from "./TextToggle";

const Header = () => {
    const [isRedact, setIsRedact] = useState(false);
    const [title, setTitle] = useState('');
    const location = useLocation();
    const ref = useAutoFocus({ isRedact });

    useEffect(() => {
        setTitle(getMeta().title);
    }, []);

    useEffect(() => {
        saveMeta({ title });
    }, [title]);

    return (
        <header className={style.header}>
            <BaseToggle isRedact={isRedact} content={title} onChange={(v) => setTitle(v.target.value)} inputRef={ref} onRedactToggle={() => setIsRedact(!isRedact)} />
            {
                location.pathname === '/settings'
                    ? <Link to="/" className={style.header__link}>Назад</Link>
                    : <Link to="/settings" className={style.header__link}>Настройки</Link>
            }
        </header>
    );
};

export default Header;
