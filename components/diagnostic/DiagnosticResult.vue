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

const normalizedScore = computed(() => {
  if (Number.isNaN(props.score)) return 0
  return Math.min(100, Math.max(0, props.score))
})

const level = computed(() => {
  if (normalizedScore.value <= 40) return 'fragile'
  if (normalizedScore.value <= 75) return 'clarify'
  return 'solid'
})

const result = computed(() => {
  if (level.value === 'fragile') {
    return {
      eyebrow: 'Diagnostic stratégique',
      label: 'Positionnement fragile',
      status: 'À clarifier en priorité',
      title: 'Votre projet a du potentiel, mais le message doit devenir plus évident.',
      description:
        'Plusieurs signaux montrent que votre proposition de valeur, votre cible ou votre différenciation peuvent encore manquer de clarté. Ce n’est pas bloquant, mais c’est souvent ce qui freine la conversion.',
      summary:
        'Priorité : rendre votre promesse plus simple, plus concrète et plus orientée utilisateur.',
      insights: [
        {
          icon: '01',
          title: 'Promesse à simplifier',
          text: 'Votre proposition de valeur doit pouvoir être comprise en quelques secondes.'
        },
        {
          icon: '02',
          title: 'Cible à préciser',
          text: 'Un persona trop large rend souvent le message moins convaincant.'
        },
        {
          icon: '03',
          title: 'Différenciation à renforcer',
          text: 'Votre marché et vos alternatives doivent être plus clairement positionnés.'
        }
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
      eyebrow: 'Diagnostic stratégique',
      label: 'Positionnement en construction',
      status: 'Base intéressante',
      title: 'Votre base existe, mais votre message peut devenir beaucoup plus fort.',
      description:
        'Votre projet semble déjà avoir une direction, mais certains éléments peuvent encore ralentir la compréhension, la confiance ou la conversion.',
      summary:
        'Priorité : transformer une idée intéressante en message clair, crédible et différenciant.',
      insights: [
        {
          icon: '01',
          title: 'Message à rendre plus direct',
          text: 'Votre proposition de valeur existe, mais elle peut probablement être plus lisible.'
        },
        {
          icon: '02',
          title: 'Preuves à mieux valoriser',
          text: 'Votre page doit davantage relier problème, bénéfice et crédibilité.'
        },
        {
          icon: '03',
          title: 'Différenciation à rendre visible',
          text: 'L’utilisateur doit comprendre rapidement pourquoi vous plutôt qu’une alternative.'
        }
      ],
      actions: [
        'Tester 3 formulations différentes de votre promesse.',
        'Comparer votre message avec vos concurrents directs.',
        'Remplacer les fonctionnalités par des bénéfices concrets.'
      ]
    }
  }

  return {
    eyebrow: 'Diagnostic stratégique',
    label: 'Positionnement solide',
    status: 'Bon niveau de clarté',
    title: 'Votre positionnement semble déjà bien structuré.',
    description:
      'Votre marché, votre proposition de valeur et votre différenciation paraissent plutôt clairs. Le prochain enjeu sera probablement d’améliorer l’acquisition, la preuve et la conversion.',
    summary:
      'Priorité : capitaliser sur cette clarté pour générer plus de traction et de confiance.',
    insights: [
      {
        icon: '01',
        title: 'Message compréhensible',
        text: 'Votre proposition semble suffisamment claire pour être travaillée en acquisition.'
      },
      {
        icon: '02',
        title: 'Persona mieux identifié',
        text: 'Votre cible paraît plus lisible, ce qui facilite la création de contenus et d’offres.'
      },
      {
        icon: '03',
        title: 'Potentiel de conversion',
        text: 'Votre prochaine marge de progression se situe probablement dans la preuve et les canaux.'
      }
    ],
    actions: [
      'Travailler vos canaux d’acquisition prioritaires.',
      'Optimiser vos pages de conversion.',
      'Continuer à interroger vos utilisateurs régulièrement.'
    ]
  }
})

const scoreStyle = computed(() => ({
  '--score': `${normalizedScore.value * 3.6}deg`
}))

const canSubmit = computed(() =>
  firstname.value.trim().length > 1 &&
  email.value.trim().includes('@') &&
  website.value.trim().length > 5
)

const loading = ref(false)
const submitError = ref('')

async function submit() {

  if (!canSubmit.value)
    return

  loading.value = true
  submitError.value = ''

  try {

    const success =
      await emit(
        'submitLead',
        {
          firstname: firstname.value.trim(),
          email: email.value.trim(),
          company: company.value.trim(),
          website: website.value.trim()
        }
      )

    submitted.value = true

  }

  catch (error) {

    submitError.value =
      'Une erreur est survenue. Veuillez réessayer.'

    console.error(error)

  }

  finally {

    loading.value = false

  }

}
</script>

<template>
  <article class="result-card">
    <div class="result-shell">
      <aside class="score-panel">
        <div class="score-topline">
          <span class="badge">
            {{ result.eyebrow }}
          </span>

          <span class="score-status">
            {{ result.status }}
          </span>
        </div>

        <div
          class="score-ring"
          :style="scoreStyle"
        >
          <div class="score-inner">
            <strong>{{ normalizedScore }}</strong>
            <span>/100</span>
          </div>
        </div>

        <div class="score-copy">
          <h2>
            {{ result.label }}
          </h2>

          <p>
            {{ result.summary }}
          </p>
        </div>

        <button
          class="secondary-btn"
          type="button"
          @click="$emit('restart')"
        >
          Refaire le diagnostic
        </button>
      </aside>

      <section class="result-content">
        <header class="content-header">
          <span class="mini-label">
            Résultat personnalisé
          </span>

          <h1>
            {{ result.title }}
          </h1>

          <p>
            {{ result.description }}
          </p>
        </header>

        <div class="insight-grid">
          <article
            v-for="item in result.insights"
            :key="item.title"
            class="insight-card"
          >
            <span>
              {{ item.icon }}
            </span>

            <div>
              <h3>
                {{ item.title }}
              </h3>

              <p>
                {{ item.text }}
              </p>
            </div>
          </article>
        </div>

        <section class="action-panel">
          <div class="section-heading">
            <span>
              Prochaines étapes
            </span>

            <h3>
              3 actions concrètes à tester
            </h3>
          </div>

          <div class="action-list">
            <div
              v-for="(item, index) in result.actions"
              :key="item"
              class="action-item"
            >
              <span>
                {{ index + 1 }}
              </span>

              <p>
                {{ item }}
              </p>
            </div>
          </div>
        </section>

        <form
          v-if="!submitted"
          class="lead-form"
          @submit.prevent="submit"
        >
          <div class="form-content">
            <div>
              <span class="form-kicker">
                Audit offert
              </span>

              <h3>
                Recevez une analyse plus poussée de votre projet.
              </h3>

              <p>
                Ajoutez votre site pour recevoir un audit personnalisé de votre proposition de valeur,
                de votre marché, de votre différenciation et de vos leviers de conversion.
              </p>
            </div>

            <div class="benefits">
              <span>Analyse du positionnement</span>
              <span>Lecture de la page d’accueil</span>
              <span>Recommandations concrètes</span>
            </div>
          </div>

          <div class="fields">
            <label>
              <span>Prénom</span>
              <input
                v-model="firstname"
                autocomplete="given-name"
                placeholder="Votre prénom"
                type="text"
              >
            </label>

            <label>
              <span>Email professionnel</span>
              <input
                v-model="email"
                autocomplete="email"
                placeholder="vous@entreprise.com"
                type="email"
              >
            </label>

            <label>
              <span>Entreprise</span>
              <input
                v-model="company"
                autocomplete="organization"
                placeholder="Nom de votre projet"
                type="text"
              >
            </label>

            <label>
              <span>Site web</span>
              <input
                v-model="website"
                autocomplete="url"
                placeholder="https://votre-site.com"
                type="url"
              >
            </label>
          </div>

          <button
  class="submit-btn"
  :disabled="!canSubmit || loading"
  type="submit"
>

  <span v-if="loading">
    Analyse en cours...
  </span>

  <span v-else>
    Demander mon audit personnalisé
  </span>

</button>

          <p class="form-note">
            Sans engagement. Vos informations servent uniquement à préparer votre retour personnalisé.
          </p>
        </form>

        <section
          v-else
          class="success-card"
        >
          <div class="success-visual">
            <div class="success-icon">
              ✓
            </div>

            <span>
              Audit confirmé
            </span>
          </div>

          <div class="success-copy">
            <h3>
              Votre demande a bien été enregistrée.
            </h3>

            <p>
              Les informations transmises vont être étudiées afin de préparer une analyse plus complète
              de votre positionnement, de votre proposition de valeur et de votre différenciation.
            </p>
          </div>

          <div class="success-list">
            <div>
              <span>01</span>
              <p>Analyse de votre site et de votre message.</p>
            </div>

            <div>
              <span>02</span>
              <p>Identification des points forts et des zones de friction.</p>
            </div>

            <div>
              <span>03</span>
              <p>Envoi d’un audit personnalisé avec recommandations concrètes.</p>
            </div>
          </div>

          <div class="success-footer">
            Vous recevrez prochainement votre audit détaillé par email.
          </div>
        </section>
      </section>
    </div>
  </article>
</template>

<style scoped>
.result-card {
  position: relative;
  overflow: hidden;
  border-radius: 36px;
  background:
    radial-gradient(circle at top left, rgba(242, 163, 93, .22), transparent 34%),
    linear-gradient(135deg, #fffaf4 0%, #ffffff 42%, #f8f1ea 100%);
  border: 1px solid rgba(29, 26, 22, .08);
  box-shadow:
    0 30px 100px rgba(59, 39, 21, .12),
    inset 0 1px 0 rgba(255, 255, 255, .85);
}

.result-card::before {
  content: '';
  position: absolute;
  inset: 18px;
  pointer-events: none;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, .72);
}

.result-shell {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, .82fr) minmax(0, 1.18fr);
  gap: 0;
}

.score-panel {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: clamp(28px, 4vw, 46px);
  color: white;
  background:
    radial-gradient(circle at 82% 12%, rgba(242, 163, 93, .38), transparent 34%),
    radial-gradient(circle at 10% 88%, rgba(255, 255, 255, .12), transparent 28%),
    linear-gradient(145deg, #211b16, #0f0d0b);
}

.score-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.badge,
.score-status,
.mini-label,
.form-kicker {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.badge {
  padding: 9px 13px;
  color: #ffe4c4;
  background: rgba(255, 255, 255, .1);
  border: 1px solid rgba(255, 255, 255, .12);
}

.score-status {
  padding: 8px 12px;
  color: rgba(255, 255, 255, .76);
  background: rgba(255, 255, 255, .07);
}

.score-ring {
  width: min(240px, 72vw);
  aspect-ratio: 1;
  margin: clamp(32px, 5vw, 52px) auto 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background:
    conic-gradient(from -90deg, #f2a35d var(--score), rgba(255, 255, 255, .11) 0);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, .28),
    inset 0 0 0 1px rgba(255, 255, 255, .12);
}

.score-inner {
  width: 76%;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  align-content: center;
  border-radius: 50%;
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, .12), transparent 45%),
    #17120f;
  border: 1px solid rgba(255, 255, 255, .1);
}

.score-inner strong {
  font-size: clamp(54px, 8vw, 78px);
  line-height: .9;
  letter-spacing: -.08em;
}

.score-inner span {
  margin-top: 6px;
  color: rgba(255, 255, 255, .58);
  font-size: 15px;
  font-weight: 800;
}

.score-copy {
  margin-top: 34px;
}

.score-copy h2 {
  margin: 0;
  color: white;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1;
  letter-spacing: -.05em;
}

.score-copy p {
  margin: 16px 0 0;
  color: rgba(255, 255, 255, .7);
  line-height: 1.75;
}

.secondary-btn {
  width: fit-content;
  margin-top: auto;
  padding: 15px 18px;
  border: 0;
  border-radius: 16px;
  color: white;
  background: rgba(255, 255, 255, .11);
  font-weight: 900;
  cursor: pointer;
  transition:
    transform .2s ease,
    background .2s ease;
}

.secondary-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, .16);
}

.result-content {
  padding: clamp(28px, 5vw, 56px);
}

.content-header {
  max-width: 760px;
}

.mini-label,
.form-kicker {
  padding: 8px 12px;
  color: #b76b34;
  background: rgba(200, 121, 66, .1);
}

.content-header h1 {
  margin: 18px 0 0;
  color: #17120f;
  font-size: clamp(34px, 5vw, 58px);
  line-height: .98;
  letter-spacing: -.06em;
}

.content-header p {
  margin: 20px 0 0;
  color: #6d6259;
  font-size: 17px;
  line-height: 1.75;
}

.insight-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 34px;
}

.insight-card {
  min-height: 188px;
  padding: 20px;
  border-radius: 24px;
  background: rgba(255, 255, 255, .78);
  border: 1px solid rgba(29, 26, 22, .07);
  box-shadow: 0 16px 44px rgba(59, 39, 21, .06);
}

.insight-card > span {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 22px;
  border-radius: 12px;
  color: #c87942;
  background: rgba(200, 121, 66, .1);
  font-size: 13px;
  font-weight: 950;
}

.insight-card h3,
.action-panel h3,
.lead-form h3,
.success-card h3 {
  margin: 0;
  color: #17120f;
  line-height: 1.15;
  letter-spacing: -.03em;
}

.insight-card h3 {
  font-size: 17px;
}

.insight-card p {
  margin: 10px 0 0;
  color: #72665c;
  line-height: 1.65;
}

.action-panel {
  margin-top: 18px;
  padding: 26px;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(29, 26, 22, .96), rgba(44, 35, 29, .96));
  color: white;
  box-shadow: 0 20px 60px rgba(29, 26, 22, .12);
}

.section-heading span {
  display: block;
  margin-bottom: 8px;
  color: #f2a35d;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .09em;
  text-transform: uppercase;
}

.action-panel h3 {
  color: white;
  font-size: 24px;
}

.action-list {
  display: grid;
  gap: 12px;
  margin-top: 22px;
}

.action-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .08);
}

.action-item span {
  display: grid;
  place-items: center;
  min-width: 34px;
  height: 34px;
  border-radius: 11px;
  color: #1d1a16;
  background: #f2a35d;
  font-size: 13px;
  font-weight: 950;
}

.action-item p {
  margin: 0;
  color: rgba(255, 255, 255, .82);
  line-height: 1.6;
}

.lead-form,
.success-card {
  margin-top: 22px;
  padding: clamp(22px, 4vw, 34px);
  border-radius: 30px;
  background:
    linear-gradient(135deg, #ffffff, #fff7ef);
  border: 1px solid rgba(200, 121, 66, .14);
  box-shadow: 0 24px 70px rgba(200, 121, 66, .09);
}

.form-content {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 24px;
  align-items: start;
}

.lead-form h3 {
  margin-top: 14px;
  font-size: clamp(24px, 4vw, 34px);
}

.lead-form p {
  margin: 14px 0 0;
  color: #6d6259;
  line-height: 1.75;
}

.benefits {
  display: grid;
  gap: 10px;
}

.benefits span {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 14px;
  border-radius: 16px;
  color: #2c241f;
  background: rgba(255, 255, 255, .78);
  border: 1px solid rgba(29, 26, 22, .06);
  font-size: 14px;
  font-weight: 800;
}

.benefits span::before {
  content: '✓';
  display: grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  border-radius: 50%;
  color: white;
  background: #c87942;
  font-size: 12px;
}

.fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 28px;
}

label {
  display: grid;
  gap: 8px;
}

label span {
  color: #5e5148;
  font-size: 13px;
  font-weight: 850;
}

input {
  width: 100%;
  height: 58px;
  border: 1px solid rgba(29, 26, 22, .1);
  border-radius: 18px;
  background: rgba(255, 255, 255, .86);
  padding: 0 16px;
  color: #17120f;
  font: inherit;
  outline: none;
  transition:
    border-color .2s ease,
    box-shadow .2s ease,
    background .2s ease;
}

input::placeholder {
  color: rgba(29, 26, 22, .42);
}

input:focus {
  background: white;
  border-color: rgba(200, 121, 66, .6);
  box-shadow: 0 0 0 4px rgba(200, 121, 66, .13);
}

.submit-btn {
  width: 100%;
  height: 62px;
  margin-top: 18px;
  border: 0;
  border-radius: 20px;
  color: white;
  background:
    linear-gradient(135deg, #bf743f, #f2a35d);
  box-shadow: 0 18px 42px rgba(200, 121, 66, .26);
  font-weight: 950;
  cursor: pointer;
  transition:
    transform .2s ease,
    opacity .2s ease,
    box-shadow .2s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 24px 54px rgba(200, 121, 66, .32);
}

.submit-btn:disabled {
  opacity: .45;
  cursor: not-allowed;
  box-shadow: none;
}

.form-note {
  margin: 14px 0 0 !important;
  color: #8a7d72 !important;
  font-size: 13px;
  text-align: center;
}

.success-card {
  display: grid;
  gap: 24px;
  background:
    radial-gradient(circle at top right, rgba(242, 163, 93, .18), transparent 34%),
    linear-gradient(135deg, #ffffff, #fff8f1);
}

.success-visual {
  display: flex;
  align-items: center;
  gap: 16px;
}

.success-icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  color: white;
  background: linear-gradient(135deg, #bf743f, #f2a35d);
  box-shadow: 0 18px 40px rgba(200, 121, 66, .2);
  font-size: 30px;
  font-weight: 950;
}

.success-visual span {
  color: #b76b34;
  background: rgba(200, 121, 66, .1);
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 950;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.success-copy h3 {
  font-size: clamp(28px, 4vw, 42px);
}

.success-copy p {
  margin: 14px 0 0;
  color: #6d6259;
  line-height: 1.75;
}

.success-list {
  display: grid;
  gap: 10px;
}

.success-list div {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, .78);
  border: 1px solid rgba(29, 26, 22, .06);
}

.success-list span {
  display: grid;
  place-items: center;
  min-width: 38px;
  height: 38px;
  border-radius: 13px;
  color: #c87942;
  background: rgba(200, 121, 66, .1);
  font-size: 12px;
  font-weight: 950;
}

.success-list p {
  margin: 0;
  color: #5f544c;
  line-height: 1.55;
  font-weight: 700;
}

.success-footer {
  padding-top: 20px;
  border-top: 1px solid rgba(29, 26, 22, .08);
  color: #17120f;
  font-weight: 850;
}

@media (max-width: 1080px) {
  .result-shell {
    grid-template-columns: 1fr;
  }

  .score-panel {
    min-height: auto;
  }

  .secondary-btn {
    margin-top: 30px;
  }

  .insight-grid {
    grid-template-columns: 1fr;
  }

  .insight-card {
    min-height: auto;
  }
}

@media (max-width: 720px) {
  .result-card {
    border-radius: 28px;
  }

  .result-card::before {
    display: none;
  }

  .score-topline,
  .form-content,
  .success-visual {
    align-items: flex-start;
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .fields {
    grid-template-columns: 1fr;
  }

  .content-header h1 {
    font-size: 34px;
  }

  .action-panel,
  .lead-form,
  .success-card {
    border-radius: 24px;
  }
}
</style>