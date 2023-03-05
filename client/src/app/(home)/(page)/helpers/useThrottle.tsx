import throttle from 'lodash/throttle';
import { useEffect, useMemo, useRef } from 'react';

const useThrottle = (callback: Function, delay: number) => {
    const ref = useRef<Function>();

    useEffect(() => { 
        ref.current = callback;
    }, [callback]);

    const throttleCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };
        return throttle(func, delay)
    }, [])

    return throttleCallback;
}

export default useThrottle;