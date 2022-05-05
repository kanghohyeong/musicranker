package org.hobro.musicranker.repository

import org.hobro.musicranker.repository.entity.Chart
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChartRepository : JpaRepository<Chart, Long> {
}