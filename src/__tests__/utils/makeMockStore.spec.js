import {
  makeMockStore,
  mockError,
  mockSuccess
} from "../../utils/makeMockStore";

describe("\"makeMockStore, mockSuccess, mockError\"", () => {
  it("should makeMockStore", function() {
    expect(makeMockStore()).toBeDefined();
  });
  it("should mockSuccess", function() {
    expect(mockSuccess("")).toEqual({
      status: 200,
      response: ''
    });
  });
  it("should mockError", function() {
    const error = { response: { data: "" }, status: 404 };
    expect(mockError(error)).toEqual(error);
  });
});
