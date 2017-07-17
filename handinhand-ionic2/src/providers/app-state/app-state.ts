// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { KeyDict } from '../../models/idb/idb-fs';

export interface GainState {
    factor: number;
    maxFactor: number;
}

interface State {
    lastTabIndex: number;
    lastViewedFolderKey: number;
    selectedNodes: KeyDict;
    gain: GainState;
}

const DEFAULT_STATE: State = {
    lastTabIndex: 1,
    lastViewedFolderKey: 2,
    selectedNodes: {},
    gain: { factor: 1.0, maxFactor: 2.0 }
};

/**
 * @name AppState
 * @description
 */
@Injectable()
export class AppState {
    private storage: Storage;

    /**
     * @constructor
     */
    constructor(storage: Storage) {
        console.log('constructor():AppState');
        this.storage = storage;
    }

    /**
     * Gets a state property (from DB if necessary)
     * @returns {Observable<any>} Observable of value of property obtained
     */
    public getProperty(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (key in DEFAULT_STATE) {
                // TODO: if key is not stored yet then we want to store
                // it in storage, as taken from DEFAULT_STATE
                this.storage.get(key).then((value: any) => {
                    if (value === null) {
                        console.log('VALUE NOT IN STORAGE!');
                        value = DEFAULT_STATE[key];
                        this.updateProperty(key, value).then(() => {
                            console.log('UPDATED STORAGE: key=' + key +
                                ', value=' + value);
                            resolve(value);
                        });
                    }
                    else {
                        console.log('VALUE IN STORAGE: key=' + key +
                                ', value=' + value);
                        resolve(value);
                    }
                });
            }
        });
    }

    /**
     * Sets a state property (in DB if necessary)
     * @returns {Observable<boolean>} Emits after either we establish that
     * there is no need for an update (emits false in that case) or after we
     * have made the update in the DB (emits true in that case)
     */
    public updateProperty(key: string, value: any): Promise<any> {
        if (key in DEFAULT_STATE) {
            console.log('=====> APP STATE UPDATE <======= key:' +
                key + ', value:' + value);
            return this.storage.set(key, value);
        }
        else {
            throw Error('Wrong key used in setProperty()');
        }
    }
}
