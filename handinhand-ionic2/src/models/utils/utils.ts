// Copyright (c) 2017 Tracktunes Inc

export const ABS: (n: number) => number = Math.abs;

export const MAX: (a: number, b: number) => number = Math.max;

export const MIN: (a: number, b: number) => number = Math.min;

/**
 * Update object 'dest' by adding or changing any fields that differ in 'src'
 * @param {Object} 'src' the source object from which to update 'dest'
 * @param {Object} 'dest' the destination object to update and return
 * @returns {Object} the updated 'dest' object
 */
export function copyFromObject(src: Object, dest: Object): Object {
    'use strict';
    for (let prop in src) {
        if (has(src, prop)) {
            dest[prop] = src[prop];
        }
    }
    return dest;
}

export function has(obj: any, prop: any): boolean {
    'use strict';
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Checks if the given argument is a function.
 * @function
 */
export function isFunction(func: any): boolean {
    'use strict';
    return (typeof func) === 'function';
}

/**
 * Checks if the given argument is undefined.
 * @function
 */
export function isUndefined(obj: any): boolean {
    'use strict';
    return (typeof obj) === 'undefined';
}

/**
 * Checks if the given argument is a string.
 * @function
 */
export function isString(obj: any): boolean {
    'use strict';
    return Object.prototype.toString.call(obj) === '[object String]';
}

/**
 * Positive whole number test
 * @param {number} the number we're verifying
 * @returns {boolean} whether argument is a positive whole number
 */
export function isPositiveWholeNumber(num: number): boolean {
    'use strict';
    return <boolean >(
        num &&
        !isNaN(num) &&
        num > 0 &&
        num === Math.floor(num)
    );
}

export function isOdd(num: number): boolean {
    'use strict';
    if (!isPositiveWholeNumber(num)) {
        throw Error('isOdd expected positive whole number as input, got: ' +
            num);
    }
    return num % 2 === 1;
}

export function isEven(num: number): boolean {
    'use strict';
    return !isOdd(num);
}

/**
 * format time into H*:MM:SS.CC
 * @param {number} - number of seconds, float
 * @param {number} - maximum time, determines final string length/components
 * @return {string} - the time string representation
 */
export function formatTime(
    timeInSeconds: number,
    maxTimeInSeconds: number
): string {
    'use strict';
    let nSeconds: number = Math.floor(timeInSeconds),
        // initialize the result with the centiseconds portion and period
        result: string = (timeInSeconds - nSeconds).toFixed(2).substr(1),
        addZero: (num: number) => string = (num: number) => {
            return (num < 10) ? '0' : '';
        };

    if (timeInSeconds < 60 && maxTimeInSeconds < 60) {
        // no minutes
        result = addZero(nSeconds) + nSeconds.toString() + result;
    }
    else {
        // yes minutes
        let nMinutes: number = Math.floor(nSeconds / 60.0);
        nSeconds -= nMinutes * 60;
        result = ':' + addZero(nSeconds) + nSeconds.toString() + result;
        if (timeInSeconds < 3600 && maxTimeInSeconds < 3600) {
            // no hours
            result = addZero(nMinutes) + nMinutes.toString() + result;
        }
        else {
            // yes hours
            let nHours: number = Math.floor(nMinutes / 60.0);
            nMinutes -= nHours * 60;
            result = nHours.toString() + ':' + addZero(nMinutes) +
                nMinutes + result;
        }
    }
    return result;
}

/**
 * Create a string that reflects the time now, at 1 second resolution
 * @return {string} - human readable text representation of time now
 */
export function formatLocalTime(now: number): string {
    'use strict';
    const dateNow: Date = new Date(now);
    return [
        dateNow.getFullYear().toString(),
        '-',
        (dateNow.getMonth() + 1).toString(),
        '-',
        dateNow.getDate().toString(),
        ' -- ',
        dateNow.toLocaleTimeString()
    ].join('');
}

/**
 * objectInspector digs through a Javascript object
 * to display all its properties
 *
 * @param object - a Javascript object to inspect
 *
 * @return result - the concatenated description of all object properties
 */
export function objectInspector(object: Object): string {
    'use strict';
    let rows: string[] = [],
        key: string,
        count: number = 0;
    for (key in object) {
        if (!has(object, key)) {
            continue;
        }
        const val: any = object[key];
        rows.push([' - ', key, ':', val, ' (', typeof val, ')'].join(''));
        count++;
    }
    return [
        '\nType: ' + typeof object,
        'Length: ' + count,
        rows.join('\n')
    ].join('\n');
}

export function prependArray(value: any, arr: any[]): any[] {
    'use strict';
    let newArray: any[] = arr.slice(0);
    newArray.unshift(value);
    return newArray;
}

// NOTE: we cannot use the function below everywhere
// (a) because some browsers don't support the url that's created
//     the way it's created here as the href field;
// (b) because chrome on android would not allow this - it considers
//     it to be a cross origin request, so at this point we cannot
//     download anyway on mobile...

// save data into a local file
export function downloadBlob(blob: Blob, fileName: string): void {
    'use strict';
    const url: string = window.URL.createObjectURL(blob);
    let anchorElement: HTMLAnchorElement = document.createElement('a');
    anchorElement.style.display = 'none';
    anchorElement.href = url;
    anchorElement.setAttribute('download', fileName);
    document.body.appendChild(anchorElement);
    anchorElement.click();
    setTimeout(
        () => {
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(url);
        },
        100);
    console.log('saveBlob(): finished!');
}
