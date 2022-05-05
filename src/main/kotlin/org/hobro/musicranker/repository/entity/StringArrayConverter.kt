package org.hobro.musicranker.repository.entity

import javax.persistence.AttributeConverter

class StringArrayConverter : AttributeConverter<List<String>, String> {
    private val SPLIT_CHAR = ","

    override fun convertToDatabaseColumn(attribute: List<String>?): String? {
        return attribute?.joinToString(SPLIT_CHAR)
    }

    override fun convertToEntityAttribute(dbData: String?): List<String>? {
        return dbData?.split(SPLIT_CHAR)
    }
}