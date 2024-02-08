import { db } from "./config/db.js"
// Пример вставки тестового пользователя
db('users').insert({
  email: 'test333@example.com',
  password: 'hashedpassword333',
  username: 'testuser2',
  role_id: 1 // Убедитесь, что этот ID существует в таблице roles
}).then(result => console.log('Insert result:', result))
  .catch(error => console.error('Insert error:', error));
