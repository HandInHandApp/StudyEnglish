// Copyright (c) 2016 Tracktunes Inc

import {
    isPositiveWholeNumber,
    objectInspector,
    prependArray,
    formatTime,
    formatLocalTime,
    copyFromObject,
    has,
    isFunction,
    isUndefined,
    isString
}
from './utils';

describe('utils/utils:isPositiveWholeNumber()', () => {
    it('isX() functions work as expected', () => {
        expect(isFunction(isPositiveWholeNumber)).toBe(true);
        expect(isFunction(null)).toBe(false);
        expect(isFunction(undefined)).toBe(false);
        expect(isFunction(1)).toBe(false);
        expect(isFunction([])).toBe(false);
        expect(isFunction({})).toBe(false);
        expect(isFunction('')).toBe(false);
        expect(isFunction(() => { console.log('hi'); })).toBe(true);
        expect(isUndefined(undefined)).toBe(true);
        expect(isUndefined(isPositiveWholeNumber['abcde'])).toBe(true);
        expect(isString(1)).toBe(false);
        expect(isString('')).toBe(true);
        expect(isString('a')).toBe(true);
        expect(isPositiveWholeNumber(1)).toBeTruthy();
        expect(isPositiveWholeNumber(0)).toBeFalsy();
        expect(isPositiveWholeNumber(-1)).toBeFalsy();
        expect(isPositiveWholeNumber(1.1)).toBeFalsy();
    });

    it('can run has', () => {
        let obj: Object = {
            a: 1
        };
        expect(has(obj, 'a')).toBe(true);
        expect(has(obj, 'b')).toBe(false);
    });

    it('can inspect window', () => {
        let msg: string = objectInspector(window);
        expect(msg).toBeTruthy();
    });

    it('can prependArray', () => {
        let x: any[] = [1, 'b', 3],
            obj: any = { 'tst': 'yes', 'fail': false };
        x = prependArray(obj, x);
        expect(x[0]).toEqual(obj);
    });

    it('can formatTime', () => {
        let x: string = formatTime(0, 0);
        alert(x);
        expect(x).toEqual('00.00');
        x = formatTime(0, Infinity);
        expect(x).toEqual('0:00:00.00');
        x = formatTime(555.12, 555.12);
        expect(x).toEqual('09:15.12');
        x = formatTime(55555.12, Infinity);
        expect(x).toEqual('15:25:55.12');
    });

    it('can formatLocalTime', () => {
        let now: Date = new Date(),
            fmt1: string = [
                now.getFullYear().toString(),
                '-',
                (now.getMonth() + 1).toString(),
                '-',
                now.getDate().toString(),
                ' -- ',
                now.toLocaleTimeString()
            ].join(''),
            fmt2: string = formatLocalTime(now.valueOf());
        expect(fmt1).toBe(fmt2);
    });

    it('can copyFromObject', () => {
        let obj1: Object = {
                a: 1,
                b: 2
            },
            obj2: Object = {
                c: 3
            },
            objCat: Object = {
                a: 1,
                b: 2,
                c: 3
            };
        expect(copyFromObject(obj1, obj2)).toEqual(objCat);
        expect(copyFromObject(obj2, obj1)).toEqual(objCat);
    });

});
