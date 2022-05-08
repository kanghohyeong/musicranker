package org.hobro.musicranker.controller.model

class MusicRequest(
    val title: String,
    val singer: String,
) {
    fun toQuery(): String {
        return "$title $singer"
    }
}