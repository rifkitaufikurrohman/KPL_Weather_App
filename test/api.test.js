const { fetchData, postData } = require('./functionTes.js');

global.fetch = jest.fn();
global.alert = jest.fn();

describe('fetchData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Fetch Data : should return data when response is ok', async () => {
    const mockData = { name: 'Indonesia' };
    fetch.mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockData)
    });

    const data = await fetchData("http://localhost:3000/visits", {});
    expect(data).toEqual(mockData);
    expect(alert).not.toHaveBeenCalled();
  });

  test('Fetch Data : should alert error message for status 400', async () => {
    fetch.mockResolvedValueOnce({
      status: 400,
      json: jest.fn()
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith('Country Not Found');
  });

  test('Fetch Data : should alert error message for status 404', async () => {
    fetch.mockResolvedValueOnce({
      status: 404,
      json: jest.fn()
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith('Server Not Responding');
  });

  test('Fetch Data : should alert error message for status 403', async () => {
    fetch.mockResolvedValueOnce({
      status: 403,
      json: jest.fn()
    });

    await fetchData("http://localhost:3000/visits", {});
    expect(alert).toHaveBeenCalledWith('Server Forbidden / API Expired');
  });
});

describe('postData', () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  test('should call fetch with correct arguments and alert success on ok response', async () => {
    fetch.mockResolvedValue({ ok: true });

    const param = "http://localhost:3000/visits";
    const payload = { name: 'Test' };

    await postData(param, payload);

    expect(fetch).toHaveBeenCalledWith(param, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    expect(alert).toHaveBeenCalledWith('Data berhasil disimpan!');
  });

  test('PostData : should alert error when response is not ok', async () => {
    fetch.mockResolvedValue({ ok: false });

    await postData("http://localhost:3000/visits", { test: 1 });

    expect(alert).toHaveBeenCalledWith('Terjadi kesalahan : gagal Menyimpan');
  });

  test('PostData : should alert error when fetch throws error', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    await postData("http://localhost:3000/visits", { test: 1 });

    expect(alert).toHaveBeenCalledWith('Terjadi kesalahan : Network error');
  });
});
