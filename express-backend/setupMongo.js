const mongoose = require("mongoose");

const uri = "connection-uri-here";

function connect(){
    const options = {useNewUrlParser:true};

    mongoose.connection(uri, options).then(
        () => {console.log("Database connection established!");},
        (err) => {console.log("Error connecting Database instance due to: ", err);}
    );
}

module.exports = connect 