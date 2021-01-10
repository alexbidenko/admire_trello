import {useEffect, useRef} from "react";

export default ({ isRedact }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isRedact) ref.current.focus();
    }, [isRedact]);

    return ref;
};
