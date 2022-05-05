package org.hobro.musicranker.utils.annotation

import org.springframework.web.bind.annotation.RequestMapping

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@RequestMapping("/api")
annotation class RestApiMapping()
