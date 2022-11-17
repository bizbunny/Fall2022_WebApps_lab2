const mongoose = require("mongoose");

const uri =
  "mongodb+srv://TestAnh:TestAnh@clustertodo.ecpo8hl.mongodb.net/?retryWrites=true&w=majority"; //remember to delete

function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}

module.exports = connect;
