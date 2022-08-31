import {Maybe, Nothing, Some} from "./types";

const maybe= <T>(thing?: T, isSomething?: boolean): Maybe<T> => (thing === isSomething) as unknown as Maybe<T>
const some = <T>(thing?: T): Some<T> => thing as Some<T>
const nothing = (): Nothing => ({}) as Nothing

export {maybe, some, nothing}