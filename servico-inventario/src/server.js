// Este é o microsserviço que expõe a porta gRPC (50051) e implementa a lógica de negócio definida no contrato.

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Carregamento do arquivo .proto
const PROTO_PATH = path.resolve(__dirname, '../inventory.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const inventoryProto = grpc.loadPackageDefinition(packageDefinition).inventory;

// Handlers com a lógica de negócio
const inventoryHandlers = {
  // Implementação do método Unary
  CheckStock: (call, callback) => {
    const productId = call.request.product_id;
    
    // Simulação de busca no banco de dados
    console.log(`[gRPC] Verificando estoque para o produto: ${productId}`);
    const mockStock = { available: true, quantity: 42 };
    
    // O callback retorna (Erro, Resposta)
    callback(null, mockStock);
  },

  // Implementação do método Server Streaming
  StreamProductUpdates: (call) => {
    const category = call.request.category;
    console.log(`[gRPC] Iniciando stream para categoria: ${category}`);
    
    let count = 0;
    const interval = setInterval(() => {
      call.write({ product_id: `prod-${count}`, status: 'Atualizado' });
      count++;
      
      if (count >= 5) {
        clearInterval(interval);
        call.end(); // Encerra a stream do lado do servidor
      }
    }, 1000);
  }
};

// Inicialização do servidor
function startServer() {
  const server = new grpc.Server();
  server.addService(inventoryProto.InventoryService.service, inventoryHandlers);
  
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Servidor de Inventário gRPC rodando na porta ${port}`);
    server.start();
  });
}

startServer();
