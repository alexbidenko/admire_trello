import BaseTextToggle from "../common/BaseTextToggle";
import style from './Header.module.css';

const BaseToggle = (props) => {
    return <BaseTextToggle inputClassName={style.header__redactTitle} textClassName={style.header__title} {...props} />
};

export default BaseToggle;
