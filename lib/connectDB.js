import mongoose from 'mongoose'

const connectDB = () => {
    if(mongoose.connections[0].readyState){
        console.log('Conectada');
        return
    }

    mongoose.connect(process.env.MONGODB_URI, {}, err=>{
        if(err) throw err;
        console.log('Conectado 2');
    })
}

export default connectDB