package org.hobro.musicranker.repository.entity

import org.hobro.musicranker.model.enums.ChartType
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Convert
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToMany

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

    @OneToMany(targetEntity = Music::class, cascade = [CascadeType.ALL])
    @JoinColumn(name = "chart_id")
    var musics: List<Music>?,
) {
    fun getRankedMusics(): List<Music> {
        return musics?.filter { it.isRanked() }?.sortedBy { it.rank!! } ?: emptyList()
    }

    fun getWaitedMusics(): List<Music> {
        return musics?.filter { !it.isRanked() } ?: emptyList()
    }
}