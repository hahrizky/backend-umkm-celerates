const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. GET ALL UMKM (Menampilkan daftar semua UMKM)[cite: 1]
app.get('/umkm', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT umkm.*, kategori.nama_kategori 
      FROM umkm 
      LEFT JOIN kategori ON umkm.id_kategori = kategori.id_kategori
    `);
    res.status(200).json({ status: 'success', data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET UMKM BY ID (Menampilkan UMKM berdasarkan ID)[cite: 1]
app.get('/umkm/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM umkm WHERE id_umkm = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data UMKM tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST UMKM (Menambahkan data UMKM baru)[cite: 1]
app.post('/umkm', async (req, res) => {
  const { nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori } = req.body;
  try {
    const query = `
      INSERT INTO umkm (nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori];
    const result = await db.query(query, values);
    
    res.status(201).json({ status: 'success', message: 'Data berhasil ditambahkan', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PUT UMKM (Mengubah data UMKM berdasarkan ID)[cite: 1]
app.put('/umkm/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori } = req.body;
  try {
    const query = `
      UPDATE umkm 
      SET nama_umkm = $1, detail_umkm = $2, foto_umkm = $3, kontak_umkm = $4, lokasi_umkm = $5, id_kategori = $6
      WHERE id_umkm = $7 RETURNING *
    `;
    const values = [nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori, id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data UMKM tidak ditemukan' });
    }

    res.status(200).json({ status: 'success', message: 'Data berhasil diperbarui', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. DELETE UMKM (Menghapus data UMKM berdasarkan ID)[cite: 1]
app.delete('/umkm/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM umkm WHERE id_umkm = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Data UMKM tidak ditemukan' });
    }
    res.status(200).json({ status: 'success', message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});