import {Failure, Success} from "./types";

// TODO: Implement Success
const success = <SUCCESS>(aSuccess?: SUCCESS): Success<SUCCESS> => ({
    isSuccess: true,
    orNull: () => aSuccess
}) as Success<SUCCESS>

// TODO: Implement Failure
const failure = <FAILURE>(aFailure?: FAILURE): Failure<FAILURE> => ({
    isSuccess: false,
    value: aFailure
}) as Failure<FAILURE>

export {failure, success}