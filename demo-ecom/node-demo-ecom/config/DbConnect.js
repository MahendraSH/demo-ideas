const mongoose = require("mongoose");

const uri = process.env.uri;

const DbConnect = () => {
    mongoose.connect(uri)
        .then((data) => {
            console.log("db connection  succesful ");
            // console.log(`Mongodb connected with server: ${data.connection.host}`);
            // console.log(`db connected : ${data.connection.name}`);
        }).catch((err) => {
            console.log(err);
        });

};
module.exports = DbConnect;