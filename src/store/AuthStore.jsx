import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


const clientAtom = atomWithStorage('client', null, {
    getItem: (key) => localStorage.getItem(key),
    setItem: (key, value) => localStorage.setItem(key, value),
    removeItem: (key) => localStorage.removeItem(key),
}, {
    getOnInit: true
});



export {
    clientAtom
}