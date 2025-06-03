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

  const dbReal = db.getSiblingDB("SEUBANCO_MONGODB"); // banco real
  const result = dbReal.COLECAOXYZ.updateMany(
    { status: "COLECAOXYZ" }, // COLECAO ONDE ESTAO OS DADOS DO BANCO
    { $set: { status: "ERROR" } }
  );

  if (result && result.modifiedCount !== undefined) {
    print(`Documentos atualizados para 'ERROR': ${result.modifiedCount}`);
  } else {
    print("Nenhum documento foi atualizado ou houve um erro.");
  }

  session.commitTransaction();

} catch (error) {
  print(`Erro ocorrido: ${error.message || error}`);
  session.abortTransaction();
} finally {
  session.endSession();
}
