import { getAllPages } from "../../lib/getAllRequestPages";

describe("\"getAllPages\"", () => {
  it("should return a range of pages", () => {
    expect(getAllPages(1, 0, 1)).toEqual([]);
    expect(getAllPages(1, 10, 2)).toEqual([1, 2, 3, 4, 5, "RIGHT", 10]);
    expect(getAllPages(1, 10, 3)).toEqual([1, 2, 3, 4, 5, "RIGHT", 10]);
    expect(getAllPages(1, 10, 4)).toEqual([1, "LEFT", 3, 4, 5, "RIGHT", 10]);
    expect(getAllPages(1, 10, 5)).toEqual([1, "LEFT", 4, 5, 6, "RIGHT", 10]);
    expect(getAllPages(1, 10, 6)).toEqual([1, "LEFT", 5, 6, 7, "RIGHT", 10]);
    expect(getAllPages(1, 10, 7)).toEqual([1, "LEFT", 6, 7, 8, "RIGHT", 10]);
    expect(getAllPages(1, 10, 8)).toEqual([1, "LEFT", 6, 7, 8, 9, 10]);
    expect(getAllPages(1, 10, 9)).toEqual([1, "LEFT", 6, 7, 8, 9, 10]);
    expect(getAllPages(1, 10, 10)).toEqual([1, "LEFT", 6, 7, 8, 9, 10]);
  });
});
