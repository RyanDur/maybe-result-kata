import {Failure, Success} from "./types";

// TODO: Implement Success
const success = <SUCCESS>(aSuccess?: SUCCESS): Success<SUCCESS> => aSuccess as Success<SUCCESS>
// TODO: Implement Failure
const failure = <FAILURE>(aFailure?: FAILURE): Failure<FAILURE> => aFailure as Failure<FAILURE>

export {failure, success}