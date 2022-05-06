package org.hobro.musicranker.model.enums

import org.hobro.musicranker.repository.entity.EnumCodeConverter

enum class ChartType(override val code: Int) : BaseCodedEnum {
    MUSIC(0),
    VIDEO(1);

    companion object {
        fun findByCode(code: Int): ChartType? {
            return values().find { it.code == code }
        }
    }

    class ChartTypeConverter : EnumCodeConverter<ChartType>() {
        override fun getEnumFromCode(code: Int): ChartType? {
            return findByCode(code)
        }
    }
}