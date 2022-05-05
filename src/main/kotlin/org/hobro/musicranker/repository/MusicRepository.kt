package org.hobro.musicranker.repository

import org.hobro.musicranker.repository.entity.Music
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MusicRepository : JpaRepository<Music, Long> {
}