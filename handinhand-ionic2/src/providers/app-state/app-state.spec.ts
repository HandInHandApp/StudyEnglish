// Copyright (c) 2016 Tracktunes Inc
/*
import {
    AppState
}
from './app-state';

import {
    isPositiveWholeNumber
}
from '../../models/utils/utils';

const WAIT_MSEC: number = 60;

let appState: AppState = new AppState(),
    savedTabIndex: number;

beforeEach((done: Function) => {
    appState.waitForDB().subscribe(
        (database: IDBDatabase) => {
            done();
        },
        (error) => {
            fail(error);
        });
});

describe('When appState initialized', () => {
    it('appState is not falsy', (done) => {
        setTimeout(
            () => {
                expect(appState).not.toBeFalsy();
                done();
            },
            WAIT_MSEC);
    });

    it('can read lastTabIndex', (done) => {
        setTimeout(
            () => {
                appState.getProperty('lastTabIndex').subscribe(
                    (idx: number) => {
                        savedTabIndex = idx;
                        expect(isPositiveWholeNumber(idx)).toBe(true);
                        done();
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can update lastTabIndex and read it', (done) => {
        setTimeout(
            () => {
                appState.updateProperty('lastTabIndex', 9999).subscribe(
                    (bUpdated: boolean) => {
                        expect(bUpdated).toBe(true);
                        appState.getProperty('lastTabIndex').subscribe(
                            (prop: any) => {
                                expect(prop).toBe(9999);
                                done();
                            });
                    });
            },
            WAIT_MSEC);
    });

    it('can update lastTabIndex back to what it was', (done) => {
        setTimeout(
            () => {
                appState.updateProperty('lastTabIndex', savedTabIndex)
                    .subscribe(
                        (bUpdated: boolean) => {
                            expect(bUpdated).toBe(true);
                            appState.getProperty('lastTabIndex').subscribe(
                                (prop: any) => {
                                    expect(prop).toBe(savedTabIndex);
                                    done();
                                });
                        });
            },
            WAIT_MSEC);
    });
});
*/
