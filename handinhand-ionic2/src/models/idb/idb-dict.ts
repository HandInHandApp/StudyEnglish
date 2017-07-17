// Copyright (c) 2017 Tracktunes Inc

import { Idb } from './idb';
import { Observable } from 'rxjs/Rx';
import { isUndefined } from '../utils/utils';

const DICT_STORE: string = 'storeDict';

interface KeyValuePair {
    key: string;
    value: any;
}

export class IdbDict extends Idb {
    constructor(dbName: string, dbVersion: number) {
        super({
            name: dbName,
            version: dbVersion,
            storeConfigs: [{
                name: DICT_STORE,
                indexConfigs: [{
                    name: 'key',
                    unique: true
                }]
            }]
        });

        this.waitForDB().subscribe(
            null,
            (error) => {
                throw Error('constructor(): ' + error);
            }
        );
    }

    /**
     * Clear entire data store.
     * @returns {Observable<void>} - observable that completes when the
     * data store has been totally cleared.
     */
    public clearAll(): Observable<void> {
        return this.clearStore(DICT_STORE);
    }

    /**
     * Read and return value from DB, given its key.
     * @param {string} key - the key of the vfalue we're reading
     */
    public getValue(key: string): any {
        let source: Observable<any> = Observable.create((observer) => {
            this.getStore(DICT_STORE, 'readonly').subscribe(
                (store: IDBObjectStore) => {
                    let index: IDBIndex = store.index('key'),
                        keyRange: IDBKeyRange = IDBKeyRange.only(key),
                        cursorRequest: IDBRequest = index.openCursor(keyRange);

                    cursorRequest.onsuccess = (event: ErrorEvent) => {
                        let cursor: IDBCursorWithValue = cursorRequest.result;
                        if (cursor) {
                            observer.next(cursor.value.value);
                            observer.complete();
                            // NB: don't call cursor.continue() because we
                            // expect only one value for key 'key'
                            // cursor.continue();
                        }
                        else {
                            observer.next(undefined);
                            observer.complete();
                        }
                    };
                    cursorRequest.onerror = (event: ErrorEvent) => {
                        observer.error('getValue():getStore(): cursor error');
                    };
                },
                (error) => {
                    observer.error('getValue(): ' + error);
                });
        });
        return source;
    }

    public addKeyValue(key: string, value: any): Observable<number> {
        console.log('addKeyValue(' + key + ', value)');
        let source: Observable<number> = Observable.create((observer) => {
            this.create<KeyValuePair>(DICT_STORE, {
                key: key,
                value: value
            }).subscribe(
                (dbKey: number) => {
                    console.log('addKeyValue(' + key + ', value), dbKey: ' +
                        dbKey);
                    observer.next(dbKey);
                    observer.complete();
                },
                (error) => {
                    console.log('addKeyValue(' + key + ', value) ERROR');
                    observer.error('addKeyValue():create(): ' + error);
                });
        });
        return source;
    }

    public getOrAddValue(key: string, value: any): Observable<any> {
        let source: Observable<any> = Observable.create((observer) => {
            // first we try to get the value
            this.getValue(key).subscribe(
                (dbValue: any) => {

                    if (isUndefined(dbValue)) {
                        // value isn't there, so add the (key, value) pair
                        console.log('getOrAddValue: NO! key: ' + key);
                        this.addKeyValue(key, value).subscribe(
                            (addedKey: number) => {
                                observer.next(value);
                                observer.complete();
                            },
                            (error) => {
                                observer.error('getOrAddValue():' +
                                    'addKeyValue(): ' + error);
                            });
                    }
                    else {
                        // value is there, return it
                        console.log('getOrAddValue: YES! key: ' + key);
                        observer.next(dbValue);
                        observer.complete();
                    }
                },
                (error) => {
                    observer.error('getOrAddValue():getValue(): ' + error);
                });
        });
        return source;
    }

    public updateValue(key: string, value: any): Observable<void> {
        // we will need to first find the value by using the index on key
        // then once we find it, we know what the db key (int) is and we
        // can use the
        let source: Observable<void> = Observable.create((observer) => {
            this.getStore(DICT_STORE, 'readonly').subscribe(
                (store: IDBObjectStore) => {
                    let index: IDBIndex = store.index('key'),
                        keyRange: IDBKeyRange = IDBKeyRange.only(key),
                        cursorRequest: IDBRequest =
                        index.openCursor(keyRange);

                    cursorRequest.onsuccess = (event: ErrorEvent) => {
                        let cursor: IDBCursorWithValue =
                            cursorRequest.result;
                        if (cursor) {
                            // found value to update it is a KeyValuePair
                            this.update(DICT_STORE, cursor.primaryKey, {
                                key: key,
                                value: value
                            }).subscribe(
                                () => {
                                    observer.next();
                                    observer.complete();
                                },
                                (error) => {
                                    observer.error('updateValue():' +
                                        'getStore():openCursor():' +
                                        'update(): ' + error);
                                });
                        }
                        else {
                            observer.error('updateValue(): key not in DB');
                        }
                    };
                    cursorRequest.onerror = (event: ErrorEvent) => {
                        observer.error('getValue():getStore(): cursor');
                    };
                },
                (error) => {
                    observer.error('getStore(): ' + error);
                });
        });
        return source;
    }
}
