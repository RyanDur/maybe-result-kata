import {Result} from "./types";

// TODO: Implement Success
const success = <SUCCESS, FAILURE>(aSuccess?: SUCCESS): Result<SUCCESS, FAILURE> => aSuccess as Result<SUCCESS, FAILURE>
// TODO: Implement Failure
const failure = <SUCCESS, FAILURE>(aFailure?: FAILURE): Result<SUCCESS, FAILURE> => aFailure as Result<SUCCESS, FAILURE>

export {failure, success}