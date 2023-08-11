const app = require("./app");
const DbConnect = require("./config/DbConnect");

DbConnect();
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(` seveer runing on port ${port}`)
})