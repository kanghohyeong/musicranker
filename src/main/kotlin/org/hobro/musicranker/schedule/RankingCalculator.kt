package org.hobro.musicranker.schedule

import org.hobro.musicranker.repository.ChartRepository
import org.hobro.musicranker.repository.MusicRepository
import org.hobro.musicranker.repository.entity.Music
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import javax.transaction.Transactional

@Component
class RankingCalculator(
    val chartRepository: ChartRepository,
    val musicRepository: MusicRepository
) {

    @Scheduled(fixedRate = 1000 * 60 * 5)
    @Transactional
    fun calculate() {
        println("ranking start-------")

        val charts = chartRepository.findAll()

        charts.forEach { chart ->
            val topMusics = chart.getRankedMusics().toMutableList()
            val waitedMusics = chart.getWaitedMusics().filter { it.likeCount >= it.dislikeCount }.toMutableList()

            // top ranking 계산
            if (topMusics.isNotEmpty()) {
                var lastMusic = topMusics.last()
                lastMusic.prevRank = topMusics.size
                for (i: Int in topMusics.size - 1 - 1 downTo 0) {
                    val curMusic = topMusics[i]
                    curMusic.prevRank = i + 1

                    if (compareRank(lastMusic, curMusic)) {
                        curMusic.rank = i + 2
                        lastMusic.rank = i + 1
                        lastMusic.likeCount--
                    } else {
                        curMusic.rank = i + 1
                        lastMusic.rank = i + 2
                        lastMusic = curMusic
                    }
                }
            }

            // 대기열 랭킹업
            if (waitedMusics.isNotEmpty()) {
                if (topMusics.size < 100) {
                    for (i: Int in 0 until waitedMusics.size) {
                        val nextRank = topMusics.size + 1 + i
                        if (nextRank > 100) break
                        waitedMusics[i].rank = nextRank
                        waitedMusics[i].rankedAt = LocalDateTime.now()
                    }
                } else {
                    val limit = if (waitedMusics.size < 5) waitedMusics.size else 5
                    for (i: Int in 0 until limit) {
                        val curRank = 100 - limit + i
                        waitedMusics[i].rank = curRank
                        topMusics.find { it.rank == curRank }?.rank = null
                        waitedMusics[i].rankedAt = LocalDateTime.now()
                    }
                }
            }

            // 차트 업데이트
            val newMusics = topMusics.filter { it.isRanked() }
                .plus(waitedMusics.filter { it.isRanked() })
                .map { resetLike(it) }

            // 밀려난 음악 삭제
            val removedMusics = chart.musics?.filter { !newMusics.contains(it) }?.toMutableList()
            if (removedMusics != null) {
                musicRepository.deleteAll(removedMusics)
            }

            chart.musics = newMusics.toMutableList()
            chartRepository.save(chart)
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