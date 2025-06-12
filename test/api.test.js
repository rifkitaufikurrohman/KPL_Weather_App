const { deleteData, getByID, updateData } = require('./functionTes.js');

global.fetch = jest.fn();
global.alert = jest.fn();

describe('deleteData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should alert success message when delete is ok', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await deleteData('http://localhost:3000/visits', '3');
    expect(alert).toHaveBeenCalledWith('Data berhasil dihapus!');
  });

  test('should alert error message when delete is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await deleteData('http://localhost:3000/visits', '3');
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('Terjadi kesalahan'));
  });
});

describe('getByID', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return data when get is ok', async () => {
    const mockData = { id: 123, name: 'Test' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData)
    });
    const data = await getByID('http://localhost:3000/visits', '1');
    expect(data).toEqual(mockData);
    expect(alert).not.toHaveBeenCalled();
  });

  test('should alert error message when get is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await getByID('http://localhost:3000/visits', '1');
    expect(alert).toHaveBeenCalledWith('gagal get edit data');
  });
});

describe('updateData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should alert success message when update is ok', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await updateData('http://localhost:3000/visits', '1', { name: 'Nanta' });
    expect(alert).toHaveBeenCalledWith('Data berhasil diedit!');
  });

  test('should alert error message when update is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await updateData('http://localhost:3000/visits', '1', { name: 'Nanta' });
    expect(alert).toHaveBeenCalledWith(expect.stringContaining('Terjadi kesalahan saat edit'));
  });
});
