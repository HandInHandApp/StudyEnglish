// Copyright (c) 2017 Tracktunes Inc

import { Component } from '@angular/core';

/**
 * @name LoadingPage
 * @description
 * Load initial page, first wait for DB and AppState singletons
 * to initialize.
 */
@Component({
    selector: 'loading-page',
    templateUrl: 'loading-page.html'
})
export class LoadingPage {
    /**
     * @constructor
     */
    constructor() {
        console.log('constructor():LoadingPage');
    }
}
