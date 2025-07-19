import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


const clientAtom = atomWithStorage('client', undefined, {
    getItem: (key, intialValue) => {
        const payload = localStorage.getItem(key);

        return payload ? JSON.parse(payload) : intialValue;
    },
    setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    removeItem: (key) => localStorage.removeItem(key),
}, {
    getOnInit: true
});



export {
    clientAtom
}