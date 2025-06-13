const { fetchData } = require("./functionTest.js");

global.fetch = jest.fn();
global.alert = jest.fn();

// fetchdata

describe("fetchData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Fetch Data : should return data when response is ok", async () => {
    const mockData = { name: "Indonesia" };
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const data = await fetchData("http://localhost:3000/visits", {});
    expect(data).toEqual(mockData);
    expect(alert).not.toHaveBeenCalled();
  });

  test("Fetch Data : should alert error message for status 400", async () => {
    fetch.mockResolvedValueOnce({
      status: 400,
      json: jest.fn(),
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith("Country Not Found");
  });

  test("Fetch Data : should alert error message for status 404", async () => {
    fetch.mockResolvedValueOnce({
      status: 404,
      json: jest.fn(),
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith("Server Not Responding");
  });

  test("Fetch Data : should alert error message for status 403", async () => {
    fetch.mockResolvedValueOnce({
      status: 403,
      json: jest.fn(),
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith("Server Forbidden / API Expired");
  });
});
