import errorHandlerReducer, {
  ADD_ERROR,
  REMOVE_ERROR
} from "../../store/reducers/errorHandlerReducer";

describe("\"errorHandlerReducer\"", () => {
  it("", () => {
    expect(errorHandlerReducer(undefined, {type: ''})).toEqual([]);
    expect(
      errorHandlerReducer(["error1"], {
        type: ADD_ERROR,
        error: "error2"
      })).toEqual(["error1", "error2"]);
    expect(errorHandlerReducer(["error1", "error2", "error3"],
      {
        type: REMOVE_ERROR,
        index: 2
      })).toEqual(["error1", "error2"]);
  });
});
