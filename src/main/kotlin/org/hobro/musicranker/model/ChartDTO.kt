package org.hobro.musicranker.model

import org.hobro.musicranker.repository.entity.Music

data class ChartDTO(
    val topMusics: List<Music>,
    val wantedMusics: List<Music>,
    val title: String,
    val prevRanking: List<Long>
)
