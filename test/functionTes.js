async function deleteData(param, id) {
  try {
    const res = await fetch(`${param}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("gagal Menyimpan");
    alert("Data berhasil dihapus!");
  } catch (error) {
    alert("Terjadi kesalahan: " + error.message);
  }
}

async function getByID(param, id) {
  try {
    const res = await fetch(`${param}/${id}`, {
      method: "GET",
    });

    if (!res.ok) throw new Error("gagal get edit data");
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}
async function updateData(param, id, data) {
  try {
    const res = await fetch(`${param}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Gagal mengedit data");
    alert("Data berhasil diedit!");
  } catch (error) {
    alert("Terjadi kesalahan saat edit: " + error.message);
  }
}

module.exports = { deleteData, getByID, updateData };
