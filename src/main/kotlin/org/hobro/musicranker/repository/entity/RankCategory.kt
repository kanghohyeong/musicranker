package org.hobro.musicranker.repository.entity

import javax.persistence.Column
import javax.persistence.Convert
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class RankCategory(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = true)
    @Convert(converter = StringArrayConverter::class)
    val users: List<String>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    val topMusics: List<Long>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    val wantedMusics: List<Long>?
) {
}