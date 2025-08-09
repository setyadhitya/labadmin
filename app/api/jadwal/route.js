// ✅ FILE: app/api/jadwal/route.js
import { NextResponse } from 'next/server';
import { db } from '../db';

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        j.ID, j.Tanggal, j.Catatan,
        p.Hari, p.Jam_Mulai, p.Mata_Kuliah, p.Jurusan
      FROM tb_jadwal j
      JOIN tb_praktikum p ON j.ID_Praktikum = p.ID
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Gagal ambil data:', error);
    return NextResponse.json(
      { error: 'Gagal ambil data' },
      { status: 500 }
    );
  }
}
