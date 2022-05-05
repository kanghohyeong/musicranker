package org.hobro.musicranker.repository.entity

import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Music(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long?,

    @Column(nullable = false)
    val url: String?,

    @Column(nullable = true)
    var rankedAt : LocalDateTime?,

    @Column(nullable = false)
    var likeCount: Long,

    @Column(nullable =  false)
    var dislikeCount: Long
)