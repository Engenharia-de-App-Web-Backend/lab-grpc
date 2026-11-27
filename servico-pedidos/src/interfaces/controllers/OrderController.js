const InventoryIntegrationService = require('../../services/InventoryIntegrationService');

class OrderController {
  constructor() {
    // Em uma arquitetura real, isso seria injetado via DI
    this.inventoryService = new InventoryIntegrationService();
  }

  async createOrder(req, res) {
    try {
      const { productId, amount } = req.body;

      // O controller não sabe que gRPC está sendo usado por baixo dos panos
      const stockStatus = await this.inventoryService.checkStock(productId);

      if (!stockStatus.available || stockStatus.quantity < amount) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }

      // Lógica de gravação do pedido omitida...
      return res.status(201).json({ message: 'Pedido criado com sucesso' });

    } catch (error) {
      return res.status(502).json({ error: 'Erro de integração ao processar pedido' });
    }
  }
}

module.exports = OrderController;
