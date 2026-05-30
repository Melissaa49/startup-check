<script setup lang="ts">
const props = defineProps<{
  score: number
  answers: Record<string, unknown>
}>()

const emit = defineEmits<{
  restart: []
  submitLead: [
    payload: {
      firstname: string
      email: string
      company: string
      website: string
    }
  ]
}>()

const firstname = ref('')
const email = ref('')
const company = ref('')
const website = ref('')
const submitted = ref(false)

const level = computed(() => {
  if (props.score <= 40) return 'fragile'
  if (props.score <= 75) return 'clarify'
  return 'solid'
})

const result = computed(() => {
  if (level.value === 'fragile') {
    return {
      label: 'Positionnement fragile',
      title: 'Votre projet mérite probablement un vrai travail de clarification.',
      description:
        'Votre produit peut être intéressant, mais plusieurs éléments semblent encore flous : persona, bénéfice utilisateur, différenciation ou compréhension du marché.',
      observations: [
        'Votre proposition de valeur semble difficile à résumer simplement.',
        'Votre marché ou vos concurrents ne sont peut-être pas encore assez cadrés.',
        'Votre message risque de parler davantage de votre idée que du problème utilisateur.'
      ],
      actions: [
        'Interroger au moins 10 utilisateurs potentiels.',
        'Définir un persona principal très précis.',
        'Reformuler votre promesse en une phrase orientée bénéfice.'
      ]
    }
  }

  if (level.value === 'clarify') {
    return {
      label: 'Positionnement en construction',
      title: 'Votre base existe, mais votre message peut devenir beaucoup plus fort.',
      description:
        'Vous semblez avoir déjà une direction, mais certains éléments peuvent encore freiner la compréhension ou la conversion.',
      observations: [
        'Votre proposition de valeur existe mais peut être simplifiée.',
        'Votre différenciation mérite probablement d’être plus visible.',
        'Votre page d’accueil pourrait mieux relier problème, bénéfice et preuve.'
      ],
      actions: [
        'Tester 3 formulations différentes de votre promesse.',
        'Comparer votre message avec vos concurrents directs.',
        'Remplacer les fonctionnalités par des bénéfices concrets.'
      ]
    }
  }

  return {
    label: 'Positionnement solide',
    title: 'Votre positionnement semble déjà bien structuré.',
    description:
      'Votre marché, votre proposition de valeur et votre différenciation paraissent plutôt clairs. Votre prochain enjeu pourrait être l’acquisition ou la conversion.',
    observations: [
      'Votre message semble compréhensible.',
      'Votre persona paraît mieux identifié.',
      'Votre différenciation semble plus facile à défendre.'
    ],
    actions: [
      'Travailler vos canaux d’acquisition prioritaires.',
      'Optimiser vos pages de conversion.',
      'Continuer à interroger vos utilisateurs régulièrement.'
    ]
  }
})

const canSubmit = computed(() =>
  firstname.value.trim().length > 1 &&
  email.value.includes('@') &&
  website.value.trim().length > 5
)

function submit() {
  if (!canSubmit.value) return

  submitted.value = true

  emit('submitLead', {
    firstname: firstname.value.trim(),
    email: email.value.trim(),
    company: company.value.trim(),
    website: website.value.trim()
  })
}
</script>

<template>
  <article class="result-card">
    <div class="result-grid">
      <div class="score-panel">
        <span class="badge">
          Résultat du diagnostic
        </span>

        <div class="score">
          {{ score }}/100
        </div>

        <strong>
          {{ result.label }}
        </strong>

        <p>
          {{ result.description }}
        </p>

        <button
          class="secondary-btn"
          @click="$emit('restart')"
        >
          Refaire le diagnostic
        </button>
      </div>

      <div class="content-panel">
        <h2>
          {{ result.title }}
        </h2>

        <section>
          <h3>
            Ce que j’observerais en priorité
          </h3>

          <ul>
            <li
              v-for="item in result.observations"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section>
          <h3>
            Les 3 actions à tester
          </h3>

          <ol>
            <li
              v-for="item in result.actions"
              :key="item"
            >
              {{ item }}
            </li>
          </ol>
        </section>

        <form
          v-if="!submitted"
          class="lead-form"
          @submit.prevent="submit"
        >
          <div class="form-header">
            <h3>
              Recevoir un retour personnalisé
            </h3>

            <p>
              Ajoutez votre site. Je pourrai regarder votre page d’accueil,
              votre promesse et votre positionnement plus précisément.
            </p>
          </div>

          <div class="fields">
            <input
              v-model="firstname"
              placeholder="Prénom"
            >

            <input
              v-model="email"
              placeholder="Email professionnel"
            >

            <input
              v-model="company"
              placeholder="Nom de la startup"
            >

            <input
              v-model="website"
              placeholder="https://votre-site.com"
            >
          </div>

          <button
            class="submit-btn"
            :disabled="!canSubmit"
          >
            Demander mon audit
          </button>
        </form>

        <div
          v-else
          class="success"
        >
          <strong>
            Demande enregistrée.
          </strong>

          <p>
            Vous avez maintenant une base beaucoup plus intéressante qu’un
            simple score : vos réponses, votre site et les premiers signaux à
            analyser.
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.result-card {
  border-radius: 42px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.96), rgba(255,255,255,.8));
  box-shadow:
    0 30px 90px rgba(70, 45, 20, .12),
    inset 0 0 0 1px rgba(255,255,255,.8);
  overflow: hidden;
}

.result-grid {
  display: grid;
  grid-template-columns: .9fr 1.1fr;
}

.score-panel {
  padding: clamp(32px, 5vw, 54px);
  background:
    radial-gradient(circle at top right, rgba(255, 191, 128, .28), transparent 45%),
    #1d1a16;
  color: white;
}

.badge {
  display: inline-flex;
  padding: 9px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  color: #ffe3c2;
  font-size: 13px;
  font-weight: 900;
}

.score {
  margin-top: 34px;
  font-size: clamp(68px, 10vw, 108px);
  font-weight: 950;
  letter-spacing: -.08em;
}

.score-panel strong {
  display: block;
  font-size: 25px;
}

.score-panel p {
  margin-top: 18px;
  color: rgba(255,255,255,.72);
  line-height: 1.7;
}

.content-panel {
  padding: clamp(32px, 5vw, 54px);
}

h2 {
  margin: 0;
  font-size: clamp(32px, 5vw, 50px);
  line-height: 1.05;
  letter-spacing: -.05em;
}

section {
  margin-top: 34px;
}

h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

ul,
ol {
  margin: 0;
  padding-left: 22px;
  color: #6d6259;
  line-height: 1.8;
}

.lead-form {
  margin-top: 40px;
  padding: 24px;
  border-radius: 28px;
  background: #fbf4ec;
}

.form-header p {
  margin: 8px 0 0;
  color: #746b62;
  line-height: 1.6;
}

.fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 20px;
}

input {
  height: 58px;
  border: 1px solid rgba(29, 26, 22, .08);
  border-radius: 18px;
  background: white;
  padding: 0 16px;
  outline: none;
}

input:focus {
  border-color: rgba(200, 121, 66, .55);
  box-shadow: 0 0 0 4px rgba(200, 121, 66, .12);
}

.submit-btn,
.secondary-btn {
  border: 0;
  cursor: pointer;
  font-weight: 900;
  transition: .2s ease;
}

.submit-btn {
  width: 100%;
  height: 60px;
  margin-top: 14px;
  border-radius: 18px;
  background: #1d1a16;
  color: white;
}

.submit-btn:disabled {
  opacity: .35;
  cursor: not-allowed;
}

.secondary-btn {
  margin-top: 28px;
  padding: 15px 20px;
  border-radius: 16px;
  background: rgba(255,255,255,.12);
  color: white;
}

.success {
  margin-top: 36px;
  padding: 24px;
  border-radius: 24px;
  background: #eef8ee;
  color: #244326;
}

.success p {
  margin: 8px 0 0;
  line-height: 1.6;
}

@media (max-width: 860px) {
  .result-grid {
    grid-template-columns: 1fr;
  }

  .fields {
    grid-template-columns: 1fr;
  }
}
</style>