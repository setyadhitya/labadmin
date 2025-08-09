// ✅ FILE: app/api/login/route.js
import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'labordatenbank'
    });

    const [rows] = await connection.execute(
      'SELECT * FROM tb_user WHERE Username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      return new Response(JSON.stringify({ success: true, role: rows[0].role }), {
        status: 200
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Username atau password salah' }), {
        status: 401
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500
    });
  }
}
