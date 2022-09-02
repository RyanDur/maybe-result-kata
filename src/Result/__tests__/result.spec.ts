import {faker} from "@faker-js/faker";
import {failure, success} from "../result";
import {Result} from "../types";

describe('The Result', () => {
    const data = {t: faker.lorem.sentence()};
    const reason = faker.lorem.sentence();

    describe('success', () => {
        const aSuccess: Result<{ t: string }, string> = success(data);

        describe('why it is a monad', () => {
            test.skip('orElse: should return the data', () =>
                expect(aSuccess.orElse(reason)).toEqual(data));

            test.skip('map: should allow us to to produce a new value within a new success', () =>
                expect(aSuccess.map(value => value + reason).orElse(reason)).toEqual(data + reason));

            test.skip('mBind: should allow us to bind to a new Result that produces a new value', () => {
                expect(aSuccess.mBind(value => success(value + reason)).orElse(reason)).toEqual(data + reason);
                expect(aSuccess.mBind(value => failure(value + reason)).orElse(reason)).toEqual(reason);
            });

            test.skip('or: should be skipped', () =>
                expect(aSuccess.or(thisShouldNotHappen).orElse(reason)).toEqual(data));
        });

        test.skip('orNull: should return the data', () =>
            expect(aSuccess.orNull()).toEqual(data));

        describe('either: should call the success path', () => {
            it.skip('should allow us to change it to a failure', () =>
                expect(aSuccess.either(
                    value => failure({t: value.t + reason}),
                    thisShouldNotHappen
                ).value).toEqual({t: data.t + reason}));

            it.skip('should allow us to change it to a different success', () =>
                expect(aSuccess.either(
                    value => success(reason + value),
                    thisShouldNotHappen
                ).value).toEqual(reason + data));
        });

        test.skip('onSuccess: should allow us to consume the value, and return the original value', () =>
            expect(aSuccess.onSuccess(value => expect(value).toEqual(data)).orElse(reason)).toEqual(data));

        test.skip('onFailure: should be skipped', () =>
            expect(aSuccess.onFailure(thisShouldNotHappen).orElse(reason)).toEqual(data));

        test.skip('toMaybe: should be a Some containing the value', () =>
            expect(aSuccess.toMaybe().inspect()).toBe(`Some(${data})`));

        test.skip('isSuccess: should be true', () =>
            expect(aSuccess.isSuccess).toBe(true));
    });

    describe('failure', () => {
        const aFailure: Result<{ t: string }, string> = failure(reason);

        describe('why it is a monad', () => {
            test.skip('orElse: should return the fallback value', () =>
                expect(aFailure.orElse(data)).toEqual(data));

            test.skip('map: should be skipped', () =>
                expect(aFailure.map(thisShouldNotHappen).orElse(reason)).toEqual(reason));

            test.skip('mBind: should be skipped', () =>
                expect(aFailure.mBind(thisShouldNotHappen).orElse(reason)).toEqual(reason));

            test.skip('or: should not allow us to bind to a new Result that produces a new value', () => {
                expect(aFailure.or(value => success(value + reason)).orElse(reason)).toEqual(reason + reason);
                expect(aFailure.or(value => failure(value + reason)).orElse(reason)).toEqual(reason);
            });
        });

        test.skip('orNull: should be null', () =>
            expect(aFailure.orNull()).toBeNull());

        describe('either: should call the failure path', () => {
            it.skip('should allow us to change it to a failure', () =>
                expect(aFailure.either(
                    thisShouldNotHappen,
                    value => success({t: value})
                ).value).toEqual({t: reason}));

            it.skip('should allow us to change it to a different success', () =>
                expect(aFailure.either(
                    thisShouldNotHappen,
                    value => failure(reason + value)
                ).value).toEqual(reason + reason));
        });

        test.skip('onSuccess:: should be skipped', () =>
            expect(aFailure.onSuccess(thisShouldNotHappen).value).toEqual(reason));

        test.skip('onFailure should allow us to consume the value, and return the original value', () =>
            expect(aFailure.onFailure(value => expect(value).toEqual(reason)).value).toEqual(reason));

        test.skip('toMaybe: should be Nothing', () =>
            expect(aFailure.toMaybe().inspect()).toBe('Nothing'));

        test.skip('isSuccess: should be false', () =>
            expect(aFailure.isSuccess).toBe(false));
    });

    const thisShouldNotHappen = () => fail('this should not happen');
});
