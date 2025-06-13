const { updateData } = require("./functionTest.js");

global.fetch = jest.fn();
global.alert = jest.fn();

describe("updateData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should alert success message when update is ok", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await updateData("http://localhost:3000/visits", "1", { name: "Nanta" });
    expect(alert).toHaveBeenCalledWith("Data berhasil diedit!");
  });

  test("should alert error message when update is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await updateData("http://localhost:3000/visits", "1", { name: "Nanta" });
    expect(alert).toHaveBeenCalledWith(
      expect.stringContaining("Terjadi kesalahan saat edit")
    );
  });
});
