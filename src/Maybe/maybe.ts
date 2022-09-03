import {Maybe, Nothing, Some} from "./types";

// TODO: Implement Some
const some = <T>(thing: T): Some<T> => ({
    isNothing: undefined,
    orNull: () => undefined,
    orElse: () => undefined,
    map: () => undefined,
    mBind: () => undefined,
    or: () => undefined,
    toResult: () => undefined,
    inspect: () => undefined
}) as unknown as Some<T>
// remove ^^^^^^^^^^^^ after implementation

// TODO: Implement Nothing
const nothing = (): Nothing => ({
    isNothing: undefined,
    orNull: () => undefined,
    orElse: () => undefined,
    map: () => undefined,
    mBind: () => undefined,
    or: () => undefined,
    toResult: () => undefined,
    inspect: () => undefined
}) as unknown as Nothing
// remove ^^^^^^^^^^^^ after implementation

// TODO: Implement Maybe
const maybe= <T>(thing?: T, isSomething?: boolean): Maybe<T> => (thing === isSomething) as unknown as Maybe<T>
//                                                      replace ^^^^^^^^^^^with your implementation^^^^^^^^^^^
export {maybe, some, nothing}