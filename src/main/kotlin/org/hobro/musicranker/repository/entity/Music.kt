package org.hobro.musicranker.repository.entity

import org.hobro.musicranker.controller.model.MusicRequest
import org.hobro.musicranker.model.enums.WaveType
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Music(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val videoId: String,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val singer: String,

    @Column(nullable = false, name = "chart_id")
    var chartId: Long,

    @Column(nullable = true)
    var rank: Long? = null,

    @Column(nullable = true)
    var prevRank: Long? = null,

    @Column(nullable = true)
    var rankedAt: LocalDateTime? = null,

    @Column(nullable = false)
    var likeCount: Long = 0,

    @Column(nullable = false)
    var dislikeCount: Long = 0
) {
    companion object {
        fun of(musicRequest: MusicRequest, chart: Chart): Music {
            return Music(
                videoId = musicRequest.videoId,
                title = musicRequest.title,
                singer = musicRequest.singer,
                chartId = chart.id
            )
        }
    }

    fun isRanked(): Boolean {
        return rank != null
    }

    fun getWave(): WaveType? {
        return if (rank == null) {
            null
        } else if (prevRank == null) {
            WaveType.NEW
        } else if (rank!! - prevRank!! < 0) {
            WaveType.UP
        } else if (rank!! == prevRank) {
            WaveType.STAY
        } else {
            WaveType.DOWN
        }
    }
}