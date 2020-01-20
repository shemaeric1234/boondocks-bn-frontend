import requestPageLimitReducer
  from "../../store/reducers/requestPageLimitReducer";
import { SET_REQUEST_PAGE_LIMIT } from "../../store/actions/types";

describe("\"requestPageLimitReducer\"", () => {
  it("should requestPageLimitReducer", function() {
    expect(requestPageLimitReducer(undefined, { type: "" })).
      toEqual({ pageLimit: 5 });
    expect(requestPageLimitReducer(undefined,
      { type: SET_REQUEST_PAGE_LIMIT, payload: { pageLimit: 10 } })).
      toEqual({ pageLimit: 10 });
  });
});
