// Copyright (c) 2016 Tracktunes Inc

import { IdbDict } from './idb-dict';
import { isPositiveWholeNumber } from '../utils/utils';

const DB_NAME: string = 'testIdbDict';
const DB_VERSION: number = 1;
const WAIT_MSEC: number = 60;

let idbDict: IdbDict = new IdbDict(DB_NAME, DB_VERSION),
    testKey: string = 'a',
    testValue: any = { a: 1, b: 2 },
    testValue2: any = { x: testValue, y: testValue };

beforeEach((done: Function) => {
    idbDict.waitForDB().subscribe(
        () => {
            done();
        },
        (error) => {
            fail(error);
        });
});

describe('services/idb:IdbDict', () => {
    it('initializes', (done) => {
        setTimeout(
            () => {
                expect(idbDict).not.toBeFalsy();
                expect(idbDict['db']).not.toBeFalsy();
                done();
            },
            WAIT_MSEC);
    });

    it('can add and get', (done) => {
        setTimeout(
            () => {
                idbDict.addKeyValue(testKey, testValue).subscribe(
                    (dbKey: number) => {
                        expect(isPositiveWholeNumber(dbKey)).toBe(true);
                        idbDict.getValue(testKey).subscribe(
                            (val: any) => {
                                expect(val).toEqual(testValue);
                                done();
                            },
                            (error) => {
                                fail(error);
                            });
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can get-or-add', (done) => {
        setTimeout(
            () => {
                idbDict.getOrAddValue('a', testValue).subscribe(
                    (val: any) => {
                        expect(val).toEqual(testValue);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can update and get same', (done) => {
        setTimeout(
            () => {
                idbDict.updateValue(testKey, testValue2).subscribe(
                    () => {
                        idbDict.getValue(testKey).subscribe(
                            (val: any) => {
                                expect(val).toEqual(testValue2);
                                done();
                            },
                            (error) => {
                                fail(error);
                            });
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can clearAll', (done) => {
        setTimeout(
            () => {
                idbDict.clearAll().subscribe(
                    () => {
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

});
