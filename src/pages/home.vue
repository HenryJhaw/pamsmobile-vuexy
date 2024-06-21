<script setup>
import AnalyticsSupportTracker from '@/views/dashboards/analytics/AnalyticsSupportTracker.vue'
import EcommerceGeneratedLeads from '@/views/dashboards/ecommerce/EcommerceGeneratedLeads.vue'
import EcommerceStatistics from '@/views/dashboards/ecommerce/EcommerceStatistics.vue'
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Support Tracker -->
    <VCol
      cols="12"
      md="6"
    >
      <AnalyticsSupportTracker />
    </VCol>
    <!-- 👉 Statistics -->
    <VRow>
      <VCol
        cols="12"
        md="6"
        lg="8"
      >
        <EcommerceStatistics class="h-100" />
      </VCol>
      <!-- 👉 Generated Leads -->
      <VCol
        cols="12"
        md="6"
        lg="4"
      >
        <EcommerceGeneratedLeads />
      </VCol>
    </VRow>
  </VRow>
</template>
