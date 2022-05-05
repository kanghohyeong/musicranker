package org.hobro.musicranker

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class MusicRankerApplication

fun main(args: Array<String>) {
    runApplication<MusicRankerApplication>(*args)
}
