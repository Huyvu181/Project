import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'manage_react'
});

// Kiểm tra kết nối MySQL
db.connect((err) => {
	if (err) {
		console.error('Error', err);
	} else {
		console.log('Done connecting');
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(` http://localhost:${PORT}`);

	// API đăng ký người dùng
	// app.post('/auth/register', async (req, res) => {
	// 	const { firstname, lastname, email, password } = req.body;

	// 	// Kiểm tra xem email
	// 	const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
	// 	db.query(checkEmailQuery, [email], async (err, results) => {
	// 		if (err) {
	// 			return res.status(500).json({ error: 'Error' });
	// 		}
	// 		console.log(
	// 			'results', results
	// 		)
	// 		if (results.length > 0) {
	// 			return res.status(400).json({ error: 'Email have use' });
	// 		}

	// 		// Mã hóa mật khẩu
	// 		const hashedPassword = await bcrypt.hash(password, 10);


	// 		const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
	// 		db.query(query, [firstname, lastname, email, hashedPassword], (err, result) => {
	// 			if (err) {
	// 				return res.status(500).json({ error: 'ERROR' });
	// 			}
	// 			res.status(201).json({ message: 'SUCCESS' });
	// 		});
	// 	});
	// });

	app.post('/auth/register', (req, res) => {
		const { firstname, lastname, email, password } = req.body;

		// Kiểm tra xem email đã tồn tại chưa
		const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
		db.query(checkEmailQuery, [email], (err, results) => {
			if (err) {
				return res.status(500).json({ error: 'Error' });
			}
			if (results.length > 0) {
				return res.status(400).json({ error: 'Email already in use' });
			}


			const query = 'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)';
			db.query(query, [firstname, lastname, email, password], (err, result) => {
				if (err) {
					return res.status(500).json({ error: 'Error saving user' });
				}
				res.status(201).json({ message: 'Registration successful' });
			});
		});
	});


	app.get('/test', (req, res) => {
		res.send('Hello, this is a simple test endpoint!');
	})


	// API đăng nhập người dùng
	app.post('/auth/login', async (req, res) => {
		const { email, password } = req.body;

		const query = 'SELECT * FROM users WHERE email = ?';

		console.log('Email:', email);
		console.log('password:', password);


		db.query(query, [email], async (err, results) => {

			if (err) {
				return res.status(500).json({ error: 'Lỗi hệ thống' });
			}

			if (results.length === 0) {

				return res.status(401).json({ error: 'Thông tin đăng nhập không chính xác' });
			}

			const user = results[0];

			// Kiểm tra mật khẩu
			if (password !== user.password) {
				return res.status(401).json({ error: 'Thông tin đăng nhập không chính xác' });
			}

			// Tạo token và gửi lại client
			const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
			res.json({ message: 'Đăng nhập thành công', token });
		});
	});


});

