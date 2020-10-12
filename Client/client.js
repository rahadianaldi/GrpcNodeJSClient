const PROTO_PATH = "./greet.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const Greeter = grpc.loadPackageDefinition(packageDefinition).Greeter;
const client = new Greeter(
    "localhost:5001",
    grpc.credentials.createInsecure()
);

module.exports = client;