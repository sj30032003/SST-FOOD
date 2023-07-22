const mongoose = require('mongoose');
// J7mk9ZiZNBN5tA7x
const mongoURI= "mongodb+srv://sourabh:J7mk9ZiZNBN5tA7x@cluster0.blyrfcm.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

          const fetch_data = mongoose.connection.db.collection("items").find({});
    const results = await fetch_data.toArray();
        //  console.log(results);
    if (results.length > 0) {
        const foodCategory = mongoose.connection.db.collection("foodCategory").find({});
        const result1 = await foodCategory.toArray();

        if (result1.length > 0) {
            result1.forEach((innerResult, j) => {
                global.foodCategory = result1;
            });
        } else {
            console.log('No listing found');
        }
        global.food_items = results;
    } else {
        console.log('No listings found');
    }

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports =mongoDB;