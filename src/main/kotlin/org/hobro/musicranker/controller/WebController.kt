package org.hobro.musicranker.controller

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebController : ErrorController{

    @GetMapping(path = ["/", "/error"])
    fun forward(): String {
        return "/index.html"
    }


}