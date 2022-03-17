import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbContatos.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tb_usuario
        (
            codigo text not null primary key,
            nome text not null,
            email text not null,
            senha text not null
                
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(
            (tx) => tx.executeSql(query, [],
                (tx, resultado) => resolve(true)
            )
        ,
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};




export function obtemTodosUsuarios() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tb_usuario';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            nome: registros.rows.item(n).nome,
                            email: registros.rows.item(n).email,
                            senha: registros.rows.item(n).senha
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaUsuario(usuario) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tb_usuario (codigo, nome ,email,senha) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [usuario.codigo, usuario.nome, usuario.email,usuario.senha],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function alteraUsuario(usuario) {
    console.log('começando o método alteraUsuario');
    return new Promise((resolve, reject) => {
        let query = 'update tb_usuario set nome=?, email=?,senha=? where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [usuario.nome, usuario.email, usuario.senha,usuario.codigo],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function excluiUsuario(id) {
    console.log('Apagando contato ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tb_usuario where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function excluiTodosUsuarios() {
    console.log("Apagando todos os contatos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tb_usuario';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
