package org.hobro.musicranker.controller

import org.hobro.musicranker.service.MusicService
import org.hobro.musicranker.utils.annotation.RestApiMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RestApiMapping
class MusicController(
    val musicService: MusicService
) {

    @PutMapping("/music/{music_id}/like")
    fun likeMusic(
        @PathVariable(name = "music_id", required = true)
        musicId: Long
    ): Long {
        return musicService.like(musicId)
    }

    @PutMapping("/music/{music_id}/dislike")
    fun dislikeMusic(
        @PathVariable(name = "music_id", required = true)
        musicId: Long
    ): Long {
        return musicService.dislike(musicId)
    }
}