import { NextResponse } from 'next/server';
import { db } from '../../db'; // Naik 1 folder dari /[id]/ ke /api/

export async function GET(req, { params }) {
  const { id } = params;
  const [rows] = await db.query('SELECT * FROM tb_praktikum WHERE id = ?', [id]);
  if (rows.length === 0) {
    return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();
  const { Mata_Kuliah, Shift, Jam_Mulai, Jam_Ahir, Hari, Jurusan, Assisten, Catatan } = data;

  await db.query(
    `UPDATE tb_praktikum 
     SET Mata_Kuliah=?, Shift=?, Jam_Mulai=?, Jam_Ahir=?, Hari=?, Jurusan=?, Assisten=?, Catatan=?
     WHERE id = ?`,
    [Mata_Kuliah, Shift, Jam_Mulai, Jam_Ahir, Hari, Jurusan, Assisten, Catatan, id]
  );

  return NextResponse.json({ success: true });
}


export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    const [result] = await db.query('DELETE FROM tb_praktikum WHERE ID = ?', [id]);
    return NextResponse.json({ message: 'Data berhasil dihapus', result });
  } catch (error) {
    console.error('Error deleting data:', error);
    return NextResponse.json({ message: 'Gagal menghapus data', error }, { status: 500 });
  }
}
