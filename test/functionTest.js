async function fetchData(api, param) {
  try {
    const response = await fetch(api);
    const errorMessage = {
      400: "Country Not Found",
      404: "Server Not Responding",
      403: "Server Forbidden / API Expired",
    };

    if (errorMessage[response.status]) {
      throw new Error(errorMessage[response.status]);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

async function postData(param, data) {
  try {
    const res = await fetch(param, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("gagal Menyimpan");
    alert("Data berhasil disimpan!");
  } catch (error) {
    alert("Terjadi kesalahan : " + error.message);
  }
}

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

module.exports = { fetchData, postData, deleteData, getByID, updateData };
