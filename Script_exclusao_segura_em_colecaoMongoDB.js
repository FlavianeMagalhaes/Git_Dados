/*
 * Script para excluir documentos com dois campos
 * Autor: Flaviane Magalhaes
 * GitHub: https://github.com/FlavianeMagalhaes
 * Data: 15/05/2025
 * Descrição: Executa uma exclusão segura em uma coleção MongoDB dentro de uma transação.
 */

const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const dbReal = db.getSiblingDB("SEUBANCO_MONGODB"); // SEU BANCO MONGO DB AQUI
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
