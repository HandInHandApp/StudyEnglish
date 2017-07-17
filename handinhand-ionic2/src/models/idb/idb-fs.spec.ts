// Copyright (c) 2016 Tracktunes Inc

import { IdbFS, TreeNode, KeyDict, DB_KEY_PATH, ParentChild } from './idb-fs';

const DB_NAME: string = 'testIdbFS';
const DB_VERSION: number = 1;
const WAIT_MSEC: number = 60;

let rootFolder: TreeNode,
    folder1: TreeNode,
    folder3: TreeNode,
    folder5: TreeNode,
    folder8: TreeNode,
    item2: TreeNode,
    item4: TreeNode,
    item6: TreeNode,
    item7: TreeNode,
    idbFS: IdbFS = new IdbFS(DB_NAME, DB_VERSION);

beforeEach((done: Function) => {
    idbFS.waitForDB().subscribe(
        () => {
            done();
        },
        (error) => {
            fail(error);
        });
});

describe('services/idb:IdbFS', () => {
    it('initializes', (done) => {
        setTimeout(
            () => {
                expect(idbFS).not.toBeFalsy();
                done();
            },
            WAIT_MSEC);
    });

    it('can make nodes and test them', (done) => {
        setTimeout(
            () => {
                // verify folder node creation
                let node: TreeNode = IdbFS.makeTreeNode('test');
                expect(IdbFS.isFolderNode(node)).toBe(true);
                expect(IdbFS.isDataNode(node)).toBe(false);
                expect(node['parentKey']).toBe(null);
                expect(node['data']).toBe(undefined);
                expect(node[DB_KEY_PATH]).toBeUndefined();

                // invalid parentKey tests
                node['parentKey'] = 0;
                try {
                    IdbFS.makeTreeNode('test', 0, 'data');
                }
                catch (error) {
                    expect(error.toString())
                        .toEqual('Error: makeTreeNode(): invalid parentKey');
                }
                try {
                    IdbFS.makeTreeNode('test', 1.1, 'data');
                }
                catch (error) {
                    expect(error.toString())
                        .toEqual('Error: makeTreeNode(): invalid parentKey');
                }
                try {
                    IdbFS.makeTreeNode('test', Infinity, 'data');
                }
                catch (error) {
                    expect(error.toString())
                        .toEqual('Error: makeTreeNode(): invalid parentKey');
                }

                // verify data node creation
                node = IdbFS.makeTreeNode('test', 4444, 'testData');
                expect(IdbFS.isFolderNode(node)).toEqual(false);
                expect(IdbFS.isDataNode(node)).toEqual(true);
                expect(node.parentKey).toEqual(4444);
                expect(node.data).toEqual('testData');
                done();
            },
            WAIT_MSEC);
    });

    it('can read root folder', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(1).subscribe(
                    (rootNode: TreeNode) => {
                        rootFolder = rootNode;
                        expect(rootFolder.childOrder).toBeDefined();
                        expect(rootFolder[DB_KEY_PATH]).toBe(1);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create folder1, child of root', (done) => {
        setTimeout(
            () => {
                idbFS.createNode('folder1', 1).subscribe(
                    (parentChild: ParentChild) => {
                        folder1 = parentChild.child;
                        expect(folder1.parentKey).toBe(1);
                        expect(folder1.data).toBeUndefined();
                        rootFolder = parentChild.parent;
                        expect(rootFolder[DB_KEY_PATH]).toBe(1);
                        expect(rootFolder.childOrder).toEqual([
                            folder1[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can create item2, child of folder1', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'item2',
                    folder1[DB_KEY_PATH],
                    'item2 datum'
                ).subscribe(
                    (parentChild: ParentChild) => {
                        item2 = parentChild.child;
                        expect(item2.parentKey).toBe(folder1[DB_KEY_PATH]);
                        expect(item2['data']).toBe('item2 datum');
                        expect(item2.timeStamp).not.toBeFalsy();
                        folder1 = parentChild.parent;
                        expect(folder1.childOrder).toEqual([
                            item2[DB_KEY_PATH]
                        ]);
                        expect(item2[DB_KEY_PATH]).toBe(3);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can create folder3, child of folder1', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'folder3',
                    folder1[DB_KEY_PATH]).subscribe(
                    (parentChild: ParentChild) => {
                        folder3 = parentChild.child;
                        expect(folder3.parentKey).toBe(folder1[DB_KEY_PATH]);
                        expect(folder3['data']).toBeUndefined();
                        expect(folder3.name).toEqual('folder3');
                        expect(folder3.timeStamp).not.toBeFalsy();
                        folder1 = parentChild.parent;
                        expect(folder1.childOrder).toEqual([
                            folder3[DB_KEY_PATH],
                            item2[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can create item4, child of folder3', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'item4',
                    folder3[DB_KEY_PATH],
                    'item4 datum').subscribe(
                    (parentChild: ParentChild) => {
                        item4 = parentChild.child;
                        expect(item4.parentKey).toEqual(folder3[DB_KEY_PATH]);
                        expect(item4.name).toEqual('item4');
                        expect(item4.data).toBe('item4 datum');
                        expect(item4.timeStamp).not.toBeFalsy();
                        folder3 = parentChild.parent;
                        expect(folder3.childOrder).toEqual([
                            item4[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create folder5, child of folder3', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'folder5',
                    folder3[DB_KEY_PATH]).subscribe(
                    (parentChild: ParentChild) => {
                        folder5 = parentChild.child;
                        expect(folder5.parentKey).toEqual(
                            folder3[DB_KEY_PATH]);
                        expect(folder5['data']).toBeUndefined();
                        expect(folder5.name).toEqual('folder5');
                        expect(folder5.timeStamp).not.toBeFalsy();
                        folder3 = parentChild.parent;
                        expect(folder3.childOrder).toEqual([
                            folder5[DB_KEY_PATH],
                            item4[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can get child nodes of folder3 and verify them', (done) => {
        setTimeout(
            () => {
                idbFS.readChildNodes(folder3).subscribe(
                    (childNodes: TreeNode[]) => {
                        expect(childNodes.length).toEqual(2);
                        expect(childNodes).toContain(item4);
                        expect(childNodes).toContain(folder5);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create item6, child of folder5', (done) => {
        setTimeout(
            () => {
                idbFS.createNode('item6', folder5[DB_KEY_PATH], 'item6 datum')
                    .subscribe(
                        (parentChild: ParentChild) => {
                            item6 = parentChild.child;
                            expect(item6.parentKey)
                                .toEqual(folder5[DB_KEY_PATH]);
                            expect(item6.name).toEqual('item6');
                            expect(item6.data).toBe('item6 datum');
                            expect(item6.timeStamp).not.toBeFalsy();
                            folder5 = parentChild.parent;
                            expect(folder5.childOrder).toEqual([
                                item6[DB_KEY_PATH]
                            ]);
                            done();
                        },
                        (error) => {
                            fail(error);
                        }
                    );
            },
            WAIT_MSEC);
    });

    it('can create item7, child of folder5', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'item7',
                    folder5[DB_KEY_PATH],
                    'item7 datum').subscribe(
                    (parentChild: ParentChild) => {
                        item7 = parentChild.child;
                        expect(item7.parentKey).toEqual(folder5[DB_KEY_PATH]);
                        expect(item7.name).toEqual('item7');
                        expect(item7.data).toBe('item7 datum');
                        expect(item7.timeStamp).not.toBeFalsy();
                        folder5 = parentChild.parent;
                        expect(folder5.childOrder).toEqual([
                            item7[DB_KEY_PATH],
                            item6[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can create folder8, child of folder5', (done) => {
        setTimeout(
            () => {
                idbFS.createNode(
                    'folder8',
                    folder5[DB_KEY_PATH]).subscribe(
                    (parentChild: ParentChild) => {
                        folder8 = parentChild.child;
                        expect(folder8.parentKey).toEqual(
                            folder5[DB_KEY_PATH]);
                        expect(folder8['data']).toBeUndefined();
                        expect(folder8.name).toEqual('folder8');
                        expect(folder8.timeStamp).not.toBeFalsy();
                        folder5 = parentChild.parent;
                        expect(folder5.childOrder).toEqual([
                            folder8[DB_KEY_PATH],
                            item7[DB_KEY_PATH],
                            item6[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can read item2', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(item2[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode[DB_KEY_PATH]).not.toBeFalsy();
                        expect(treeNode[DB_KEY_PATH]).toEqual(
                            item2[DB_KEY_PATH]);
                        expect(treeNode.parentKey).toEqual(item2.parentKey);
                        expect(treeNode['data']).toEqual(item2['data']);
                        expect(treeNode.name).toEqual(item2.name);
                        expect(treeNode.timeStamp).toEqual(item2.timeStamp);
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('can get folder5 subtree nodes array', (done) => {
        setTimeout(
            () => {
                idbFS.getSubtreeNodesArray(folder5).subscribe(
                    (nodes: TreeNode[]) => {
                        expect(nodes.length).toBe(3);
                        expect(nodes).toContain(item6);
                        expect(nodes).toContain(item7);
                        expect(nodes).toContain(folder8);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can get root folder subtree nodes array', (done) => {
        setTimeout(
            () => {
                idbFS.getSubtreeNodesArray(rootFolder).subscribe(
                    (nodes: TreeNode[]) => {
                        expect(nodes.length).toBe(8);
                        expect(nodes).toContain(folder1);
                        expect(nodes).toContain(item2);
                        expect(nodes).toContain(folder3);
                        expect(nodes).toContain(item4);
                        expect(nodes).toContain(folder5);
                        expect(nodes).toContain(item6);
                        expect(nodes).toContain(item7);
                        expect(nodes).toContain(folder8);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('can delete folder5 folder recursively', (done) => {
        setTimeout(
            () => {
                let keyDict: KeyDict = {};
                keyDict[folder5[DB_KEY_PATH]] = folder5;
                idbFS.deleteNodes(keyDict).subscribe(
                    () => {
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('folder3 now has no child folder5', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(folder3[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode[DB_KEY_PATH]).not.toBeFalsy();
                        expect(treeNode[DB_KEY_PATH]).toEqual(
                            folder3[DB_KEY_PATH]);
                        expect(treeNode.childOrder).toEqual([
                            item4[DB_KEY_PATH]
                        ]);
                        done();
                    },
                    (error) => {
                        fail(error);
                    });
            },
            WAIT_MSEC);
    });

    it('cannot now read folder5', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(folder5[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('cannot now read item6', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(item6[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('cannot now read item7', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(item7[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it(
        'can delete root folder recursively', (done) => {
            setTimeout(
                () => {
                    let keyDict: KeyDict = {};
                    keyDict[rootFolder[DB_KEY_PATH]] = rootFolder;
                    idbFS.deleteNodes(keyDict).subscribe(
                        () => {
                            done();
                        },
                        (error) => {
                            fail(error);
                        }
                    );
                },
                WAIT_MSEC);
        });

    it(
        'cannot now read root folder', (done) => {
            setTimeout(
                () => {
                    idbFS.readNode(rootFolder[DB_KEY_PATH]).subscribe(
                        (treeNode: TreeNode) => {
                            expect(treeNode).toBeUndefined();
                            done();
                        },
                        (error) => {
                            fail(error);
                        }
                    );
                },
                WAIT_MSEC);
        });

    it('cannot now read item2', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(item2[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('cannot now read folder3', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(folder3[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

    it('cannot now read item4', (done) => {
        setTimeout(
            () => {
                idbFS.readNode(item4[DB_KEY_PATH]).subscribe(
                    (treeNode: TreeNode) => {
                        expect(treeNode).toBeUndefined();
                        done();
                    },
                    (error) => {
                        fail(error);
                    }
                );
            },
            WAIT_MSEC);
    });

});
