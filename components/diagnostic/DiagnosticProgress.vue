<template>
  <div class="progress-wrapper">
    <div class="top">
      <span>
        Question {{ current }} / {{ total }}
      </span>

      <span>
        {{ percent }}%
      </span>
    </div>

    <div class="track">
      <div
        class="bar"
        :style="{ width: `${percent}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  current: number
  total: number
}>()

const percent = computed(() =>
  Math.round((props.current / props.total) * 100)
)
</script>

<style scoped>
.progress-wrapper {
  margin-bottom: 26px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 12px;
  color: #7a6f64;
  font-size: 14px;
  font-weight: 800;
}

.track {
  height: 12px;
  border-radius: 999px;
  background: rgba(29, 26, 22, .08);
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1d1a16, #c87942);
  transition: width .45s ease;
}
</style>