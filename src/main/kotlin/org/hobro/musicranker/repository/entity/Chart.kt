package org.hobro.musicranker.repository.entity

import org.hobro.musicranker.model.enums.ChartType
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

    @Column(nullable = false)
    @Convert(converter = ChartType.ChartTypeConverter::class)
    val chartType: ChartType,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = true)
    @Convert(converter = StringArrayConverter::class)
    var users: MutableList<String>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    var topMusics: MutableList<Long>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    var wantedMusics: MutableList<Long>?,

    @Column(nullable = true)
    @Convert(converter = LongArrayConverter::class)
    var prevTopMusics: MutableList<Long>?
) {
}