package org.hobro.musicranker.model

import org.hobro.musicranker.model.enums.ChartType

data class ChartDTO(
    val topMusics: List<MusicDTO>,
    val wantedMusics: List<MusicDTO>,
    val title: String,
    val description: String,
    val chartType: ChartType
)
