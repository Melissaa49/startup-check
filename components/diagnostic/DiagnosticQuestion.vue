<script setup lang="ts">
type QuestionType =
  | 'textarea'
  | 'radio'
  | 'competitors'
  | 'persona'

interface Option {
  label: string
  points: number
}

interface Question {
  id: string
  title: string
  description?: string
  placeholder?: string
  type: QuestionType
  options?: Option[]
}

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  canGoBack: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  answer: [
    payload: {
      id: string
      value: unknown
      points: number
    }
  ]
  back: []
}>()

const textValue = ref('')

const competitors = reactive({
  first: '',
  second: '',
  third: '',
  difference: ''
})

const persona = reactive({
  age: '',
  job: '',
  problem: '',
  goal: ''
})

watch(
  () => props.question.id,
  () => {
    textValue.value = ''

    competitors.first = ''
    competitors.second = ''
    competitors.third = ''
    competitors.difference = ''

    persona.age = ''
    persona.job = ''
    persona.problem = ''
    persona.goal = ''
  }
)

const canContinue = computed(() => {
  if (props.question.type === 'textarea') {
    return textValue.value.trim().length >= 12
  }

  if (props.question.type === 'competitors') {
    return (
      competitors.first.trim().length > 1 &&
      competitors.second.trim().length > 1 &&
      competitors.third.trim().length > 1 &&
      competitors.difference.trim().length >= 12
    )
  }

  if (props.question.type === 'persona') {
    return (
      persona.age.trim().length > 0 &&
      persona.job.trim().length > 1 &&
      persona.problem.trim().length >= 8 &&
      persona.goal.trim().length >= 8
    )
  }

  return true
})

function scoreTextarea(value: string) {
  const length = value.trim().length

  if (length >= 160) return 10
  if (length >= 80) return 7
  if (length >= 30) return 4
  return 1
}

function submitTextarea() {
  emit('answer', {
    id: props.question.id,
    value: textValue.value.trim(),
    points: scoreTextarea(textValue.value)
  })
}

function submitCompetitors() {
  emit('answer', {
    id: props.question.id,
    value: {
      competitor_1: competitors.first.trim(),
      competitor_2: competitors.second.trim(),
      competitor_3: competitors.third.trim(),
      difference: competitors.difference.trim()
    },
    points: 10
  })
}

function submitPersona() {
  emit('answer', {
    id: props.question.id,
    value: {
      age: persona.age.trim(),
      job: persona.job.trim(),
      problem: persona.problem.trim(),
      goal: persona.goal.trim()
    },
    points: 10
  })
}

function selectOption(option: Option) {
  emit('answer', {
    id: props.question.id,
    value: option.label,
    points: option.points
  })
}
</script>

<template>
  <article class="question-card">
    <div class="question-header">
      <span class="eyebrow">
        Diagnostic de positionnement
      </span>

      <h2>
        {{ question.title }}
      </h2>

      <p v-if="question.description">
        {{ question.description }}
      </p>
    </div>

    <div
      v-if="question.type === 'radio'"
      class="answers"
    >
      <button
        v-for="option in question.options"
        :key="option.label"
        class="answer"
        @click="selectOption(option)"
      >
        <span>
          {{ option.label }}
        </span>

        <small>
          Sélectionner
        </small>
      </button>
    </div>

    <div
      v-else-if="question.type === 'textarea'"
      class="field-group"
    >
      <textarea
        v-model="textValue"
        :placeholder="question.placeholder"
        maxlength="500"
      />

      <div class="field-footer">
        <span>
          {{ textValue.length }}/500
        </span>

        <button
          class="next-btn"
          :disabled="!canContinue"
          @click="submitTextarea"
        >
          Continuer
        </button>
      </div>
    </div>

    <div
      v-else-if="question.type === 'competitors'"
      class="field-group"
    >
      <div class="grid">
        <input
          v-model="competitors.first"
          placeholder="Concurrent 1"
        >

        <input
          v-model="competitors.second"
          placeholder="Concurrent 2"
        >

        <input
          v-model="competitors.third"
          placeholder="Concurrent 3"
        >
      </div>

      <textarea
        v-model="competitors.difference"
        placeholder="Quelle est votre différence principale face à ces alternatives ?"
        maxlength="500"
      />

      <div class="field-footer">
        <span>
          Marché & différenciation
        </span>

        <button
          class="next-btn"
          :disabled="!canContinue"
          @click="submitCompetitors"
        >
          Continuer
        </button>
      </div>
    </div>

    <div
      v-else-if="question.type === 'persona'"
      class="field-group"
    >
      <div class="grid">
        <input
          v-model="persona.age"
          placeholder="Âge / tranche d’âge"
        >

        <input
          v-model="persona.job"
          placeholder="Métier / situation"
        >
      </div>

      <textarea
        v-model="persona.problem"
        placeholder="Quel est son problème principal ?"
        maxlength="300"
      />

      <textarea
        v-model="persona.goal"
        placeholder="Quel résultat cherche-t-il à obtenir ?"
        maxlength="300"
      />

      <div class="field-footer">
        <span>
          Persona principal
        </span>

        <button
          class="next-btn"
          :disabled="!canContinue"
          @click="submitPersona"
        >
          Continuer
        </button>
      </div>
    </div>

    <button
      v-if="canGoBack"
      class="back-btn"
      @click="$emit('back')"
    >
      ← Question précédente
    </button>
  </article>
</template>

<style scoped>
.question-card {
  min-height: 560px;
  padding: clamp(28px, 5vw, 54px);
  border-radius: 38px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.96), rgba(255,255,255,.78));
  box-shadow:
    0 26px 80px rgba(70, 45, 20, .12),
    inset 0 0 0 1px rgba(255,255,255,.8);
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 18px;
  padding: 9px 14px;
  border-radius: 999px;
  background: #fff4e8;
  color: #a45f33;
  font-size: 13px;
  font-weight: 900;
}

h2 {
  max-width: 820px;
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.04;
  letter-spacing: -.05em;
}

p {
  max-width: 760px;
  margin: 18px 0 0;
  color: #746b62;
  font-size: 18px;
  line-height: 1.65;
}

.answers,
.field-group {
  margin-top: 36px;
}

.answers {
  display: grid;
  gap: 14px;
}

.answer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 22px;
  border: 1px solid rgba(29, 26, 22, .09);
  border-radius: 24px;
  background: white;
  color: #1d1a16;
  cursor: pointer;
  transition: .25s ease;
  text-align: left;
}

.answer span {
  font-weight: 850;
}

.answer small {
  color: #9b8c80;
  font-weight: 800;
}

.answer:hover {
  transform: translateY(-3px);
  border-color: rgba(200, 121, 66, .45);
  box-shadow: 0 16px 36px rgba(70, 45, 20, .09);
}

.field-group {
  display: grid;
  gap: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

input,
textarea {
  width: 100%;
  border: 1px solid rgba(29, 26, 22, .09);
  border-radius: 24px;
  background: white;
  color: #1d1a16;
  outline: none;
  transition: .2s ease;
}

input {
  height: 62px;
  padding: 0 18px;
}

textarea {
  min-height: 170px;
  resize: vertical;
  padding: 20px;
  line-height: 1.55;
}

input:focus,
textarea:focus {
  border-color: rgba(200, 121, 66, .55);
  box-shadow: 0 0 0 4px rgba(200, 121, 66, .12);
}

.field-footer {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  color: #8a7d71;
  font-size: 14px;
  font-weight: 800;
}

.next-btn {
  border: 0;
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 18px;
  background: #1d1a16;
  color: white;
  font-weight: 900;
  transition: .2s ease;
}

.next-btn:disabled {
  cursor: not-allowed;
  opacity: .35;
}

.next-btn:not(:disabled):hover {
  transform: translateY(-2px);
}

.back-btn {
  margin-top: 28px;
  border: 0;
  background: transparent;
  color: #7d7166;
  cursor: pointer;
  font-weight: 850;
}

@media (max-width: 720px) {
  .question-card {
    min-height: auto;
    border-radius: 30px;
    padding: 26px;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .field-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .next-btn {
    width: 100%;
  }

  .answer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>