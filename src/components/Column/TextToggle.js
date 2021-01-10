import BaseTextToggle from "../common/BaseTextToggle";
import style from './Column.module.css';

const BaseToggle = (props) => {
    return <BaseTextToggle inputClassName={style.column__redactTitle} textClassName={style.column__cardTitle} {...props} />
};

export default BaseToggle;
