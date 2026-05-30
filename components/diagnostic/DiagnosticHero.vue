<template>
  <section class="hero">
    <div class="hero-card">
      <div class="content">
        <span class="badge">
          Diagnostic startup
        </span>

        <h1>
          Votre problème est-il vraiment l’acquisition ?
        </h1>

        <p>
          En quelques minutes, identifiez si votre startup manque réellement
          de trafic… ou si le vrai sujet se cache plutôt dans votre
          positionnement, votre marché ou votre proposition de valeur.
        </p>

        <button
          class="start-btn"
          @click="$emit('start')"
        >
          Commencer le diagnostic
        </button>
      </div>

      <div class="visual">
        <div class="floating-card card-one">
          Persona
        </div>

        <div class="floating-card card-two">
          Proposition de valeur
        </div>

        <div class="mockup">
          <div class="mockup-header">
            <span />
            <span />
            <span />
          </div>

          <div class="mockup-content">
            <strong>Score de clarté</strong>
            <div class="score">72%</div>
            <p>
              Votre positionnement existe, mais certains messages méritent
              d’être clarifiés.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  start: []
}>()
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px;
}

.hero-card {
  width: min(1180px, 100%);
  min-height: 680px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 48px;
  align-items: center;
  padding: 56px;
  border-radius: 42px;
  background:
    linear-gradient(135deg, rgba(255,255,255,.95), rgba(255,255,255,.68));
  box-shadow:
    0 30px 90px rgba(70, 45, 20, .12),
    inset 0 0 0 1px rgba(255,255,255,.7);
  overflow: hidden;
  position: relative;
}

.hero-card::before {
  content: "";
  position: absolute;
  width: 380px;
  height: 380px;
  right: -120px;
  top: -90px;
  border-radius: 50%;
  background: rgba(236, 150, 92, .16);
  filter: blur(4px);
}

.content {
  position: relative;
  z-index: 2;
}

.badge {
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 999px;
  background: #fff4e8;
  color: #9a5a2e;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: .02em;
}

h1 {
  max-width: 760px;
  margin: 22px 0 0;
  font-size: clamp(42px, 6vw, 78px);
  line-height: .95;
  letter-spacing: -.06em;
}

p {
  max-width: 640px;
  margin: 26px 0 0;
  font-size: 19px;
  line-height: 1.7;
  color: #6f645b;
}

.start-btn {
  margin-top: 34px;
  border: 0;
  cursor: pointer;
  padding: 18px 28px;
  border-radius: 20px;
  background: #1d1a16;
  color: white;
  font-weight: 800;
  box-shadow: 0 16px 30px rgba(29, 26, 22, .18);
  transition: .25s ease;
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 42px rgba(29, 26, 22, .22);
}

.visual {
  position: relative;
  min-height: 440px;
  display: grid;
  place-items: center;
}

.mockup {
  width: min(390px, 100%);
  border-radius: 36px;
  background: #1d1a16;
  color: white;
  padding: 22px;
  box-shadow: 0 32px 80px rgba(29, 26, 22, .24);
  transform: rotate(2deg);
}

.mockup-header {
  display: flex;
  gap: 7px;
  margin-bottom: 28px;
}

.mockup-header span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,.35);
}

.mockup-content {
  min-height: 300px;
  border-radius: 26px;
  padding: 28px;
  background:
    radial-gradient(circle at top right, rgba(255, 179, 113, .28), transparent 45%),
    #2a251f;
}

.mockup-content strong {
  color: #ffe3c2;
  font-size: 15px;
}

.score {
  margin-top: 28px;
  font-size: 76px;
  font-weight: 950;
  letter-spacing: -.07em;
}

.mockup-content p {
  margin-top: 20px;
  color: rgba(255,255,255,.72);
  font-size: 16px;
  line-height: 1.6;
}

.floating-card {
  position: absolute;
  z-index: 3;
  padding: 14px 18px;
  border-radius: 18px;
  background: white;
  font-weight: 900;
  color: #1d1a16;
  box-shadow: 0 18px 40px rgba(70, 45, 20, .13);
}

.card-one {
  top: 54px;
  left: 24px;
}

.card-two {
  right: 8px;
  bottom: 76px;
}

@media (max-width: 900px) {
  .hero {
    padding: 16px;
  }

  .hero-card {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 30px;
    border-radius: 30px;
  }

  .visual {
    min-height: 320px;
  }

  .floating-card {
    display: none;
  }
}
</style>