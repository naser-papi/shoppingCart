import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, initValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const exist = localStorage.getItem(key);
        if (exist) {
            return JSON.parse(exist);
        } else if (typeof initValue === "function") {
            return (initValue as () => T)();
        } else {
            return initValue;
        }
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as [T, typeof setValue];
}