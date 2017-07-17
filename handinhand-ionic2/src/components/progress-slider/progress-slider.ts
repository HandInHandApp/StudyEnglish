// Copyright (c) 2017 Tracktunes Inc

import { Component, Input, Output, ElementRef, Renderer,
         EventEmitter } from '@angular/core';

/**
 * @name ProgressSlider
 * @description
 * A progress bar that can be clicked to change the progress location,
 * such as the one used in the youtube or other video or audio players
 * to control and visualize media playback.
 */
@Component({
    selector: 'progress-slider',
    templateUrl: 'progress-slider.html'
})
export class ProgressSlider {
    @Input() public progress: number;
    @Output() public change: EventEmitter<any>;
    @Output() public changeEnd: EventEmitter<any>;

    private element: ElementRef;
    private renderer: Renderer;

    private trackWidthRange: { start: number, end: number };
    private freeMouseUpListener: Function;
    private freeMouseMoveListener: Function;

    constructor(element: ElementRef, renderer: Renderer) {
        console.log('constructor():ProgressSlider');
        this.element = element;
        this.renderer = renderer;
        this.progress = 0;
        this.change = new EventEmitter();
        this.changeEnd = new EventEmitter();
    }

    public progressPercent(): string {
        return (100.0 * this.progress).toString() + '%';
    }

    public remainingPercent(): string {
        return (100.0 - 100.0 * this.progress).toString() + '%';
    }

    private getTrackWidthRange(): { start: number, end: number } {
        const
            progressSliderContainerElement: Element =
                document.getElementById('progress-slider-container'),
            styleDeclaration: CSSStyleDeclaration =
                getComputedStyle(progressSliderContainerElement, null),
            offsetLeft: number = this.element.nativeElement.offsetLeft,
            widthStyle: String =
                styleDeclaration.getPropertyValue('width'),
            paddingLeftStyle: string =
                styleDeclaration.getPropertyValue('padding-left'),
            width: number =
                parseFloat(widthStyle.replace('px', '')),
            paddingLeft: number =
                parseFloat(paddingLeftStyle.replace('px', ''));
        return {
            start: offsetLeft + paddingLeft,
            end: offsetLeft + width - paddingLeft
        };
    }

    private computeProgress(
        clientX: number,
        range: { start: number, end: number }
    ): number {
        // the next if-statement fixes a quirk observed in desktop Chrome
        // where the ondrag event always ends up with a clientX value of 0
        // as its last emitted value, even when that's clearly not the last
        // location of dragging
        if (clientX === 0) {
            return 0;
        }

        let rangeX: number = range.end - range.start,
            clickRelativeX: number = clientX - range.start;

        if (clickRelativeX < 0) {
            clickRelativeX = 0;
        }

        if (clickRelativeX > rangeX) {
            clickRelativeX = rangeX;
        }
        return clickRelativeX / rangeX;
    }

    private jumpToPosition(
        clientX: number,
        range: { start: number, end: number }
    ): void {
        this.progress = this.computeProgress(clientX, this.trackWidthRange);
        this.change.emit(this.progress);
    }

    public onSliderMouseDown(event: MouseEvent): void {
        console.log('onSliderMouseDown ' + this.element.nativeElement);

        this.trackWidthRange = this.getTrackWidthRange();

        this.jumpToPosition(event.clientX, this.trackWidthRange);

        this.freeMouseUpListener =
            this.renderer.listenGlobal(
                'document',
                'mouseup',
                (mouseEvent: MouseEvent) => {
                    this.onMouseUp(mouseEvent);
                });
        this.freeMouseMoveListener =
            this.renderer.listenGlobal(
                'document',
                'mousemove',
                (mouseEvent: MouseEvent) => {
                    this.onMouseMove(mouseEvent);
                });
    }

    public onMouseUp(event: MouseEvent): void {
        console.log('onMouseeUp()');
        // free up the listening to mouse up from <body> now that it happened
        // until the next time we click on the progress-bar
        this.freeMouseUpListener();
        this.freeMouseMoveListener();
        this.progress =
            this.computeProgress(event.clientX, this.trackWidthRange);
        this.changeEnd.emit(this.progress);
    }

    public onMouseMove(event: MouseEvent): void {
        this.jumpToPosition(event.clientX, this.trackWidthRange);
    }

    public onSliderTouchMove(event: TouchEvent): void {
        this.jumpToPosition(event.touches[0].clientX, this.trackWidthRange);
    }

    public onSliderTouchStart(event: TouchEvent): void {
        this.trackWidthRange = this.getTrackWidthRange();
    }

    public onSliderTouchEnd(event: TouchEvent): void {
        // If we uncomment this block below, then in the browser we get
        // double-calls to the changeEnd event on mouseUp and touchEnd -
        // both get called... not sure if we need touchEnd at all,
        // commenting it out until we test on mobile. If mobile browser
        // handles the mouseUp event on touchEnd then we're all set and
        // can get rid of this function altogether. Otherwise, we'd have
        // to somehow make sure we don't get double event firings.
        // this.progress =
        //     this.computeProgress(
        //         event.touches[0].clientX,
        //         this.trackWidthRange);
        // this.changeEnd.emit(this.progress);
        console.log('onSliderTouchEnd(): ' + this.progress);
    }
}
