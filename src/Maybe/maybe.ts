import {Maybe} from "./types";

const maybe= <T>(thing?: T, isSomething?: boolean): Maybe<T> => (thing === isSomething) as unknown as Maybe<T>
const some = <T>(thing?: T): Maybe<T> => thing as Maybe<T>
const nothing = <T>(thing?: T): Maybe<T> => thing as Maybe<T>

export {maybe, some, nothing}