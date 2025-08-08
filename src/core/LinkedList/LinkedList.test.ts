import { describe, it, expect, beforeEach } from "vitest";

import { LinkedList } from "./LinkedList";

describe("LinkedList", () => {
    let list: LinkedList<number>;

    beforeEach(() => {
        list = new LinkedList<number>();
    });

    it("should initialize with null head", () => {
        expect(list.head).toBeNull();
    });

    it("should add a node to an empty list", () => {
        list.add(1);
        expect(list.head?.value).toBe(1);
        expect(list.head?.next).toBeNull();
    });

    it("should add multiple nodes in order", () => {
        list.add(1);
        list.add(2);
        list.add(3);

        expect(list.head?.value).toBe(1);
        expect(list.head?.next?.value).toBe(2);
        expect(list.head?.next?.next?.value).toBe(3);
        expect(list.head?.next?.next?.next).toBeNull();
    });

    it("should remove head node", () => {
        list.add(1);
        list.add(2);
        list.remove(1);
        expect(list.head?.value).toBe(2);
    });

    it("should remove a middle node", () => {
        list.add(1);
        list.add(2);
        list.add(3);
        list.remove(2);

        expect(list.head?.value).toBe(1);
        expect(list.head?.next?.value).toBe(3);
    });

    it("should remove the last node", () => {
        list.add(1);
        list.add(2);
        list.remove(2);

        expect(list.head?.value).toBe(1);
        expect(list.head?.next).toBeNull();
    });

    it("should do nothing if trying to remove from an empty list", () => {
        expect(() => list.remove(1)).not.toThrow();
        expect(list.head).toBeNull();
    });

    it("should do nothing if value not found", () => {
        list.add(1);
        list.remove(2);
        expect(list.head?.value).toBe(1);
    });

    it("should handle removal when only one node exists", () => {
        list.add(42);
        list.remove(42);
        expect(list.head).toBeNull();
    });

    // 🧪 Performance: Add 10,000 nodes
    it("performance: adding 10,000 nodes", () => {
        const COUNT = 10000;
        const start = performance.now();

        for (let i = 0; i < COUNT; i++) {
            list.add(i);
        }

        const end = performance.now();
        const time = end - start;

        console.log(`⏱️ Added ${COUNT} nodes in ${time.toFixed(2)} ms`);

        expect(time).toBeLessThan(100); // adjust threshold as needed
    });

    // 🧪 Workload: Add and remove 10,000 nodes
    it("workload: add and remove 10,000 nodes", () => {
        const COUNT = 10000;

        for (let i = 0; i < COUNT; i++) {
            list.add(i);
        }

        for (let i = 0; i < COUNT; i++) {
            list.remove(i);
        }

        expect(list.head).toBeNull();
    });
});
