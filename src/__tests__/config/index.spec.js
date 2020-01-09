describe("config index", () => {
  const { env } = process;
  beforeAll(() => {
    delete process.env;
    process.env = {
      REACT_APP_NODE_ENV: "development",
      REACT_APP_DEV_API_URL: "yyy",
      REACT_APP_PROD_API_URL: "xxx"
    };
  });
  afterAll(() => {
    process.env = env;
  });
  it("should be present", () => {
    const { baseUrl } = require('../../config');
    expect(typeof baseUrl).toBe('undefined')
  });
});
