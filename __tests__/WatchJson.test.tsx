import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { WatchJson } from "../src/WatchJson";

describe("WatchJson", () => {
  it("renders heading", () => {
    render(<WatchJson what="Test Block" data={{ a: 1 }} />);
    expect(screen.getByText("Test Block")).toBeInTheDocument();
  });

  it("shows fallback when empty", () => {
    render(<WatchJson />);
    expect(screen.getByText("Nothing to watch")).toBeInTheDocument();
  });
});
