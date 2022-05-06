package org.hobro.musicranker.repository.entity

import org.hobro.musicranker.model.enums.BaseCodedEnum
import javax.persistence.AttributeConverter

abstract class EnumCodeConverter<T> : AttributeConverter<T, Int> where T : Enum<T>, T : BaseCodedEnum {

    override fun convertToDatabaseColumn(attribute: T): Int {
        return attribute.code
    }

    override fun convertToEntityAttribute(dbData: Int): T? {
        return getEnumFromCode(dbData)
    }

    abstract fun getEnumFromCode(code: Int) : T?
}