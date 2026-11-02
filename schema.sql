DROP TABLE IF EXISTS umkm CASCADE;
DROP TABLE IF EXISTS kategori CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE kategori (
    id_kategori SERIAL PRIMARY KEY,
    nama_kategori VARCHAR(100) NOT NULL
);

CREATE TABLE umkm (
    id_umkm SERIAL PRIMARY KEY,
    nama_umkm VARCHAR(150) NOT NULL,
    detail_umkm TEXT,
    foto_umkm TEXT,
    kontak_umkm VARCHAR(50),
    lokasi_umkm TEXT,
    id_kategori INT REFERENCES kategori(id_kategori) ON DELETE SET NULL
);

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    nama_user VARCHAR(100) NOT NULL,
    email_user VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);

INSERT INTO kategori (nama_kategori) VALUES 
('Kuliner'), 
('Kerajinan Tangan'), 
('Fashion');

INSERT INTO umkm (nama_umkm, detail_umkm, foto_umkm, kontak_umkm, lokasi_umkm, id_kategori) VALUES 
('Keripik Pedas Jaya', 'Keripik singkong super pedas khas daerah', 'https://via.placeholder.com/150', '08123456789', 'Bandung', 1),
('Batik Artisanal', 'Kain batik tulis motif tradisional', 'https://via.placeholder.com/150', '08987654321', 'Yogyakarta', 3);

INSERT INTO users (nama_user, email_user, password, role) VALUES 
('Admin Utama', 'admin@mail.com', 'password123', 'admin'),
('Budi Santoso', 'budi@mail.com', 'user123', 'user');