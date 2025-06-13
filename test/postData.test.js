const { postData } = require("./functionTest.js");

global.fetch = jest.fn();
global.alert = jest.fn();

// postdata
describe("postData", () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  test("should call fetch with correct arguments and alert success on ok response", async () => {
    fetch.mockResolvedValue({ ok: true });

    const param = "http://localhost:3000/visits";
    const payload = { name: "Test" };

    await postData(param, payload);

    expect(fetch).toHaveBeenCalledWith(param, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    expect(alert).toHaveBeenCalledWith("Data berhasil disimpan!");
  });

  test("PostData : should alert error when response is not ok", async () => {
    fetch.mockResolvedValue({ ok: false });

    await postData("http://localhost:3000/visits", { test: 1 });

    expect(alert).toHaveBeenCalledWith("Terjadi kesalahan : gagal Menyimpan");
  });

  test("PostData : should alert error when fetch throws error", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    await postData("http://localhost:3000/visits", { test: 1 });

    expect(alert).toHaveBeenCalledWith("Terjadi kesalahan : Network error");
  });
});
