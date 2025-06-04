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
  const countBefore = dbReal.SUACOLECAOXYZ.countDocuments({ status: { $in: ["DONE", "ERROR"] } }); // aqui você define sua colecao do mongo, os campos e valor dos campos a serem apagados 

  print(`Antes da exclusão, há ${countBefore} documentos com status "DONE" ou "ERROR".`);

  const result = dbReal.SUACOLECAOXYZ.deleteMany({ status: { $in: ["DONE", "ERROR"] } });

  if (result && result.deletedCount !== undefined) { // faz a contagem antes da exclusao
    print(`Foram excluídos ${result.deletedCount} documentos.`); //e após a exclusao faz a contagem dos campos apagados
  } else {         //faz tratamento de erro
    print("Erro ao tentar deletar documentos.");
  }

  session.commitTransaction(); //confirma as alteracoes realizadas

} catch (error) {
  print(`Erro ocorrido: ${error.message || error}`); 
  session.abortTransaction();  // desfaz as alteracoes realizadas 
} finally {
  session.endSession();
}
