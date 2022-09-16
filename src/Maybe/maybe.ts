import {Maybe, Nothing, Some} from "./types";
import {failure, success} from "../Result/result";

// TODO: Implement Some
const some = <T>(thing: T): Some<T> => ({
    isNothing: false,
    orNull: () => thing,
    orElse: () => thing,
    map: <U>(f: (value: T) => U) => some(f(thing)),
    mBind: <U>(f: (value: T) => Maybe<U>) => f(thing),
    or: () => some(thing),
    toResult: () => success(thing),
    inspect: () => undefined
}) as unknown as Some<T>
// remove ^^^^^^^^^^^^ after implementation

// TODO: Implement Nothing
const nothing = (): Nothing => ({
    isNothing: true,
    orNull: () => null,
    orElse: () => undefined,
    map: () => nothing(),
    mBind: () => nothing(),
    or: <T>(f: () => Maybe<T>) => f(),
    toResult: () => failure(),
    inspect: () => undefined
}) as unknown as Nothing
// remove ^^^^^^^^^^^^ after implementation

// TODO: Implement Maybe
const maybe= <T>(thing?: T, isSomething?: boolean): Maybe<T> => ((isSomething===undefined? thing: isSomething) ? some(thing) : nothing()) as Maybe<T>
//                                                      replace ^^^^^^^^^^^with your implementation^^^^^^^^^^^
export {maybe, some, nothing}