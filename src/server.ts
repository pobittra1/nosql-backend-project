import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

//destructuring from config file
const { port, database_url } = config;

//this function for types of all connections
async function main() {
  await mongoose.connect(database_url as string);
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

//calling function
main();
