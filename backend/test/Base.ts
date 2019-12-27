import 'k8w-extend-native';
import { serviceProto } from '../src/protocols/proto';
import { TsrpcClient } from 'tsrpc';

export const testApiClient = new TsrpcClient({
    server: 'http://localhost:3000',
    proto: serviceProto
});