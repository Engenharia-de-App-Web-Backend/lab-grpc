const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve(__dirname, '../../inventory.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const inventoryProto = grpc.loadPackageDefinition(packageDefinition).inventory;

class InventoryIntegrationService {
  constructor() {
    // Instancia o client gRPC
    this.client = new inventoryProto.InventoryService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
  }

  /**
   * Encapsula a chamada gRPC baseada em callback em uma Promise
   */
  async checkStock(productId) {
    return new Promise((resolve, reject) => {
      this.client.CheckStock({ product_id: productId }, (error, response) => {
        if (error) {
          console.error('[Service] Erro na comunicação gRPC:', error);
          return reject(new Error('Falha ao comunicar com o serviço de inventário'));
        }
        resolve(response);
      });
    });
  }
}

module.exports = InventoryIntegrationService;
