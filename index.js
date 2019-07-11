const mongoose = require('mongoose');
const util = require('util');

// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/app');

//DB Setup

//for local without authentication
const uri = 'mongodb://localhost:27017/Agnito';

//for local with authentication
//const uri = 'mongodb://Agnito:Agnito123@localhost:27017/Agnito';

//for mlab with authentication
// const uri = 'mongodb://admin:'+encodeURIComponent("Agnito0@agnito")+'@ds239071.mlab.com:39071/agnito';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
mongoose.connect(uri,options)
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log("Connection to uri ",uri," was successfull")
    })
    .catch(err => { 
        /** handle initial connection error */ 
        console.log("Error connecting to ",uri,err)
    })

// print mongoose logs in dev env
if (config.mongooseDebug) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});