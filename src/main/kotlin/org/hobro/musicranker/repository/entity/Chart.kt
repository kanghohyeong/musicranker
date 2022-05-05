package org.hobro.musicranker.repository.entity

import javax.persistence.Column
import javax.persistence.Convert
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Chart(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = true)
    @Convert(converter = StringArrayConverter::class)
    val users: MutableList<String> = mutableListOf(),

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    val topMusics: MutableList<Long> = mutableListOf(),

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    var wantedMusics: MutableList<Long>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    val prevTopMusics: MutableList<Long> = mutableListOf()
) {
}