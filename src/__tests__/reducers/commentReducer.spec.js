import commentReducer from "../../store/reducers/commentReducer";
import { COMMENT_FAIL, COMMENT_SUCCESS } from "../../store/actions/types";

describe("\"requestPageLimitReducer\"", () => {
  it("should give success, error or default state", function() {
    expect(commentReducer(undefined, {
      type: ""
    })).toEqual({
      data: null,
      error: null,
      status: ""
    });
    expect(commentReducer(undefined, {
      type: COMMENT_SUCCESS,
      payload: "success"
    })).toEqual({
      error: null,
      data: "success",
      status: "success"
    });
    expect(commentReducer(undefined, {
      type: COMMENT_FAIL,
      payload: "error"
    })).toEqual({
      error: "error",
      data: null,
      status: "error"
    });
  });
});
