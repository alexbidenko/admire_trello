import {useEffect, useRef} from "react";

const useAutoFocus = ({ isRedact }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (isRedact) ref.current.focus();
    }, [isRedact]);

    return ref;
};

export default useAutoFocus;
