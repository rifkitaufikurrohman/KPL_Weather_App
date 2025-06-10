const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/visits", async (req, res) => {
  const { nama, lokasi_asal, lokasi_tujuan, tanggal, catatan } = req.body;
  try {
    const newVisit = await prisma.visit.create({
      data: {
        nama,
        lokasi_asal,
        lokasi_tujuan,
        tanggal,
        catatan,
      },
    });
    res.json(newVisit);
  } catch (error) {
    res.status(500).json({
      error: error,
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
