import {
  postData,
  fetchData,
  deleteData,
  getByID,
  updateData,
} from "./apiFunction.js";
import config from "../../config.js";

// todo list
const formTodo = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

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
    lokasi_asal: to,
    lokasi_tujuan: from,
    tanggal: tanggal,
    catatan: catatan,
  };

  await postData("http://localhost:3000/visits", body);
  await begin();

  form.reset();
});

const begin = async () => {};

begin();
