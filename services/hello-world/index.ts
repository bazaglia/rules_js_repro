import { loadSync } from '@grpc/proto-loader';
import { loadPackageDefinition } from '@grpc/grpc-js';

const packageDefinition = loadSync('services/hello-world/hello.proto');

const packageObject = loadPackageDefinition(packageDefinition);

console.log('Hello world', packageObject);
