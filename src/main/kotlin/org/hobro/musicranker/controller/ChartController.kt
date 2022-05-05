package org.hobro.musicranker.controller

import io.swagger.annotations.ApiOperation
import org.hobro.musicranker.controller.model.MusicRequest
import org.hobro.musicranker.service.ChartService
import org.hobro.musicranker.utils.annotation.RestApiMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RestApiMapping
class ChartController(
    val chartService: ChartService
) {

    @ApiOperation(value = "차트에 대기열 추가", notes = "대기열에 추가할 음악을 등록한다")
    @PostMapping("/chart/{chart_id}/wanted")
    fun addWantedMusic(
        @PathVariable(name = "chart_id", required = true)
        chartId: Long,

        @RequestBody(required = true)
        musicRequest: MusicRequest
    ) {
        chartService.addWantedMusic(chartId, musicRequest)
    }

}