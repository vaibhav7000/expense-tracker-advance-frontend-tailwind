import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


const clientAtom = atomWithStorage('client', null);



export {
    clientAtom
}