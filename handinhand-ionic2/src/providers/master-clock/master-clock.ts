// Copyright (c) 2017 Tracktunes Inc

// Simple injectable provider class that adds a clock that fires every
// CLOCK_INTERVAL_MSEC in our Ionic2/Angular2 app, to which we can
// attach functions to do things at the clock's frequency. This is
// basically an integration of setInterval() with zone.js, e.g. see
// http://blog.thoughtram.io/angular/2017/02/01/zones-in-angular-2.html
// to understand the zone-related code here.

import { NgZone, Injectable } from '@angular/core';

// clock frequency, in Hz
const CLOCK_FREQUENCY_HZ: number = 24;

// derived constant, please do not touch
export const CLOCK_INTERVAL_MSEC: number = 1000 / CLOCK_FREQUENCY_HZ;

@Injectable()
export class MasterClock {
    public isRunning: boolean;
    private intervalId: number;
    private ngZone: NgZone;
    private functions: { [id: string]: () => void };

    /**
     * constructor
     */
    constructor() {
        console.log('constructor():MasterClock');
        this.isRunning = false;
        this.intervalId = null;
        this.ngZone = new NgZone({ enableLongStackTrace: false });
        this.functions = {};
    }

    /**
     * Start the clock. We cannot call addFunction() until we've
     * started the clock by calling this. Call it to start the setInterval()
     * loop and call stop() to end it. While the loop is started you can call
     * addFunction() to add anything you'd like to monitor at the current
     * clock frequency.
     * @returns {void}
     */
    public start(): void {
        if (this.isRunning) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            this.intervalId = setInterval(
                // the monitoring actions are in the following function:
                () => {
                    this.ngZone.run(() => {
                        // console.log(Object.keys(this.functions).length);
                        for (let id in this.functions) {
                            this.functions[id]();
                        }
                    });
                },
                CLOCK_INTERVAL_MSEC);
            console.log('MasterClock:start() interval: ' +
                this.intervalId['data']['handleId']);
        });
        this.isRunning = true;
    }

    /**
     * Stop the clock. Stop repeat-running any scheduled functions.
     * @returns {void}
     */
    public stop(): void {
        if (!this.isRunning) {
            return;
        }
        this.isRunning = false;
        if (this.intervalId) {
            console.log('MasterClock:stop(): clearing interval: ' +
                this.intervalId['data']['handleId']);
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Add a function to execute on each clock loop
     * @param {string} id used as handle to added function, for later removal
     * @param {Function} function to execute in the clock's loop
     * @returns {void}
     */
    public addFunction(id: string, fun: () => void): void {
        const nFunctions: number = Object.keys(this.functions).length;
        if (nFunctions === 0) {
            this.start();
        }
        this.functions[id] = fun;
        console.log('MasterClock:addFunction(' + id + '), nFunctions: ' +
            nFunctions);
    }

    /**
     * Remove a function to execute on each clock loop, via its id
     * @param {string} id of function to remove
     * @returns {void}
     */
    public removeFunction(id: string): void {
        delete this.functions[id];
        const nFunctions: number = Object.keys(this.functions).length;
        if (nFunctions === 0) {
            this.stop();
        }
        console.log('MasterClock:removeFunction(' + id + '), nFunctions: ' +
            nFunctions);
    }
}
