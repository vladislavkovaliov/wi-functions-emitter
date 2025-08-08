import { describe, it, expect, vi, beforeEach } from "vitest";

import { Transport } from "./Transport";

describe("Transport", () => {
    let transport: Transport;

    beforeEach(() => {
        transport = new Transport();
    });

    it("should add and call listener", () => {
        const callback = vi.fn();
        const action = "test-action";

        transport.addListener(action, callback);
        transport.sendMessage({ action, payload: "Hello" });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({ action, payload: "Hello" });
    });

    it("should remove listener", () => {
        const callback = vi.fn();
        const action = "remove-action";

        transport.addListener(action, callback);
        transport.removeListener(action, callback);
        transport.sendMessage({ action, payload: "Hello" });

        expect(callback).not.toHaveBeenCalled();
    });

    it("should only call once listener once and remove all", () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const action = "once-action";

        transport.once(action, callback1);
        transport.addListener(action, callback2); // will be removed too

        transport.sendMessage({ action, payload: "One-time call" });
        transport.sendMessage({ action, payload: "Second call" });

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1); // gets called once before being removed
    });

    it("should not throw when sending to unknown action", () => {
        expect(() => {
            transport.sendMessage({ action: "unknown", payload: "data" });
        }).not.toThrow();
    });

    // 🧪 Workload testing
    it("should handle many listeners and messages", () => {
        const NUM_LISTENERS = 1000;
        const NUM_MESSAGES = 100;

        const spies = Array.from({ length: NUM_LISTENERS }, () => vi.fn());
        const action = "bulk-action";

        spies.forEach((cb) => transport.addListener(action, cb));

        for (let i = 0; i < NUM_MESSAGES; i++) {
            transport.sendMessage({ action, payload: i });
        }

        spies.forEach((cb) => {
            expect(cb).toHaveBeenCalledTimes(NUM_MESSAGES);
        });
    }, 10000); // optional timeout

    // 🧪 Performance test (rough benchmark)
    it("performance: sending message to 10k listeners", async () => {
        const NUM = 10000;
        const action = "perf-action";

        for (let i = 0; i < NUM; i++) {
            transport.addListener(action, () => {});
        }

        const start = performance.now();

        transport.sendMessage({ action, payload: "ping" });

        const end = performance.now();
        const elapsed = end - start;

        console.log(
            `⏱️  Sent message to ${NUM} listeners in ${elapsed.toFixed(2)} ms`,
        );

        expect(elapsed).toBeLessThan(300); // Adjust threshold as needed
    });
});
