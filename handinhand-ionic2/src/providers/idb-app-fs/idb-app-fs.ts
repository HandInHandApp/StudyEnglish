// Copyright (c) 2017 Tracktunes Inc

import { Injectable } from '@angular/core';
import {
    IdbFS,
    TreeNode,
    DB_KEY_PATH,
    ROOT_FOLDER_KEY
}
from '../../models/idb/idb-fs';

const DB_VERSION: number = 1;

export const DB_NAME: string = 'IdbAppFS';
export const UNFILED_FOLDER_NAME: string = 'Unfiled';
export const UNFILED_FOLDER_KEY: number = 2;

@Injectable()
export class IdbAppFS extends IdbFS {
    constructor() {
        super(DB_NAME, DB_VERSION);
        console.log('constructor():IdbAppFS');
        this.waitForFilesystem().subscribe(
            () => {
                this.readOrCreateNode(
                    UNFILED_FOLDER_KEY,
                    UNFILED_FOLDER_NAME,
                    ROOT_FOLDER_KEY).subscribe(
                    (treeNode: TreeNode) => {
                        if (treeNode[DB_KEY_PATH] !== UNFILED_FOLDER_KEY) {
                            throw Error(UNFILED_FOLDER_NAME +
                                ' key mismatch: ' + UNFILED_FOLDER_KEY +
                                ' vs. ' + treeNode[DB_KEY_PATH]);
                        }
                    });
            },
            (error) => {
                throw Error('in IdbAppFS:constructor(): ' + error);
            }
        );
    }
}
