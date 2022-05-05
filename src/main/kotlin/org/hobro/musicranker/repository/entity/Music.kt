package org.hobro.musicranker.repository.entity

import org.hobro.musicranker.controller.model.MusicRequest
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

    @Column(nullable = true)
    var rankedAt: LocalDateTime? = null,

    @Column(nullable = false)
    var likeCount: Long = 0,

    @Column(nullable = false)
    var dislikeCount: Long = 0
) {
    companion object {
        fun of(musicRequest: MusicRequest): Music {
            return Music(
                videoId = musicRequest.videoId,
                title = musicRequest.title,
                singer = musicRequest.singer
            )
        }
    }
}