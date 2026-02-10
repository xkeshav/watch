import { describe, it, expect, vi, beforeEach } from "vitest";
import { watchThis } from "../src/Watch";

describe("watchThis", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls console.log with provided value", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const groupSpy = vi
      .spyOn(console, "groupCollapsed")
      .mockImplementation(() => {});
    const endSpy = vi.spyOn(console, "groupEnd").mockImplementation(() => {});

    watchThis({ a: 1 }, { kind: "log", from: "test" });

    expect(groupSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith({ a: 1 });
    expect(endSpy).toHaveBeenCalled();
  });

  it("uses console.warn when kind is warn", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "groupCollapsed").mockImplementation(() => {});
    vi.spyOn(console, "groupEnd").mockImplementation(() => {});

    watchThis("warning", { kind: "warn" });

    expect(warnSpy).toHaveBeenCalledWith("warning");
  });
});
