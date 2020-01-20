import reducer from "../../store/reducers/requestSearchReducer";
import {
  REQUEST_SEARCH_ERROR,
  REQUEST_SEARCH_SUCCESS
} from "../../store/actions/types";

describe("\"RequestSearchReducer\"", () => {
  it("should return the expected state", function() {
    const typeSuccess = { type: REQUEST_SEARCH_SUCCESS, payload: [] };
    const typeError = { type: REQUEST_SEARCH_ERROR, payload: "This is the error" };
    expect(reducer(null, typeSuccess)).toEqual({ requests: [] });
    expect(reducer(null,typeError)).toEqual({ error: "This is the error" });
    expect(reducer()).toEqual({ requests: [], error: null });
  });

});
