package org.hobro.musicranker.repository.entity

import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
class User(
    @Id
    val id: UUID,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val createdAt: LocalDateTime
)