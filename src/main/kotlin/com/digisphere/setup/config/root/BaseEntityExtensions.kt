package com.digisphere.setup.config.root

/**
 * @param E O tipo da Entidade que está sendo mapeada (Ex: User, que estende BaseEntity).
 * @param T O tipo de retorno do mapeamento (Ex: List<FileOutput>).
 * @param associationName O nome do campo de relacionamento (Ex: "files").
 * @param mapping O bloco de código a ser executado no contexto da Entidade 'E'.
 * @return O resultado do mapeamento (T) se carregado, ou null.
 */
inline fun <E : BaseEntity, T> E.mapIfRequested(
    associationName: String,
    mapping: E.() -> T
): T? {
    return if (this._loadedAssociations.contains(associationName)) {
        this.mapping()
    } else {
        null
    }
}