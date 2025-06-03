# 🔄 MongoDB Bulk Scripts com Transação

Scripts para execução segura de operações em massa no MongoDB, utilizando **transações** para garantir integridade e controle durante exclusões e atualizações. Ideal para rotinas administrativas e manutenção de dados em ambientes controlados.

---

## ✅ Funcionalidades

- Exclusão em massa de documentos com status específicos (`DONE`, `ERROR`)
- Atualização de documentos com controle transacional
- Feedback visual com contadores e mensagens no terminal
- Scripts otimizados para uso em ambientes Mongo Shell

---

## 📂 Arquivos

- `delete_script.js`: script para excluir documentos com status `"DONE"` ou `"ERROR"`
- `update_script.js`: script para atualizar documentos com base em critérios definidos

---

## 💻 Exemplo de uso (delete_script.js)

```javascript
const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const dbReal = db.getSiblingDB("SEUBANCO_MONGODB");
  const countBefore = dbReal.SUACOLECAOXYZ.countDocuments({ status: { $in: ["DONE", "ERROR"] } });

  print(`Antes da exclusão, há ${countBefore} documentos com status "DONE" ou "ERROR".`);

  const result = dbReal.SUACOLECAOXYZ.deleteMany({ status: { $in: ["DONE", "ERROR"] } });

  if (result && result.deletedCount !== undefined) {
    print(`Foram excluídos ${result.deletedCount} documentos.`);
  } else {
    print("Erro ao tentar deletar documentos.");
  }

  session.commitTransaction();

} catch (error) {
  print(`Erro ocorrido: ${error.message || error}`);
  session.abortTransaction();
} finally {
  session.endSession();
}


