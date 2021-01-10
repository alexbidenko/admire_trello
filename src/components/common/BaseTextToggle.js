const BaseTextToggle = ({ isRedact, content, inputRef, onChange, onRedactToggle, inputClassName, textClassName }) => {
    return isRedact
        ? (
            <input value={content} ref={inputRef} onChange={onChange} onBlur={onRedactToggle} className={inputClassName} />
        )
        : <p className={textClassName} onClick={onRedactToggle}>{content}</p>
};

export default BaseTextToggle;
