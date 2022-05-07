package org.hobro.musicranker.service

import org.hobro.musicranker.controller.model.MusicRequest
import org.hobro.musicranker.model.ChartDTO
import org.hobro.musicranker.model.MusicDTO
import org.hobro.musicranker.repository.ChartRepository
import org.hobro.musicranker.repository.MusicRepository
import org.hobro.musicranker.repository.entity.Chart
import org.hobro.musicranker.repository.entity.Music
import org.springframework.stereotype.Service
import javax.transaction.Transactional

@Service
class ChartService(
    val musicRepository: MusicRepository,
    val chartRepository: ChartRepository
) {
    @Transactional
    fun addWantedMusic(chartId: Long, musicRequest: MusicRequest) {
        val chart = chartRepository.findById(chartId).get()

        musicRepository.save(Music.of(musicRequest, chart))
        chartRepository.save(chart)
    }

    fun getChart(chartId: Long): ChartDTO {
        val chart = chartRepository.findById(chartId).get()

        return ChartDTO(
            title = chart.title,
            topMusics = chart.getRankedMusics().sortedBy { it -> -it.rank!! }
                .map { MusicDTO.of(it) },
            wantedMusics = chart.getWaitedMusics().map { MusicDTO.of(it) },
            description = chart.description,
            chartType = chart.chartType
        )
    }

    fun getChartList(): List<Chart> {
        return chartRepository.findAll()
    }

}