import mongoose from 'mongoose';

 
const connectDB = async () => {
   
    // These options handle deprecated warnings and improve stability
    const connectionOptions = {
        // Mongoose 6+ makes these default, but it's good practice to be explicit
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        // useCreateIndex: true, // Mongoose 6+ defaults this to true
    };

    try {
         
        const connection = await mongoose.connect(process.env.DB_URL, connectionOptions);

        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
       
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Mongoose default connection disconnected');
        });
 
        mongoose.connection.on('error', (err) => {
            console.error(`❌ Mongoose default connection error: ${err.message}`);
        });

    } catch (error) {
        // 4. Handle Initial Connection Failure
        console.error(`🚨 MongoDB initial connection failed: ${error.message}`);
        // Exit process with failure
        process.exit(1); 
    }
};

 
const closeDB = () => {
    mongoose.connection.close();
    console.log('⚠️ Mongoose default connection disconnected through app termination');
};

// Listen for termination signals (SIGINT, SIGTERM)
process.on('SIGINT', closeDB);
process.on('SIGTERM', closeDB);


export default connectDB;