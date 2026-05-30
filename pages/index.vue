<script setup lang="ts">

import DiagnosticHero from '~/components/diagnostic/DiagnosticHero.vue'
import DiagnosticProgress from '~/components/diagnostic/DiagnosticProgress.vue'
import DiagnosticQuestion from '~/components/diagnostic/DiagnosticQuestion.vue'
import DiagnosticResult from '~/components/diagnostic/DiagnosticResult.vue'

const started = ref(false)

const currentQuestion = ref(0)

const score = ref(0)

const answers =
  ref<Record<string, unknown>>({})

const questions = [

  {
    id: 'clarity',

    title:
      'Quand quelqu’un découvre votre produit pour la première fois, comprend-il son utilité en moins de 10 secondes ?',

    description:
      'Si un visiteur arrive sur votre site aujourd’hui, comprend-il immédiatement ce que vous faites et pourquoi cela lui est utile ?',

    type: 'radio',

    options: [

      {
        label: 'Oui',
        points: 10
      },

      {
        label: 'Je ne sais pas',
        points: 5
      },

      {
        label: 'Non',
        points: 0
      }

    ]

  },

  {
    id: 'one_sentence',

    title:
      'Expliquez votre produit à un membre de votre famille en une seule phrase.',

    description:
      'Évitez le jargon. Si votre phrase est simple, votre positionnement l’est probablement aussi.',

    placeholder:
      'Exemple : Nous aidons les freelances à gérer leurs devis en quelques clics.',

    type: 'textarea'
  },

  {
    id: 'competitors',

    title:
      'Quels sont vos 3 principaux concurrents ?',

    description:
      'Et surtout : quelle différence un utilisateur remarquerait immédiatement entre eux et vous ?',

    type: 'competitors'
  },

  {
    id: 'difference',

    title:
      'Pourquoi un utilisateur devrait-il vous choisir plutôt qu’un concurrent ?',

    description:
      'Parlez bénéfice utilisateur, pas fonctionnalités.',

    placeholder:
      'Expliquez votre avantage principal.',

    type: 'textarea'
  },

  {
    id: 'homepage',

    title:
      'Votre page d’accueil parle-t-elle davantage des bénéfices utilisateurs que des fonctionnalités ?',

    description:
      'Beaucoup de startups parlent du produit alors que les utilisateurs cherchent une solution à leur problème.',

    type: 'radio',

    options: [

      {
        label: 'Oui',
        points: 10
      },

      {
        label: 'Je ne sais pas',
        points: 5
      },

      {
        label: 'Non',
        points: 0
      }

    ]

  },

  {
    id: 'persona',

    title:
      'Décrivez votre persona principal.',

    description:
      'Qui est-il ? Quel problème rencontre-t-il ? Quel résultat cherche-t-il ?',

    type: 'persona'
  },

  {
    id: 'market_validation',

    title:
      'Avez-vous déjà parlé avec au moins 10 utilisateurs potentiels ?',

    description:
      'Les hypothèses sont utiles. Les conversations réelles le sont encore plus.',

    type: 'radio',

    options: [

      {
        label: 'Oui',
        points: 10
      },

      {
        label: 'Entre 5 et 10',
        points: 5
      },

      {
        label: 'Non',
        points: 0
      }

    ]

  },

  {
    id: 'pain',

    title:
      'Votre persona a-t-il déjà exprimé ce problème dans la vraie vie ?',

    description:
      'Sur un forum, un groupe Facebook, Reddit, LinkedIn ou lors d’un échange réel.',

    type: 'radio',

    options: [

      {
        label: 'Oui',
        points: 10
      },

      {
        label: 'Je suppose',
        points: 5
      },

      {
        label: 'Non',
        points: 0
      }

    ]

  },

  {
    id: 'missing',

    title:
      'Si votre produit disparaissait demain, quelqu’un serait-il réellement déçu ?',

    description:
      'Le meilleur produit est celui dont l’absence crée un manque.',

    type: 'radio',

    options: [

      {
        label: 'Oui',
        points: 10
      },

      {
        label: 'Je ne sais pas',
        points: 5
      },

      {
        label: 'Non',
        points: 0
      }

    ]

  },

  {
    id: 'reaction',

    title:
      'Quand vous présentez votre projet, quelle est la réaction la plus fréquente ?',

    description:
      'Soyez honnête.',

    type: 'radio',

    options: [

      {
        label: 'Je comprends immédiatement',
        points: 10
      },

      {
        label: 'C’est intéressant mais flou',
        points: 5
      },

      {
        label: 'Je ne comprends pas vraiment',
        points: 0
      }

    ]

  }

]

const isFinished =
  computed(() =>
    currentQuestion.value >=
    questions.length
  )

function startDiagnostic() {

  started.value = true

}

function answerQuestion(
  payload: {
    id: string
    value: unknown
    points: number
  }
) {

  answers.value[
    payload.id
  ] = payload.value

  score.value +=
    payload.points

  currentQuestion.value++

}

function previousQuestion() {

  if (
    currentQuestion.value > 0
  ) {

    currentQuestion.value--

  }

}

function restart() {

  started.value = false

  currentQuestion.value = 0

  score.value = 0

  answers.value = {}

}

function submitLead(
  payload: {
    firstname: string
    email: string
    company: string
    website: string
  }
) {

  console.log(
    'Lead reçu',
    payload
  )

  console.log(
    'Réponses',
    answers.value
  )

}

useSeoMeta({

  title:
    'Diagnostic de Positionnement Startup',

  description:
    'Découvrez si votre problème est réellement l’acquisition ou votre positionnement.'

})

</script>

<template>

<main class="page">

  <DiagnosticHero
    v-if="!started"
    @start="startDiagnostic"
  />

  <template v-else>

    <div
      v-if="!isFinished"
      class="container"
    >

      <DiagnosticProgress
        :current="currentQuestion + 1"
        :total="questions.length"
      />

      <Transition
        name="fade"
        mode="out-in"
      >

        <DiagnosticQuestion

          :key="questions[currentQuestion]?.id"

          :question="questions[currentQuestion]!"

          :can-go-back="
            currentQuestion > 0
          "

          @answer="
            answerQuestion
          "

          @back="
            previousQuestion
          "
        />

      </Transition>

    </div>

    <div
      v-else
      class="container"
    >

      <DiagnosticResult

        :score="score"

        :answers="answers"

        @restart="
          restart
        "

        @submit-lead="
          submitLead
        "
      />

    </div>

  </template>

</main>

</template>

<style scoped>

.page {

  min-height: 100vh;

  background:
    linear-gradient(
      180deg,
      #fdfaf7,
      #f7f2ec
    );

}

.container {

  width: 100%;
  max-width: 1200px;

  margin: auto;

  padding:
    80px 20px;

}

.fade-enter-active,
.fade-leave-active {

  transition:
    .35s ease;

}

.fade-enter-from {

  opacity: 0;

  transform:
    translateY(20px);

}

.fade-leave-to {

  opacity: 0;

  transform:
    translateY(-20px);

}

</style>