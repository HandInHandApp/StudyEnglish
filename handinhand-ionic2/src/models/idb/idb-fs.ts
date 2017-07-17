// Copyright (c) 2017 Tracktunes Inc

import { Idb } from './idb';
import { Observable } from 'rxjs/Rx';
import { isPositiveWholeNumber, isUndefined, prependArray } from
    '../../models/utils/utils';

const NODE_STORE: string = 'storeIdbFS';
export const ROOT_FOLDER_KEY: number = 1;

///////////////////////////////////////////////////////////////////////////////
/// START: Public API
///////////////////////////////////////////////////////////////////////////////

export const DB_KEY_PATH: string = 'id';

export interface TreeNode {
    name: string;
    parentKey: number;
    timeStamp: number;
    data?: any;
    childOrder?: number[];
    path?: string;
}

export interface ParentChild {
    parent: TreeNode;
    child: TreeNode;
}

export interface KeyDict {
    [id: string]: TreeNode;
}

export interface KeysDict {
    [id: string]: TreeNode[];
}

export class IdbFS extends Idb {

    constructor(dbName: string, dbVersion: number) {
        super({
            name: dbName,
            version: dbVersion,
            storeConfigs: [{
                name: NODE_STORE,
                indexConfigs: [{
                        name: 'name',
                        unique: false
                    },
                    {
                        name: 'parentKey',
                        unique: false
                    },
                    {
                        name: 'timeStamp',
                        unique: true
                    }
                ]
            }]
        });

        this.waitForFilesystem().subscribe(
            null,
            (error) => {
                throw Error('constructor(): ' + error);
            }
        );
    }

    // read or create root folder, returns Observable<void> that ends
    // when filesystem is ready for use
    public waitForFilesystem(): Observable<void> {
        let source: Observable<void> = Observable.create((observer) => {
            this.waitForDB().subscribe(
                (db: IDBDatabase) => {
                    this.read <TreeNode>(NODE_STORE, ROOT_FOLDER_KEY).subscribe(
                        (rootNode: TreeNode) => {
                            if (rootNode) {
                                observer.next();
                                observer.complete();
                            }
                            else {
                                let newNode: TreeNode = IdbFS.makeTreeNode('');
                                newNode[DB_KEY_PATH] = 1;
                                if (!newNode.childOrder) {
                                    console.warn('no childOrder in root!');
                                }
                                this.create <TreeNode>(NODE_STORE, newNode)
                                    .subscribe(
                                        (key: number) => {
                                            if (key !== ROOT_FOLDER_KEY) {
                                                observer.error('root key not ' +
                                                    ROOT_FOLDER_KEY);
                                            }
                                            else {
                                                observer.next();
                                                observer.complete();
                                            }
                                        },
                                        (error) => {
                                            observer.error(
                                                'waitForFilesystem():' +
                                                'waitForDB():readNode():' +
                                                'create(): ' + error);
                                        });
                            }
                        },
                        (error) => {
                            observer.error('waitForFilesystem():waitForDB():' +
                                'readNode(): ' + error);
                        });
                },
                (error) => {
                    observer.error('waitForFilesystem():waitForDB() ' + error);
                });
        });
        return source;
    }

    public static isDataNode(treeNode: TreeNode): boolean {
        return !IdbFS.isFolderNode(treeNode);
    }

    public static isFolderNode(treeNode: TreeNode): boolean {
        return isUndefined(treeNode['data']);
    }

    // if you supply data it's a data node, otherwise it's a folder node
    // if you do not supply a parent key it's a root node
    public static makeTreeNode(
        name: string,
        parentKey?: number,
        data?: any
    ): TreeNode {
        let treeNode: TreeNode = {
            name: name,
            parentKey: parentKey,
            timeStamp: Date.now()
        };
        treeNode.parentKey = isPositiveWholeNumber(parentKey) ?
            parentKey : null;

        if (data) {
            // this is a data node
            treeNode.data = data;
        }
        else {
            // this is a tree node
            treeNode.path = '';
            treeNode.childOrder = [];
        }
        return treeNode;
    };

    // just check localdb for the api

    // creates either a folder or a data node, depending on data
    // returns Observable<ParentChild> of both the newly created
    // child TreeNode and the (existing)  parent TreeNode, which has an
    // updated childOrder.
    // Note that we require a parentKey.  Since this db is created with
    // a root (foler) node there is always a parent (key) where you can
    // create a new node.
    public createNode(
        name: string,
        parentKey: number,
        data?: any
    ): Observable<ParentChild> {
        let source: Observable<ParentChild> = Observable.create((observer) => {
            let childNode: TreeNode =
                IdbFS.makeTreeNode(name, parentKey, data);
            this.create <TreeNode>(
                NODE_STORE,
                childNode,
                (node: TreeNode, key: number) => {
                    node[DB_KEY_PATH] = key;
                    return node;
                }
            ).subscribe(
                (childKey: number) => {
                    this.attachToParent(childKey, childNode).subscribe(
                        (parentNode: TreeNode) => {
                            observer.next({
                                parent: parentNode,
                                child: childNode
                            });
                            observer.complete();
                        },
                        (error) => {
                            observer.error(
                                'createNode():create():attachToParent(): ' +
                                error);
                        }); // attachToParent().subscribe(
                },
                (error) => {
                    observer.error('createNode():create(): ' + error);
                }); // this.create<TreeNode>().subscribe(
        });
        return source;
    }

    // returns Observable<TreeNode>
    // public readNode(key: number): Observable<TreeNode> {
    //     return this.read<TreeNode>(NODE_STORE, key);
    // }
    /**
     * Reads a node into memory from db, by key
     * @param {number} key - the key of the node to read from db
     * @returns {Observable<TreeNode>} an observable that emits the
     * TreeNode read.
     */
    public readNode(key: number): Observable<TreeNode> {
        let source: Observable<TreeNode> = Observable.create((observer) => {
            this.read <TreeNode>(NODE_STORE, key).subscribe(
                (treeNode: TreeNode) => {
                    // if (treeNode === undefined || !treeNode) {
                    //     observer.error('node does not exist');
                    // }
                    // treeNode[DB_KEY_PATH] = key;
                    observer.next(treeNode);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                }
            ); // this.read().subscribe(
        });
        return source;
    }

    /**
     * @param {TreeNode} parent node
     * @returns {Observable<TreeNode[]>} observable of an array of TreeNode
     * objects whose ids are children of parentNode
     */
    public readChildNodes(parentNode: TreeNode): Observable<TreeNode[]> {
        return this.readNodesById(parentNode.childOrder);
    }

    public readOrCreateNode(
        key: number,
        name: string,
        parentKey: number
    ): Observable<TreeNode> {
        let source: Observable<TreeNode> = Observable.create((observer) => {
            // first we try to get the value
            this.readNode(key).subscribe(
                (readNode: TreeNode) => {
                    if (readNode) {
                        console.log('readOrCreateNode(): successfull read');
                        observer.next(readNode);
                        observer.complete();
                    }
                    else {
                        console.log('readOrCreateNode(): UNsuccessfull read');
                        this.createNode(name, parentKey).subscribe(
                            (parentChild: ParentChild) => {
                                observer.next(parentChild.child);
                                observer.complete();
                            },
                            (error) => {
                                observer.error('readOrCreateNode(): create' +
                                    error);
                            });
                    }
                }
            );
        });
        return source;
    }

    // returns Observable<void> when done
    public updateNode(key: number, changes: Object): Observable<void> {
        return this.update(NODE_STORE, key, changes);
    }

    /**
     * Delete a collection of unique TreeNodes provided as a dictionary
     * @param {KeyDict} keyDict - collection of unique TreeNodes
     * @returns {Observable<void>} - observable that emits after deletion has
     * completed successfully
     */
    public deleteNodes(keyDict: KeyDict): Observable<void> {
        let source: Observable<void> = Observable.create((observer) => {
            this.detachForDeleteNodes(keyDict).subscribe(
                (detachedKeyDict: Object) => {
                    let nNodes: number = Object.keys(keyDict).length,
                        nDeleted: number = 0;
                    for (let key in keyDict) {
                        this.delete(NODE_STORE, parseInt(key)).subscribe(
                            () => {
                                nDeleted++;
                                if (nDeleted === nNodes) {
                                    observer.next();
                                    observer.complete();
                                }
                            },
                            (error) => {
                                observer.error('deleteNodes():' +
                                    'detachForDeleteNodes():delete(): ' +
                                    error);
                            }
                        );
                    }
                }
            );
        });
        return source;
    }

    /**
     * @param {number[]} nodeKeys an array of node keys
     * @returns {Observable<TreeNode[]>} observable of an array of TreeNode
     * objects whose ids are in nodeKeys
     */
    public readNodesById(nodeKeys: number[]): Observable<TreeNode[]> {
        let source: Observable<TreeNode[]> = Observable.create((observer) => {
            let childNodes: TreeNode[] = [];
            // asynchronously read childOrder array  nodes, emits TreeNode[]
            this.ls(nodeKeys).subscribe(
                (node: TreeNode) => {
                    childNodes.push(node);
                },
                (error: any) => {
                    observer.error(error);
                },
                () => {
                    observer.next(childNodes);
                    observer.complete();
                }
            );
        });
        return source;
    }

    // Returns an Observable<TreeNode[]> of all nodes obtained by name
    // regardless of where they are in the tree - this is a way to use
    // the tree as a key/value pair, by the way: just put the key in
    // name and the value goes in the data object of the node.  If nodes
    // by name 'name' exist under any parent, returns an array of them
    // in Observable<Treenode[]>. Note that this should be efficient,
    // because (a) there is an index on 'name' field, (b) most names
    // are unique, because we don't allow two nodes by the
    // same name to be in the same folder so if you have X unique names,
    // there must be at least X folders in the database and the number of
    // folders grows much slower than the number of data nodes, typically.
    public readNodesByName(name: string): Observable<TreeNode[]> {
        let source: Observable<TreeNode[]> = Observable.create((observer) => {
            let nodes: TreeNode[] = [];
            this.getStore(NODE_STORE, 'readonly').subscribe(
                (store: IDBObjectStore) => {
                    let index: IDBIndex = store.index('name'),
                        keyRange: IDBKeyRange = IDBKeyRange.only(name),
                        cursorRequest: IDBRequest = index.openCursor(keyRange);

                    cursorRequest.onsuccess = (event: ErrorEvent) => {
                        let cursor: IDBCursorWithValue = cursorRequest.result;
                        if (cursor) {
                            nodes.push(cursor.value);
                            cursor.continue();
                        }
                        else {
                            observer.next(nodes);
                            observer.complete();
                        }
                    };
                    cursorRequest.onerror = (event: ErrorEvent) => {
                        observer.error('readNodesByName(): cursor error');
                    };
                },
                (error) => {
                    observer.error('readNodesByName(): ' + error);
                }
            ); // this.getStore(DB_TREE_STORE_NAME, 'readonly').subscribe(
        });
        return source;
    }

    // Returns an Observable<TreeNode> of node read by name 'name'
    // in parent folder whose key is 'parentKey'.  If such a node does
    // not exist the TreeNode object returned is null.
    public readNodeByNameInParent(
        name: string,
        parentKey: number
    ): Observable<TreeNode> {
        let source: Observable<TreeNode> = Observable.create((observer) => {
            this.readNodesByName(name).subscribe(
                (nodes: TreeNode[]) => {
                    let nodeFound: TreeNode = null,
                        nFound: number = 0,
                        i: number;
                    for (i = 0; i < nodes.length; i++) {
                        if (nodes[i].parentKey === parentKey) {
                            nodeFound = nodes[i];
                            nFound++;
                            if (nFound > 1) {
                                break;
                            }
                        }
                    }
                    if (nFound > 1) {
                        observer.error(
                            'getNodesByNameInParent(): unique name violation'
                        );
                    }
                    else {
                        observer.next(nodeFound);
                        observer.complete();
                    }
                },
                (error) => {
                    observer.error('getNodesByNameInParent(): ' + error);
                }
            ); // readNodesByName().subscribe(
        });
        return source;
    }

    /**
     * Same as getSubtreeNodes(), but instead of returning an observable stream
     * collects the entire list of subtree nodes and returns them in one single
     * array, emitted by an observable when all its elements are available.
     * @param {TreeNode} node - the node whose subtree we're getting
     * @return Observable<TreeNode[]> Observable that emits when the array of
     * all subtree nodes has been traversed in the db.
     */
    public getSubtreeNodesArray(node: TreeNode): Observable<TreeNode[]> {
        let source: Observable<TreeNode[]> = Observable.create((observer) => {
            let nodes: TreeNode[] = [];
            this.getSubtreeNodes(node).subscribe(
                (subtreeNode: TreeNode) => {
                    nodes.push(subtreeNode);
                },
                (error) => {
                    observer.error(error);
                },
                () => {
                    observer.next(nodes);
                    observer.complete();
                }
            );
        });
        return source;
    }

    ///////////////////////////////////////////////////////////////////////////
    /// END: Public API
    ///////////////////////////////////////////////////////////////////////////

    // returns observable of parent node (updated with new child order)
    private attachToParent(
        childKey: number,
        childNode: TreeNode
    ): Observable<TreeNode> {
        let source: Observable<TreeNode> = Observable.create((observer) => {
            // you have to read the existing child order first,
            // in order to add to the front of it
            this.readNode(childNode.parentKey).subscribe(
                (parentNode: TreeNode) => {
                    // push newly created nodes to the front of
                    // the parent childOrder list
                    parentNode.childOrder = prependArray(
                        childNode[DB_KEY_PATH],
                        parentNode.childOrder);
                    // now you update the node with new childOrder
                    this.update <TreeNode>(
                        NODE_STORE,
                        childNode.parentKey,
                        parentNode).subscribe(
                        () => {
                            // update childNode's path
                            if (IdbFS.isFolderNode(childNode)) {
                                childNode.path = parentNode.path + '/' +
                                    parentNode.name;
                                this.update <TreeNode>(
                                    NODE_STORE,
                                    childKey,
                                    childNode).subscribe(
                                    () => {
                                        observer.next(parentNode);
                                        observer.complete();
                                    },
                                    (error) => {
                                        observer.error('attachToParent():' +
                                            'readNode()update():update(): ' +
                                            error);
                                    }); // updateNode(childNode).subscribe(
                            }
                            else {
                                // non-folder node, not updating path
                                observer.next(parentNode);
                                observer.complete();
                            }
                        },
                        (error) => {
                            observer.error(
                                'attachToParent():readNode():update(): ' +
                                error);
                        }); // updateNode().subscribe(
                },
                (error) => {
                    observer.error('attachToParent():readNode(): ' + error);
                }); // readNode().subscribe(
        });
        return source;
    }

    /**
     * Given a collection of unique TreeNodes provided as a dictionary,
     * detach any of those nodes from any parents that aren't already a part
     * of the original collection - detach only from parents outside the
     * collection.
     * @param {KeyDict} keyDict - collection of unique TreeNodes
     * @returns {Observable<KeyDict>} - same type as input
     * (keyDict) but expanded with potentially more (contained) nodes
     */
    private detachForDeleteNodes(keyDict: KeyDict): Observable<KeyDict> {
        let source: Observable<KeyDict> = Observable.create((observer) => {
            this.expandKeyDict(keyDict).subscribe(
                (expandedKeyDict: KeyDict) => {
                    let i: number,
                        keys: string[] = Object.keys(expandedKeyDict),
                        nNodes: number = keys.length,
                        node: TreeNode,
                        toDetach: TreeNode[] = [];
                    // fill up toDetach and toNotDetach
                    for (i = 0; i < nNodes; i++) {
                        node = expandedKeyDict[keys[i]];
                        // check if any parent of any node in our
                        // delete list is *not* in the list
                        if (!expandedKeyDict[node.parentKey]) {
                            // if a parent is not in the list it
                            // needs to be updated (detached)
                            toDetach.push(node);
                        }
                    }
                    // detach
                    this.detachNodesFromParents(toDetach).subscribe(
                        () => {
                            observer.next(expandedKeyDict);
                            observer.complete();
                        },
                        (error) => {
                            observer.error(error);
                        }
                    ); // detachNodesFromParents().subscribe(
                }
            );
        });
        return source;
    }

    /**
     * Given a collection of unique TreeNodes provided as a dictionary,
     * recursively expand the collection to include anything contained by the
     * TreeNode collection
     * @param {KeyDict} keyDict - collection of unique TreeNodes
     * @returns {Observable<KeyDict>} - same type as input
     * (keyDict) but expanded with potentially more (contained) nodes
     */
    private expandKeyDict(keyDict: KeyDict): Observable<KeyDict> {
        let source: Observable<KeyDict> = Observable.create((observer) => {
            // add nodes supplied argument nodes into the keyDict
            // if a node is a folder node, we get its subtree and
            // add those to the keydict as well, we're done when
            // all folder nodes have been included in keyDict, this
            // means we need two loops - the first one counts how
            // many folders we have, the second one subscribes to
            // the observables with a termination condition based
            // on how many folders have been processed
            let keys: string[] = Object.keys(keyDict),
                nNodes: number = keys.length,
                i: number, j: number,
                nFolders: number = 0,
                nFoldersProcessed: number = 0,
                node: TreeNode;
            // count nFolders
            for (i = 0; i < nNodes; i++) {
                node = keyDict[keys[i]];
                if (IdbFS.isFolderNode(node)) {
                    nFolders++;
                }
            }
            // second loop - subscribe and add
            for (i = 0; i < nNodes; i++) {
                node = keyDict[keys[i]];
                if (IdbFS.isFolderNode(node)) {
                    // TODO: we can make things slightly more efficient here
                    // by not calling anything if folder is empty
                    this.getSubtreeNodesArray(node).subscribe(
                        (subtreeNodes: TreeNode[]) => {
                            for (j = 0; j < subtreeNodes.length; j++) {
                                node = subtreeNodes[j];
                                keyDict[node[DB_KEY_PATH]] = node;
                            }
                            nFoldersProcessed++;
                            if (nFoldersProcessed === nFolders) {
                                observer.next(keyDict);
                                observer.complete();
                            }
                        },
                        (error) => {
                            observer.error(error);
                        }
                    ); // getSubtreeNodesArray(node).subscribe(
                }
                else {
                    // for data nodes we just return keyDict as is
                    // i.e. we do nothing
                    observer.next(keyDict);
                    observer.complete();
                }
            } // if (IdbFS.isFolderNode(node)) { .. else { ..
        });
        return source;
    }

    /**
     * Returns a stream Observable<TreeNode> that emits a new TreeNode
     * that is one of the input's childern (obviously, input must be a
     * folder TreeNode then) - the stream of observables is of children
     * of the given TreeNode.
     * @param {TreeNode} node - the node to list
     * @returns {Observable<TreeNode>} observable that emits one at a
     * time the children of 'node'
     */
    private lsNode(node: TreeNode): Observable<TreeNode> {
        return this.ls(node.childOrder);
    }

    /**
     * Returns whether the input (TreeNode) is a leaf node or not.  A leaf
     * node is one that's either an empty folder or a data node.
     * @param {TreeNode} node - the node to check
     * @returns {boolean} whether the node is a leaf node or not
     */
    private isLeaf(node: TreeNode): boolean {
        // returns true or false depending on if it's a leaf node.
        // a leaf node is either a data node or an empty folder node
        return IdbFS.isDataNode(node) || !node.childOrder.length;
    }

    /**
     * Traverses a tree recursively. Based on
     * https://www.reddit.com/r/javascript/comments/3abv2k/ ...
     *      ... /how_can_i_do_a_recursive_readdir_with_rxjs_or_any/
     * @returns Observable<TreeNode> Observable of all subtree nodes of
     * input folder TreeNode
     */
    private getSubtreeNodes(node: TreeNode): Observable<TreeNode> {
        return this.lsNode(node)
            .expand <TreeNode>((childNode: TreeNode) =>
                this.isLeaf(childNode) ?
                <
                Observable<TreeNode>> Observable.empty() :
                this.lsNode(childNode));
    }

    private detachNodesFromParent(
        childNodes: TreeNode[]
    ): Observable<TreeNode> {
        let source: Observable<TreeNode> = Observable.create((observer) => {
            let nNodes: number = childNodes.length;
            if (nNodes === 0) {
                // verify that some nodes were supplied
                observer.error('called detach with empty list');
            }
            else {
                // verify all nodes have the same parent
                let parentKey: number = childNodes[0].parentKey;
                if (childNodes.filter(x => x.parentKey === parentKey).length !==
                    nNodes) {
                    observer.error('not all children have same parent');
                }
                else {
                    this.readNode(parentKey).subscribe(
                        (parentNode: TreeNode) => {
                            let i: number,
                                childOrder: number[] = parentNode.childOrder,
                                childIndex: number = -1,
                                childKey: number,
                                errorFound: boolean;
                            for (i = 0; i < nNodes; i++) {
                                childKey = childNodes[i][DB_KEY_PATH];
                                childIndex = childOrder.indexOf(childKey);
                                if (childIndex === -1) {
                                    errorFound = true;
                                    break;
                                }
                                else {
                                    // shorten parent's childOrder
                                    childOrder.splice(childIndex, 1);
                                }
                            }
                            if (errorFound) {
                                observer.error('child not in parent!');
                            }
                            else {
                                parentNode.childOrder = childOrder;
                                // now you update the node with new childOrder
                                // this.updateNode(parentNode).subscribe(
                                this.update <TreeNode>(
                                    NODE_STORE,
                                    parentNode[DB_KEY_PATH],
                                    parentNode
                                ).subscribe(
                                    () => {
                                        observer.next(parentNode);
                                        observer.complete();
                                    },
                                    (error: any) => {
                                        observer.error(error);
                                    }); // updateNode().subscribe(
                            }
                        },
                        (error: any) => {
                            observer.error(error);
                        }
                    ); // readNode().subscribe(
                }
            }
        });
        return source;
    }

    private detachNodesFromParents(nodes: TreeNode[]): Observable<void> {
        let source: Observable<void> = Observable.create((observer) => {
            // 1) group parents
            let i: number,
                childNode: TreeNode,
                nNodes: number = nodes.length,
                parentsDetachers: KeysDict = {};
            for (i = 0; i < nNodes; i++) {
                childNode = nodes[i];
                if (!isPositiveWholeNumber(childNode.parentKey)) {
                    // this child has no parent so skip it.  an example of a
                    // child that has no parents is a folder created at the
                    // root level
                    continue;
                }
                if (!parentsDetachers[childNode.parentKey]) {
                    parentsDetachers[childNode.parentKey] = [childNode];
                }
                else {
                    parentsDetachers[childNode.parentKey].push(childNode);
                }
            }
            // 2) go through parents, fix'em up (childOrder fix)
            // read parents one by one, fix them one by one,
            // update them one by one - there is no reason to do
            // things in batch here because there is nothing that can
            // be done more efficiently in batch here anyway
            let parentKeys: string[] = Object.keys(parentsDetachers),
                nParents: number = parentKeys.length,
                nParentsProcessed: number = 0;

            // it is possible, with the filtering (of child nodes at root)
            // done above, that there is no parent to detach from ...
            if (nParents) {
                for (i = 0; i < nParents; i++) {
                    // INV: parentsDetachers[parentKeys[i]] is always
                    // going to be a non empty array
                    this.detachNodesFromParent(parentsDetachers[parentKeys[i]])
                        .subscribe(
                            () => {
                                nParentsProcessed++;
                                if (nParentsProcessed === nParents) {
                                    observer.next();
                                    observer.complete();
                                }
                            },
                            (error) => {
                                observer.error(error);
                            }
                        );
                } // for (i = 0; i < nParents; i++) {
            }
            else {
                observer.next();
                observer.complete();
            }
        });

        return source;
    }

    /**
     * Returns a stream Observable<TreeNode> that emits a new TreeNode on
     * each request that's got the key of one of the nodeKeys keys
     * @returns {Observable<TreeNode>} observable that emits one at a
     * time one of the nodes with keys in 'nodeKeys'
     */
    private ls(nodeKeys: number[]): Observable<TreeNode> {
        return <Observable<TreeNode>> Observable.from(nodeKeys)
            .flatMap((key: number) => this.readNode(key));
    }

}
