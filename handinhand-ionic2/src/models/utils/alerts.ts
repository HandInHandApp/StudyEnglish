// Copyright (c) 2017 Tracktunes Inc

import { Alert, AlertController } from 'ionic-angular';

/**
 * Helper function to pop up questions and act upon user choice
 * @param {string} question
 * @param {string} button1Text
 * @param {() => void} action1
 * @param {string} button2Text
 * @param {() => void} action2
 * @returns {Alert}
 */
export function alertAndDo(
    alertController: AlertController,
    question: string,
    button1Text: string,
    action1: (data: any) => void,
    button2Text?: string,
    action2?: (data: any) => void
): void {
    'use strict';

    console.log('askAndDo(' + question + ')');
    // console.log('question: ' + question);
    // console.log('button1Text: ' + button1Text);
    // console.log('action1: ' + action1);
    // console.log('button2Text: ' + button2Text);
    // console.log('action2: ' + action2);

    let alert: Alert = alertController.create();

    alert.setTitle(question);

    if (!action2) {
        alert.addButton('Cancel');
    }

    alert.addButton({
        text: button1Text,
        handler: action1
    });

    if (action2) {
        alert.addButton({
            text: button2Text,
            handler: action2
        });
        alert.addButton('Cancel');
    }

    alert.present();
}
