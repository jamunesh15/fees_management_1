// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const schedule = require('node-schedule');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const studentRoutes = require('./routes/students');
// const feeRoutes = require('./routes/fees');



// dotenv.config();
// const app = express();



// app.use(cors( {
//   origin: 'http://localhost:5173',
//   credentials: true
// } ));
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'));

// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/fees', feeRoutes);

// // Monthly fee reset scheduler (runs on 1st of every month)
// schedule.scheduleJob('0 0 1 * *', async () => {
//   console.log('Monthly fee reset triggered');
//   // Add logic if you need to reset or archive fee records
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const feeRoutes = require('./routes/fees');

dotenv.config({ debug: true });

const app = express();

app.use(cors({
 origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/fees', feeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));