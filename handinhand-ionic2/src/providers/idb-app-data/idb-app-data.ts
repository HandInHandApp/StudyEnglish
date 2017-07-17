// Copyright (c) 2017 Tracktunes Inc

import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Idb, IdbConfig } from '../../models/idb/idb';

export const DB_NAME: string = 'IdbAppData';
const DB_VERSION: number = 1;
const STORE_NAME: string = 'RecordedChunks';

const DB_CONFIG: IdbConfig = {
    name: DB_NAME,
    version: DB_VERSION,
    storeConfigs: [{
        name: STORE_NAME,
        indexConfigs: []
    }]
};

@Injectable()
export class IdbAppData extends Idb {
    constructor() {
        super(DB_CONFIG);
        console.log('constructor():IdbAppData');
    }

    public createChunk(item: Int16Array): Observable<number> {
        return this.create <Int16Array>(STORE_NAME, item);
    }

    public readChunk(key: number): Observable<Int16Array> {
        return this.read <Int16Array>(STORE_NAME, key);
    }
}
