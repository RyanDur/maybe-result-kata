import {Maybe, Nothing, Some} from "./types";

// TODO: Implement Maybe
const maybe= <T>(thing?: T, isSomething?: boolean): Maybe<T> => (thing === isSomething) as unknown as Maybe<T>
// TODO: Implement Some
const some = <T>(thing?: T): Some<T> => thing as Some<T>
// TODO: Implement Nothing
const nothing = (): Nothing => ({}) as Nothing

export {maybe, some, nothing}