import reducer from "../../store/reducers/markAllNotificationsAsReadReducer";
import {
  ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
  ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS
} from "../../store/actions/types";

describe("", () => {
  it("should \"ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS\"", () => {
    expect(reducer(undefined,
      { type: ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS, payload: "data" })).
      toEqual({
        data: "data",
        error: null
      });
  });
  it("should \"ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE\"", () => {
    expect(reducer(undefined,
      { type: ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE, payload: "error" })).
      toEqual({
        data: null,
        error: "error"
      });
  });
  it("should \"DEFAULT\"", () => {
    expect(reducer(undefined, { type: "", payload: "" })).toEqual({
      data: null,
      error: null});
  });
});

