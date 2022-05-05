package org.hobro.musicranker.repository.entity

import javax.persistence.AttributeConverter

class LongArrayConverter: AttributeConverter<List<Long>, String> {
    private val SPLIT_CHAR = ","

    override fun convertToDatabaseColumn(attribute: List<Long>?): String? {
        return attribute?.joinToString(SPLIT_CHAR)
    }

    override fun convertToEntityAttribute(dbData: String?): List<Long>? {
        return dbData?.split(SPLIT_CHAR)?.map { it.toLong() }
    }

}