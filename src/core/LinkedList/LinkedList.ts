import { Node } from "../Node/Node";

export class LinkedList<T> {
    public head: Node<T> | null;

    constructor() {
        this.head = null;
    }

    add = (value: T) => {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let cursor = this.head;

            while (cursor.next) {
                cursor = cursor.next;
            }

            cursor.next = newNode;
        }
    };

    remove = (value: T) => {
        if (this.head === null) {
            return;
        }

        if (this.head.value === value) {
            this.head = this.head.next;

            return;
        }

        let cursor = this.head;
        let prev: Node<T> | null = null;

        if (cursor !== null && cursor.value !== value && cursor.next !== null) {
            prev = cursor;
            cursor = cursor.next;
        }

        if (cursor === null) {
            return;
        }

        if (prev !== null) {
            prev.next = cursor.next;
        }
    };
}
