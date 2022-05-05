package org.hobro.musicranker.schedule

import org.hobro.musicranker.repository.ChartRepository
import org.hobro.musicranker.repository.MusicRepository
import org.hobro.musicranker.repository.entity.Music
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class RankingCalculator(
    val chartRepository: ChartRepository,
    val musicRepository: MusicRepository
) {

    @Scheduled(fixedRate = 1000 * 60 * 5)
    fun calculate() {
        val charts = chartRepository.findAll()

        charts.forEach { chart ->
            val topMusics = musicRepository.findAllById(chart.topMusics ?: mutableListOf())
                .sortedBy { music ->
                    chart.topMusics?.indexOf(music.id)
                }.toMutableList()
            val wantedMusics = musicRepository.findAllById(chart.wantedMusics ?: mutableListOf())
                .sortedBy { music ->
                    -(music.likeCount - music.dislikeCount)
                }.toMutableList()

            var updatedMusics = mutableListOf<Music>()
            updatedMusics.addAll(topMusics)
            updatedMusics.addAll(wantedMusics)
            updatedMusics = updatedMusics.distinctBy { it.id }.toMutableList()
            val newTopMusics = mutableListOf<Long>()
            val newWantedMusics = mutableListOf<Long>()

            // top ranking 계산
            if (topMusics.isNotEmpty()) {
                topMusics.reverse()
                var lastMusic = topMusics.first()
                for (i: Int in 1 until topMusics.size) {
                    val curMusic = topMusics[i]

                    if (compareRank(lastMusic, curMusic)) {
                        newTopMusics.add(curMusic.id!!)
                        lastMusic.likeCount--
                    } else {
                        newTopMusics.add(lastMusic.id!!)
                        lastMusic = curMusic
                    }
                }
                newTopMusics.add(lastMusic.id!!)
                newTopMusics.reverse()
            }

            // 대기열 랭킹업
            if (wantedMusics.isNotEmpty()) {
                if (newTopMusics.size < 100) {
                    while (true) {
                        newTopMusics.add(wantedMusics.first().id!!)
                        updatedMusics.find { it.id == wantedMusics.first().id }!!.rankedAt = LocalDateTime.now()
                        wantedMusics.removeFirst()
                        if (newTopMusics.size == 100 || wantedMusics.size == 0) break
                    }
                } else {
                    val limit = if (wantedMusics.size < 5) wantedMusics.size else 5
                    for (i: Int in 0 until limit) {
                        updatedMusics.find { it.id == newTopMusics[100 - limit + i] }!!.rankedAt = null
                        newTopMusics[100 - limit + i] = wantedMusics[i].id!!
                        updatedMusics.find { it.id == wantedMusics[i].id }!!.rankedAt = LocalDateTime.now()
                    }
                    for (j: Int in limit until wantedMusics.size) {
                        newWantedMusics.add(wantedMusics[j].id!!)
                    }
                }
            }

            // 차트 업데이트
            chart.prevTopMusics = chart.topMusics
            chart.topMusics = newTopMusics
            chart.wantedMusics = newWantedMusics
            chartRepository.save(chart)

            // 음악 업데이트
            updatedMusics.map { resetLike(it) }
            musicRepository.saveAll(updatedMusics)

        }
    }

    private fun compareRank(lastMusic: Music, curMusic: Music): Boolean {
        if ((lastMusic.likeCount - lastMusic.dislikeCount) > (curMusic.likeCount - curMusic.dislikeCount)) {
            return true // 아래 랭크 증가
        }
        return false // 랭크 그대로
    }

    private fun resetLike(music: Music): Music {
        music.likeCount = 0
        music.dislikeCount = 0
        return music
    }
}