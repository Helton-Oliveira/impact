package com.digisphere.setup.config.root

import com.fasterxml.jackson.annotation.JsonView
import java.io.Serial
import java.io.Serializable

open class BaseInput(
    var _edited: Boolean = false,
    var active: Boolean = false,
)

open class BaseOutput : Serializable {

    @Serial
    private val serialVersionUID: Long = 1L;

    @field:JsonView(Json.List::class)
    var id: Long? = null

    interface Json {
        interface List;
        interface Detail : List;
        interface All : Detail;
    }

}