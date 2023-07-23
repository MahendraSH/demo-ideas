const app = require('./app');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');

dotenv.config({ path: './config/.env.local' });// dev 
// dotenv.config({path: './config/.env'});// production

const PORT = process.env.PORT || 3000;
dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
