package org.hobro.musicranker.repository.entity

import javax.persistence.AttributeConverter

class StringArrayConverter : AttributeConverter<MutableList<String>, String> {
    private val SPLIT_CHAR = ","

    override fun convertToDatabaseColumn(attribute: MutableList<String>?): String? {
        return attribute?.joinToString(SPLIT_CHAR)
    }

    override fun convertToEntityAttribute(dbData: String?): MutableList<String>? {
        return dbData?.split(SPLIT_CHAR)?.toMutableList()
    }
}