import {maybe, nothing, some} from "../maybe";
import {faker} from "@faker-js/faker";

describe('the Maybe', () => {
    const SOMETHING = 'SOMETHING';
    const OTHER_THING = 'OTHER_THING';
    const NOTHING = undefined;
    const thisShouldNotHappen = () => expect.fail('this should not happen');
    const otherValue = faker.lorem.sentence();

    describe('with custom isSomething definition', () => {
        describe('something', () => {
            const maybeValue = maybe(NOTHING, true);

            describe('why it is a monad', () => {
                test.todo('orElse: for undefined should not provide the fallback value', () =>
                    expect(maybeValue.orElse(SOMETHING)).toBe(NOTHING));

                test.todo(`map: for undefined is ${maybeValue.inspect?.()} `, () =>
                    expect(maybeValue.map(() => SOMETHING).orElse(NOTHING)).toEqual(SOMETHING));

                test.todo('mBind: for undefined should allow us to bind to another maybe', () => {
                    expect(maybeValue.mBind(inner => some(`${inner}, ${otherValue}`)).orNull())
                        .toEqual(`undefined, ${otherValue}`);
                    expect(maybeValue.mBind(() => nothing()).orNull())
                        .toEqual(null);
                });

                test.todo(`or: for undefined is ${maybeValue.inspect?.()}`, () =>
                    expect(maybeValue.or(thisShouldNotHappen).orElse(SOMETHING)).toBe(NOTHING));
            });

            test.todo(`toResult: for undefined is ${maybeValue.inspect?.()} should be a Success`, () =>
                expect(maybeValue.toResult?.().isSuccess).toEqual(true));
        });

        describe('nothing', () => {
            const maybeValue = maybe(SOMETHING, false);

            describe('why it is a monad', () => {
                test.todo('orElse: for SOMETHING should provide the fallback value', () =>
                    expect(maybeValue.orElse(NOTHING)).toEqual(NOTHING));

                test.todo('map: for SOMETHING should be skipped', () =>
                    expect(maybeValue.map(thisShouldNotHappen).orElse(NOTHING)).toEqual(NOTHING));

                test.todo('mBind: for SOMETHING should be skipped', () =>
                    expect(maybeValue.mBind(thisShouldNotHappen).orNull()).toEqual(null));

                test.todo(`or: for SOMETHING is ${maybeValue.inspect?.()}`, () => {
                    expect(maybeValue.or(() => some(otherValue)).orNull()).toEqual(otherValue);
                    expect(maybeValue.mBind(() => nothing()).orNull()).toEqual(null);
                });
            });

            test.todo(`toResult: for SOMETHING is ${maybeValue.inspect?.()} should be a Failure`, () => {
                expect(maybeValue.toResult?.().isSuccess).toEqual(false);
            });
        });
    });

    describe('with default isSomething definition', () => {
        const lambda = () => NOTHING;
        const functionExpression = function () {
            return NOTHING;
        };

        function functionDeclaration() {
            return NOTHING;
        }

        const nothings = [
            NaN,
            null,
            undefined
        ];
        const somethings = [
            {},
            false,
            true,
            lambda,
            functionExpression,
            functionDeclaration,
            0,
            -0,
            5,
            -34,
            0n,
            -0n,
            46n,
            -346n,
            SOMETHING,
            "", // eslint-disable-line
            '',
            ``  // eslint-disable-line
        ];

        describe('nothing', () => {
            nothings.forEach(value => {
                const maybeValue = maybe(value);

                describe('why it is a monad', () => {
                    test.todo(`orElse: for ${value} should provide the fallback value`, () =>
                        expect(maybeValue.orElse(SOMETHING)).toEqual(SOMETHING));

                    test.todo(`map: for ${value} should be skipped`, () =>
                        expect(maybeValue.map(thisShouldNotHappen).orElse(OTHER_THING)).toEqual(OTHER_THING));

                    test.todo(`mBind: for ${value} should be skipped`, () =>
                        expect(maybeValue.mBind(thisShouldNotHappen).orNull()).toEqual(null));

                    test.todo(`or: for ${value} is ${maybeValue.inspect?.()}`, () => {
                        expect(maybeValue.or(() => some(otherValue)).orNull()).toEqual(otherValue);
                        expect(maybeValue.mBind(() => nothing()).orNull()).toEqual(null);
                    });
                });

                test.todo(`toResult: for ${value} is ${maybeValue.inspect?.()} should be a Failure`, () =>
                    expect(maybeValue.toResult().isSuccess).toEqual(false));
            });
        });

        describe('something', () => {
            somethings.forEach(value => {
                const maybeValue = maybe(value);

                describe('why it is a monad', () => {
                    test.todo(`orElse: for ${value} should not provide the fallback value`, () =>
                        expect(maybeValue.orElse(SOMETHING)).toEqual(value));

                    test.todo(`map: for ${value} is ${maybeValue.inspect?.()} `, () =>
                        expect(maybeValue.map(() => SOMETHING).orElse(OTHER_THING)).toEqual(SOMETHING));

                    test.todo(`mBind: for ${value} should allow us to bind to another maybe`, () => {
                        expect(maybeValue.mBind(inner => some(`${inner}, ${otherValue}`)).orNull())
                            .toEqual(`${value}, ${otherValue}`);
                        expect(maybeValue.mBind(() => nothing()).orNull())
                            .toEqual(null);
                    });

                    test.todo(`or: for ${value} is ${maybeValue.inspect?.()}`, () =>
                        expect(maybeValue.or(thisShouldNotHappen).orElse(OTHER_THING)).toBe(value));
                });

                test.todo(`toResult: for ${value} is ${maybeValue.inspect?.()} should be a Failure`, () =>
                    expect(maybeValue.toResult().isSuccess).toEqual(true));
            });
        });
    });
});