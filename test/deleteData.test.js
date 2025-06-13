const { deleteData } = require("./functionTest.js");

global.fetch = jest.fn();
global.alert = jest.fn();

describe("deleteData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should alert success message when delete is ok", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await deleteData("http://localhost:3000/visits", "3");
    expect(alert).toHaveBeenCalledWith("Data berhasil dihapus!");
  });

  test("should alert error message when delete is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await deleteData("http://localhost:3000/visits", "3");
    expect(alert).toHaveBeenCalledWith(
      expect.stringContaining("Terjadi kesalahan")
    );
  });
});
