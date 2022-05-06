package org.hobro.musicranker.service

import org.hobro.musicranker.controller.model.MusicRequest
import org.hobro.musicranker.model.ChartDTO
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

        val music = musicRepository.save(Music.of(musicRequest))

        val wantedMusics = chart.wantedMusics

        if (wantedMusics != null) {
            wantedMusics.add(music.id!!)
        } else {
            chart.wantedMusics = mutableListOf(music.id!!)
        }

        chartRepository.save(chart)
    }

    fun getChart(chartId: Long): ChartDTO {
        val chart = chartRepository.findById(chartId).get()

        return ChartDTO(
            title = chart.title,
            topMusics = musicRepository.findAllById(chart.topMusics ?: mutableListOf())
                .sortedBy { music -> chart.topMusics?.indexOf(music.id) },
            wantedMusics = musicRepository.findAllById(chart.wantedMusics ?: mutableListOf())
                .sortedBy { music -> chart.wantedMusics?.indexOf(music.id) },
            prevRanking = chart.prevTopMusics ?: mutableListOf()
        )
    }

    fun getChartList(): List<Chart> {
        return chartRepository.findAll()
    }

}