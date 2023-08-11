const app = require('./app');
const Dbconnect = require('./config/DbConnect');

Dbconnect();
const PORT = process.env.PORT;
const sever = app.listen(PORT, () => {
    console.log(` sever running on port = ${PORT}`);
})