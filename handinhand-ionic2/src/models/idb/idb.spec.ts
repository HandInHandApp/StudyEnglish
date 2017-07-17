// Copyright (c) 2016 Tracktunes Inc

import { Idb, IdbConfig } from './idb';

const WAIT_MSEC: number = 60;
const DB_NAME: string = 'testIdb';
const DB_VERSION: number = 1;
const STORE_NAME: string = 'storeIdb';
const DB_CONFIG: IdbConfig = Idb.validateConfig({
    name: DB_NAME,
    version: DB_VERSION,
    storeConfigs: [{
        name: STORE_NAME,
        indexConfigs: [{
                name: 'name',
                unique: false
            },
            {
                name: 'parentKey',
                unique: false
            },
            {
                name: 'timestamp',
                unique: true
            }
        ]
    }]
});

let idb: Idb = new Idb(DB_CONFIG),
    db: IDBDatabase = null,
    item1len: number = 3,
    item2len: number = 4,
    item1: Int16Array = new Int16Array(item1len),
    item2: Int16Array = new Int16Array(item2len),
    key1: number,
    key2: number;

// fill up item1 and item2 with unique data per element
item1[0] = 11;
item1[1] = 12;
item1[2] = 13;

item2[0] = 21;
item2[1] = 22;
item2[2] = 23;
item2[3] = 24;

// explicitly check every element
function whichItem(item: Int16Array): number {
    'use strict';
    if (item.length === item1len &&
        item[0] === 11 &&
        item[1] === 12 &&
        item[2] === 13) {
        return 1;
    }
    else if (item.length === item2len &&
        item[0] === 21 &&
        item[1] === 22 &&
        item[2] === 23 &&
        item[3] === 24) {
        return 2;
    }
    else {
        throw Error('item is neither 1 nor 2, item: ' + item);
    }
}

beforeEach((done: Function) => {
    idb.waitForDB().subscribe(
        (database: IDBDatabase) => {
            db = database;
            done();
        },
        (error) => {
            fail(error);
        });
});

describe('services/idb:Idb', () => {
    it('initializes', (done) => {
        setTimeout(
            () => {
                expect(idb).not.toBeFalsy();
                expect(db).not.toBeFalsy();
                done();
            },
            WAIT_MSEC);
    });

    it('can create(item1), key == 1', (done) => {
        setTimeout(
            () => {
                idb.create <Int16Array>(STORE_NAME, item1).subscribe(
                    (key: number) => {
                        key1 = key;
                        // db has just been deleted first key should be 1
                        expect(key1).toEqual(1);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can create(item2), key == 2', (done) => {
        setTimeout(
            () => {
                idb.create <Int16Array>(STORE_NAME, item2).subscribe(
                    (key: number) => {
                        key2 = key;
                        // tests that keys are created as successive ints
                        expect(key2).toEqual(2);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can clear the store', (done) => {
        setTimeout(
            () => {
                idb.clearStore(STORE_NAME).subscribe(
                    () => {
                        done();
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create(item1), key == 3', (done) => {
        setTimeout(
            () => {
                idb.create <Int16Array>(STORE_NAME, item1).subscribe(
                    (key: number) => {
                        key1 = key;
                        expect(key1).toEqual(3);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can create(item2), key == 4', (done) => {
        setTimeout(
            () => {
                idb.create <Int16Array>(STORE_NAME, item2).subscribe(
                    (key: number) => {
                        key2 = key;
                        expect(key2).toEqual(4);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can read(item1)', (done) => {
        setTimeout(
            () => {
                idb.read <Int16Array>(STORE_NAME, key1).subscribe(
                    (result: Int16Array) => {
                        expect(whichItem(result)).toEqual(1);
                        done();
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can delete(item1)', (done) => {
        setTimeout(
            () => {
                idb.delete(STORE_NAME, key1).subscribe(
                    () => {
                        // delete works, test that you cannot re-read it
                        idb.read(STORE_NAME, key1).subscribe(
                            (result: Int16Array) => {
                                expect(result).toEqual(undefined);
                                done();
                            });
                    });
            },
            WAIT_MSEC);
    });

    it('can read(item2)', (done) => {
        setTimeout(
            () => {
                idb.read <Int16Array>(STORE_NAME, key2).subscribe(
                    (result: Int16Array) => {
                        expect(whichItem(result)).toEqual(2);
                        done();
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create(item1) again, key == 5', (done) => {
        setTimeout(
            () => {
                idb.create <Int16Array>(STORE_NAME, item1).subscribe(
                    (key: number) => {
                        key1 = key;
                        expect(key1).toEqual(5);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can update(key1, item2)', (done) => {
        setTimeout(
            () => {
                idb.update <Int16Array>(STORE_NAME, key1, item2).subscribe(
                    () => {
                        // read it after updating ensure same as item2
                        idb.read(STORE_NAME, key1).subscribe(
                            (result: Int16Array) => {
                                expect(whichItem(result)).toEqual(2);
                                done();
                            });
                    });
            },
            WAIT_MSEC);
    });

    it('can update(key2, item1)', (done) => {
        setTimeout(
            () => {
                idb.update <Int16Array>(STORE_NAME, key2, item1).subscribe(
                    () => {
                        // read it after updating ensure length same as item1
                        idb.read(STORE_NAME, key2).subscribe(
                            (result: Int16Array) => {
                                expect(whichItem(result)).toEqual(1);
                                done();
                            });
                    });
            },
            WAIT_MSEC);
    });

    it('can initialize 2nd Idb and create item2 in it', (done) => {
        setTimeout(
            () => {
                // db.close(); - no need, multiple conections supported
                let idb2: Idb = new Idb(DB_CONFIG);
                idb2.create <Int16Array>(STORE_NAME, item2).subscribe(
                    (key: number) => {
                        key2 = key;
                        // tests that keys continue to get incremented
                        expect(key2).toEqual(6);
                        done();
                    });
            },
            WAIT_MSEC);
    });

    it('can clear the store', (done) => {
        setTimeout(
            () => {
                idb.clearStore(STORE_NAME).subscribe(
                    () => {
                        done();
                    }
                );
            },
            WAIT_MSEC);
    });

});
