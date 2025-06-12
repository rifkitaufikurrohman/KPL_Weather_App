const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const xss = require("xss");
const sanitizeHtml = require("sanitize-html");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// app.post("/visits", async (req, res) => {
//   try {

//     const safeNama = xss(req.body.nama);
//     const safeLokasiAsal = xss(req.body.lokasi_asal);
//     const safeLokasiTujuan = xss(req.body.lokasi_tujuan);
//     const safeCatatan = xss(req.body.catatan);

//     // Tanggal ga perlu di-sanitize (Date object)

//     const newVisit = await prisma.visit.create({
//       data: {
//         nama,
//         lokasi_asal,
//         lokasi_tujuan,
//         tanggal,
//         catatan,
//       },
//     });
//     res.json(newVisit);
//   } catch (error) {
//     res.status(500).json({
//       error: error,
//     });
//   }
// });

// app.post("/visits", async (req, res) => {
//   try {
//     const nama = xss(req.body.nama);
//     const lokasi_asal = xss(req.body.lokasi_asal);
//     const lokasi_tujuan = xss(req.body.lokasi_tujuan);
//     const tanggal = new Date(req.body.tanggal);
//     const catatan = xss(req.body.catatan);

//     // Validasi sederhana
//     if (!nama || !lokasi_asal || !lokasi_tujuan || isNaN(tanggal.getTime())) {
//       return res
//         .status(400)
//         .json({ error: "Field tidak lengkap atau tanggal tidak valid" });
//     }

//     const newVisit = await prisma.visit.create({
//       data: {
//         nama,
//         lokasi_asal,
//         lokasi_tujuan,
//         tanggal,
//         catatan,
//       },
//     });
//     res.json(newVisit);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });
app.post("/visits", async (req, res) => {
  try {
    // === PROSES SANITASI ===
    const cleanNama = sanitizeHtml(req.body.nama, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const cleanLokasiAsal = sanitizeHtml(req.body.lokasi_asal, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const cleanLokasiTujuan = sanitizeHtml(req.body.lokasi_tujuan, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const cleanCatatan = sanitizeHtml(req.body.catatan, {
      allowedTags: [],
      allowedAttributes: {},
    });

    // === PROSES TANGGAL ===
    const tanggal = new Date(req.body.tanggal);

    // === VALIDASI ===
    if (
      !cleanNama ||
      !cleanLokasiAsal ||
      !cleanLokasiTujuan ||
      isNaN(tanggal.getTime())
    ) {
      return res
        .status(400)
        .json({ error: "Field tidak lengkap atau tanggal tidak valid" });
    }

    // === SIMPAN KE DATABASE ===
    const newVisit = await prisma.visit.create({
      data: {
        nama: cleanNama,
        lokasi_asal: cleanLokasiAsal,
        lokasi_tujuan: cleanLokasiTujuan,
        tanggal,
        catatan: cleanCatatan,
      },
    });

    res.json(newVisit);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/visits", async (req, res) => {
  const visits = await prisma.visit.findMany();
  res.json(visits);
});

app.get("/visits/:id", async (req, res) => {
  const { id } = req.params;
  const visit = await prisma.visit.findUnique({ where: { id: Number(id) } });
  if (visit) res.json(visit);
  else res.status(404).json({ error: "Visit not found" });
});

app.put("/visits/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, lokasi_asal, lokasi_tujuan, tanggal, catatan } = req.body;
  try {
    const updatedVisit = await prisma.visit.update({
      where: { id: Number(id) },
      data: { nama, lokasi_asal, lokasi_tujuan, tanggal, catatan },
    });
    res.json(updatedVisit);
  } catch (err) {
    res.status(404).json({ error: "Visit not found or update failed" });
  }
});

app.delete("/visits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.visit.delete({ where: { id: Number(id) } });
    res.json({ message: "Visit deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "Visit not found" });
  }
});

app.listen(port, () => {
  console.log(`server running : ${port}`);
});
