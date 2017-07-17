// Copyright (c) 2016 Tracktunes Inc

import { DoubleBufferGetter, DoubleBufferSetter } from './double-buffer';

let buffer1: Int16Array,
    buffer2: Int16Array,
    getter: DoubleBufferGetter,
    setter: DoubleBufferSetter,
    preGetCBCounter: number,
    preSetCBCounter: number,
    preGetCB: () => void = () => {
        preGetCBCounter++;
    },
    preSetCB: () => void = () => {
        preSetCBCounter++;
    };

beforeEach(() => {
    buffer1 = new Int16Array(3);
    buffer2 = new Int16Array(3);
    preGetCBCounter = 0;
    preSetCBCounter = 0;
    // (buffer1, buffer2) are shared by getter and setter
    getter = new DoubleBufferGetter(buffer1, buffer2, preGetCB);
    setter = new DoubleBufferSetter(buffer1, buffer2, preSetCB);
});

describe('utils/double-buffer:DoubleBufferGetter/Setter', () => {

    it('wrap around as expected', () => {
        // fill up buffer1 to be [1,2,3], buffer2 to be [4,5,6]
        setter.setNext(1);
        expect(preSetCBCounter).toEqual(0);
        setter.setNext(2);
        expect(preSetCBCounter).toEqual(0);
        setter.setNext(3);
        expect(preSetCBCounter).toEqual(0);

        setter.setNext(4);
        expect(preSetCBCounter).toEqual(1);
        setter.setNext(5);
        expect(preSetCBCounter).toEqual(1);
        setter.setNext(6);
        expect(preSetCBCounter).toEqual(1);

        // getter should get them in the same order
        expect(getter.getNext()).toEqual(1);
        expect(preGetCBCounter).toEqual(0);
        expect(getter.getNext()).toEqual(2);
        expect(preGetCBCounter).toEqual(0);
        expect(getter.getNext()).toEqual(3);
        expect(preGetCBCounter).toEqual(0);

        expect(getter.getNext()).toEqual(4);
        expect(preGetCBCounter).toEqual(1);
        expect(getter.getNext()).toEqual(5);
        expect(preGetCBCounter).toEqual(1);
        expect(getter.getNext()).toEqual(6);
        expect(preGetCBCounter).toEqual(1);

        // now we wrap two more times before getting anything = buffer overrun
        setter.setNext(7);
        expect(preSetCBCounter).toEqual(2);
        setter.setNext(8);
        expect(preSetCBCounter).toEqual(2);
        setter.setNext(9);
        expect(preSetCBCounter).toEqual(2);

        setter.setNext(10);
        expect(preSetCBCounter).toEqual(3);
        setter.setNext(11);
        expect(preSetCBCounter).toEqual(3);
        setter.setNext(12);
        expect(preSetCBCounter).toEqual(3);

        setter.setNext(13);
        expect(preSetCBCounter).toEqual(4);

        // check on the results of the overrun in this block
        expect(getter.getNext()).toEqual(13);
        expect(preGetCBCounter).toEqual(2);
        expect(getter.getNext()).toEqual(8);
        expect(preGetCBCounter).toEqual(2);
        expect(getter.getNext()).toEqual(9);
        expect(preGetCBCounter).toEqual(2);

        expect(getter.getNext()).toEqual(10);
        expect(preGetCBCounter).toEqual(3);
        expect(getter.getNext()).toEqual(11);
        expect(preGetCBCounter).toEqual(3);
        expect(getter.getNext()).toEqual(12);
        expect(preGetCBCounter).toEqual(3);
    });
});
