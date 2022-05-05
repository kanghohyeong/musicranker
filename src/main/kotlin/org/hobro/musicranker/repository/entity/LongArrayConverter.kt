package org.hobro.musicranker.repository.entity

import javax.persistence.AttributeConverter

class LongArrayConverter : AttributeConverter<MutableList<Long>, String> {
    private val SPLIT_CHAR = ","

    override fun convertToDatabaseColumn(attribute: MutableList<Long>?): String? {
        return if (attribute != null && attribute.isNotEmpty()) attribute.joinToString(SPLIT_CHAR) else null
    }

    override fun convertToEntityAttribute(dbData: String?): MutableList<Long>? {
        return dbData?.split(SPLIT_CHAR)?.map { it.toLong() }?.toMutableList()
    }

}