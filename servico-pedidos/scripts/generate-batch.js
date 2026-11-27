const fs = require('fs');
const path = require('path');

const TOTAL_PRODUCTS = 1000;
const batch = [];

// Gera 1.000 produtos com IDs fictícios e status variados
for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
  batch.push({
    product_id: `PROD-${String(i).padStart(4, '0')}`,
    status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE', // 90% ativos, 10% inativos
    quantity_added: Math.floor(Math.random() * 50) + 1 // Quantidade de 1 a 50
  });
}

// Define o caminho de saída (raiz do projeto)
const outputPath = path.join(__dirname, '../lote-produtos.json');

// Escreve o arquivo no disco
fs.writeFileSync(outputPath, JSON.stringify(batch, null, 2));

console.log(`✅ Arquivo gerado com sucesso! ${TOTAL_PRODUCTS} produtos salvos em lote-produtos.json`);
