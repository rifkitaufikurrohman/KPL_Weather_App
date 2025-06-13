const { getByID } = require("./functionTest.js");

global.fetch = jest.fn();
global.alert = jest.fn();

describe("getByID", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return data when get is ok", async () => {
    const mockData = { id: 123, name: "Test" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const data = await getByID("http://localhost:3000/visits", "1");
    expect(data).toEqual(mockData);
    expect(alert).not.toHaveBeenCalled();
  });

  test("should alert error message when get is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await getByID("http://localhost:3000/visits", "1");
    expect(alert).toHaveBeenCalledWith("gagal get edit data");
  });
});
