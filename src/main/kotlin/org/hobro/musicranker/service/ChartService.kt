package org.hobro.musicranker.service

import com.google.api.client.http.HttpRequestInitializer
import com.google.api.client.http.javanet.NetHttpTransport
import com.google.api.client.json.jackson2.JacksonFactory
import com.google.api.services.youtube.YouTube
import org.hobro.musicranker.controller.model.MusicRequest
import org.hobro.musicranker.model.ChartDTO
import org.hobro.musicranker.model.MusicDTO
import org.hobro.musicranker.repository.ChartRepository
import org.hobro.musicranker.repository.MusicRepository
import org.hobro.musicranker.repository.entity.Chart
import org.hobro.musicranker.repository.entity.Music
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class ChartService(
    val musicRepository: MusicRepository,
    val chartRepository: ChartRepository,
    @Value("\${YOUTUBE_API_KEY}")
    val youtubeApiKey: String
) {
    @Transactional
    fun addWantedMusic(chartId: Long, musicRequest: MusicRequest) {
        val chart = chartRepository.findById(chartId).get()

        val youtube =
            YouTube.Builder(NetHttpTransport(), JacksonFactory(), HttpRequestInitializer { })
                .setApplicationName("musicranker")
                .build()

        val searchResults = youtube.search().list("id").setKey(youtubeApiKey)
            .setQ(musicRequest.toQuery()).setType("video").setVideoEmbeddable("true")
            .execute().items

        if (searchResults.isEmpty()) {
            throw Exception("NO SUCH VIDEO")
        }

        val videoId = searchResults.first().id.videoId

        musicRepository.save(Music.of(musicRequest, videoId, chart))
        chartRepository.save(chart)
    }

    fun getChart(chartId: Long): ChartDTO {
        val chart = chartRepository.findById(chartId).get()

        return ChartDTO(
            title = chart.title,
            topMusics = chart.getRankedMusics().map { MusicDTO.of(it) },
            wantedMusics = chart.getWaitedMusics().map { MusicDTO.of(it) },
            description = chart.description,
            chartType = chart.chartType
        )
    }

    fun getChartList(): List<Chart> {
        return chartRepository.findAll()
    }

}