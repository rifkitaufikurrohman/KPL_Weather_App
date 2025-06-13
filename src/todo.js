import {
  postData,
  fetchData,
  deleteData,
  getByID,
  updateData,
} from "./apiFunction.js";
import config from "../config.js";

// todo list
const formTodo = document.getElementById("todoForm");

formTodo.addEventListener("submit", async function (e) {
  console.log("masuk form");

  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const tanggal = document.getElementById("tanggal").value;
  const catatan = document.getElementById("catatan").value;

  const body = {
    nama: nama,
    lokasi_asal: from,
    lokasi_tujuan: to,
    tanggal: tanggal, // Pastikan format tanggal yang dikirim ke backend sudah sesuai harapan backend (ISO 8601 biasanya terbaik)
    catatan: catatan,
  };

  console.log("body", body);

  await postData("http://localhost:3000/visits", body);
  await begin();

  formTodo.reset(); // Perbaiki: gunakan formTodo, bukan form
});

// Begin function
const begin = async () => {
  const data = await fetchData("http://localhost:3000/visits");

  data.sort((a, b) => b.id - a.id);
  console.log(data);

  const table = document.getElementById("todoListBody");
  table.innerHTML = "";

  for (const element of data) {
    const cuaca_asal = await fetchData(
      `${config.BASE_URL}/v1/current.json?key=5209e4908b634703875140521243007&q=${element.lokasi_asal}&aqi=no`
    );
    const cuaca_tujuan = await fetchData(
      `${config.BASE_URL}/v1/current.json?key=5209e4908b634703875140521243007&q=${element.lokasi_tujuan}&aqi=no`
    );

    const suhu_asal = `${cuaca_asal.current.temp_c}°C`;
    const kondisi_asal = cuaca_asal.current.condition.text;

    const suhu_tujuan = `${cuaca_tujuan.current.temp_c}°C`;
    const kondisi_tujuan = cuaca_tujuan.current.condition.text;

    let formattedTanggal = element.tanggal; 
    try {
      const dateObject = new Date(element.tanggal);

      formattedTanggal = new Intl.DateTimeFormat('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      }).format(dateObject); 

    } catch (error) {
      console.error("Gagal memformat tanggal:", element.tanggal, error);

    }
    // --- AKHIR BAGIAN PERUBAHAN ---

    const row = document.createElement(`tr`);
    row.innerHTML = `
      <td>${element.nama}</td>
      <td>${element.lokasi_asal}</td>
      <td>${suhu_asal} <br> ${kondisi_asal}</td>
      <td>${element.lokasi_tujuan}</td>
      <td>${suhu_tujuan} <br> ${kondisi_tujuan}</td>
      <td>${formattedTanggal}</td> <td>${element.catatan}</td>

      <td colspan="2" class="todo-actions">
      <button class="btn btn-edit">Edit</button>
      <button data-i18n="btn_delete" id ="btn-delete" class="btn btn-delete">Hapus</button>
      </td>
    `;
    row.id = `${element.id}`;

    // Delete functionality
    const delet = row.querySelector(".btn-delete");
    delet.addEventListener("click", async () => {
      await deleteData("http://localhost:3000/visits", element.id);
      row.remove(); // hapus dari tampilan
    });

    const getedit = row.querySelector(".btn-edit");
    getedit.addEventListener("click", async () => {
      const formedit = document.getElementById("todoFormedit");
      formedit.classList.add("active");

      const data = await getByID("http://localhost:3000/visits", element.id);

      // Mengisi input dengan data yang didapat
      const name_edit = document.getElementById("nama-edit");
      const from_edit = document.getElementById("from-edit");
      const to_edit = document.getElementById("to-edit");
      const tgl_edit = document.getElementById("tanggal-edit"); // Ini input tanggal
      const catatan_edit = document.getElementById("catatan-edit");

      name_edit.value = data.nama;
      from_edit.value = data.lokasi_asal;
      to_edit.value = data.lokasi_tujuan;
    
      try {
          const dateForInput = new Date(data.tanggal);
          const year = dateForInput.getFullYear();
          const month = String(dateForInput.getMonth() + 1).padStart(2, '0');
          const day = String(dateForInput.getDate()).padStart(2, '0');
          tgl_edit.value = `${year}-${month}-${day}`; 
      } catch (error) {
          console.error("Gagal memformat tanggal untuk input edit:", data.tanggal, error);
          tgl_edit.value = data.tanggal; 
      }

      catatan_edit.value = data.catatan;

      // Event listener untuk submit edit
      formedit.addEventListener("submit", async (e) => {
        e.preventDefault();

        const body = {
          nama: document.getElementById("nama-edit").value,
          lokasi_asal: document.getElementById("from-edit").value,
          lokasi_tujuan: document.getElementById("to-edit").value,
          tanggal: document.getElementById("tanggal-edit").value, 
          catatan: document.getElementById("catatan-edit").value,
        };

        await updateData("http://localhost:3000/visits", element.id, body);
        await begin();
        formedit.classList.remove("active");
      }, { once: true }); 
    });

    table.appendChild(row);
  }
};

begin();