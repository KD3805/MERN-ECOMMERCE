const app = require('.');
const { connectDB } = require('./config/db');
const PORT = 5454;

app.listen(PORT, async ()=>{
    await connectDB();
    console.log('server started on PORT: ', PORT);
})