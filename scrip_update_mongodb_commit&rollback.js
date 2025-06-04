/*
 * Script para atualizar campos no MongoDB
 * Autor: Flaviane Magalhaes
 * GitHub: https://github.com/FlavianeMagalhaes
 * Data: 15/05/2025
 * Descrição: Executa uma atualização segura em uma coleção MongoDB dentro de uma transação.
 */
const session = db.getMongo().startSession();

try {
  session.startTransaction();

  const dbReal = db.getSiblingDB("SEUBANCO_MONGO_DB"); // banco real
  const result = dbReal.SUA_COLECAO_XYZ.updateMany( // escreva aqui sua coleção 
    { status: "QUEUE" }, // aqui você define o campo e o valor do campo a ser realizado update 
    { $set: { status: "ERROR" } } // aqui define o valor a ser atualizado
  );

  if (result && result.modifiedCount !== undefined) { //retorna a quantidade a ser atualizada
    print(`Documentos atualizados para 'ERROR': ${result.modifiedCount}`); //retorna a quantidade atualizada
  } else {  //faz tratamento do script
    print("Nenhum documento foi atualizado ou houve um erro.");
  }

  session.commitTransaction(); //confirma a transação

} catch (error) {
  print(`Erro ocorrido: ${error.message || error}`);
  session.abortTransaction(); // revoga a transação a tornando segura em caso de erro
} finally {
  session.endSession();
}
