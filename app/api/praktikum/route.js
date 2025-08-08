import { NextResponse } from 'next/server';
import { db } from '../db';

export async function GET() {
  const [rows] = await db.query('SELECT * FROM tb_praktikum');
  return NextResponse.json(rows);
}

export async function POST(req) {
  const data = await req.json();
  const { Mata_Kuliah, Shift, Jam_Mulai, Jam_Ahir, Hari, Jurusan, Assisten, Catatan } = data;

  await db.query(
    `INSERT INTO tb_praktikum (Mata_Kuliah, Shift, Jam_Mulai, Jam_Ahir, Hari, Jurusan, Assisten, Catatan)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [Mata_Kuliah, Shift, Jam_Mulai, Jam_Ahir, Hari, Jurusan, Assisten, Catatan]
  );

  return NextResponse.json({ success: true });
}
