import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { ButtonbarButton, ButtonBar } from './button-bar';

let FIXTURE: ComponentFixture<ButtonBar> = null;
let INSTANCE: any = null;
let ACTION: string = '';

const BUTTONS: ButtonbarButton[] = [{
        text: 'Info',
        leftIcon: 'information-circle',
        clickCB: () => {
            ACTION = 'info';
        }
    },
    {
        text: 'Move',
        leftIcon: 'share-alt',
        rightIcon: 'folder',
        clickCB: () => {
            ACTION = 'move';
        },
        disabledCB: () => {
            return false;
        }
    },
    {
        text: 'Delete',
        leftIcon: 'trash',
        clickCB: () => {
            ACTION = 'delete';
        },
        disabledCB: () => {
            return false;
        }
    },
    {
        text: 'Share',
        leftIcon: 'md-share',
        clickCB: () => {
            ACTION = 'share';
        }
    }
];

describe('ButtonBar', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([ButtonBar])
        .then(compiled => {
            FIXTURE = compiled.fixture;
            INSTANCE = compiled.instance;
            INSTANCE.buttons = BUTTONS;
        })));

    afterEach(() => {
        FIXTURE.destroy();
    });

    it('initialises', () => {
        expect(INSTANCE).not.toBeNull();
    });

    it('has correct text on all buttons', () => {
        FIXTURE.detectChanges();
        const nodes: NodeList = FIXTURE.nativeElement.querySelectorAll('button');

        expect(nodes.item(0).textContent.trim()).toEqual('Info');
        expect(nodes.item(1).textContent.trim()).toEqual('Move');
        expect(nodes.item(2).textContent.trim()).toEqual('Delete');
        expect(nodes.item(3).textContent.trim()).toEqual('Share');
    });

    it('can click each button to call some function', () => {
        FIXTURE.detectChanges();
        const nodes: NodeList = FIXTURE.nativeElement.querySelectorAll('button');

        TestUtils.eventFire(nodes[0], 'click');
        expect(ACTION).toEqual('info')

        TestUtils.eventFire(nodes[1], 'click');
        expect(ACTION).toEqual('move')

        TestUtils.eventFire(nodes[2], 'click');
        expect(ACTION).toEqual('delete')

        TestUtils.eventFire(nodes[3], 'click');
        expect(ACTION).toEqual('share')
    });
});
