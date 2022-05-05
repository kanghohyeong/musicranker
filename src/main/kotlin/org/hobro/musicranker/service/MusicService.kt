package org.hobro.musicranker.service

import org.hobro.musicranker.repository.MusicRepository
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class MusicService(
    val musicRepository: MusicRepository
) {

    @Transactional
    fun like(musicId: Long): Long {
        val music = musicRepository.findById(musicId).get()
        music.likeCount++
        musicRepository.save(music)
        return music.likeCount
    }

    @Transactional
    fun dislike(musicId: Long) :Long {
        val music = musicRepository.findById(musicId).get()
        music.dislikeCount++
        musicRepository.save(music)
        return  music.dislikeCount
    }
}