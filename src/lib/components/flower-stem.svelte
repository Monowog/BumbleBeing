
<div class="stem">
</div>

<style>

  @keyframes wobble {
    0% { transform: translateX(0%) rotate(0deg); }
    15% { transform: translateX(-5%) rotate(-1deg); }
    30% { transform: translateX(20%) rotate(3deg); }
    45% { transform: translateX(-15%) rotate(-3deg); }
    60% { transform: translateX(10%) rotate(2deg); }
    75% { transform: translateX(-5%) rotate(-1deg); }
    100% { transform: translateX(0%) rotate(0deg); }
  }

  .stem {
    border-radius: 0 0 4px 4px;
    transform-origin: top center;
    top: 50%;
    margin: 0 auto;
    animation: wobble 4.5s infinite;
    transform: translateY(0%);
    position: fixed;
    height: 70vh;
    width: 2vw;
    background-image: linear-gradient(to right, var(--color-flower-stalk), #0a5e42);
    box-shadow: 0 4px 10px rgba(0,0,0,0.6);
  }
</style>