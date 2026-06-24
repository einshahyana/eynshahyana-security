export async function onRequest(context) {
  const { env } = context;
  
  // إنشاء جدول إذا ما كان موجود
  await env.db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  // إدراج مستخدم جديد
  await env.db.prepare(`
    INSERT INTO users (name, email) VALUES (?, ?)
  `).bind('أحمد', 'ahmed@example.com').run();

  // استعلام عن المستخدمين
  const { results } = await env.db.prepare(`
    SELECT * FROM users
  `).all();

  return Response.json(results);
}