package org.hobro.musicranker.model

import org.hobro.musicranker.model.enums.WaveType
import org.hobro.musicranker.repository.entity.Music

data class MusicDTO(
    val id: Long,
    val videoId: String,
    val title: String,
    val singer: String,
    val rank: Long?,
    val wave: WaveType?,
    val likeCount: Long,
    val dislikeCount: Long
) {
    companion object {
        fun of(music: Music): MusicDTO {
            return MusicDTO(
                id = music.id!!,
                videoId = music.videoId,
                title = music.title,
                singer = music.singer,
                rank = music.rank,
                wave = music.getWave(),
                likeCount = music.likeCount,
                dislikeCount = music.dislikeCount
            )
        }
    }
}
