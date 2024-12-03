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
		res.send(' test endpoint!');
	})


	// API đăng nhập người dùng
	app.post('/auth/login', async (req, res) => {
		const { email, password } = req.body;

		console.log('Email:', email);
		console.log('Password:', password);

		const query = 'SELECT * FROM users WHERE email = ?';

		db.query(query, [email], async (err, results) => {
			if (err) {
				return res.status(500).json({ error: 'Error' });
			}

			if (results.length === 0) {
				return res.status(401).json({ error: 'Wrong infor' });
			}

			const user = results[0];

			// Kiểm tra mật khẩu
			if (password !== user.password) {
				return res.status(401).json({ error: 'Wrong infor' });
			}

			// Tạo token và gửi lại client
			const token = jwt.sign({ id: user.id }, '123123', { expiresIn: '1h' });
			console.log('Token:', token);
			res.json({
				message: 'Login success',
				token,
				user: {
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				}
			});
		});
	});


	// API lấy danh sách sản phẩm
	app.get('/api/products', (req, res) => {
		db.query('SELECT * FROM products', (err, results) => {
			if (err) {
				console.error('Error fetching products:', err);
				return res.status(500).json({ error: 'Failed to fetch products' });
			}
			res.status(200).json(results);
		});
	});

	//API products detail
	app.get('/api/products/:id', (req, res) => {
		const { id } = req.params;
		console.log('Received ID:', id);
		db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
			if (err) {
				return res.status(500).json({ error: 'Database query failed' });
			}
			if (results.length === 0) {
				return res.status(404).json({ message: 'Product not found' });
			}
			res.json(results[0]);
		});
	});

	//API profiles detail
	app.get('/api/user/:id', (req, res) => {
		const { id } = req.params;
		db.query('SELECT firstname, lastname, email FROM users WHERE email = ?', [id], (err, results) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: 'Database query failed' });
			}
			if (results.length === 0) {
				return res.status(404).json({ error: 'User not found' });
			}
			res.status(200).json(results[0]);
		});
	});



});

