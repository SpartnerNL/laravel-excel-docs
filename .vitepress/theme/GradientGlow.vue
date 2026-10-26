<!-- The blurred yellow-to-orange shape from laravel-excel.com. The blur sits on the outer
     element and the clip-path on the inner one, so the clipped edges get blurred too. -->
<template>
    <div class="le-glow" aria-hidden="true">
        <div class="le-glow-blur">
            <div class="le-glow-shape" />
        </div>
    </div>
</template>

<style scoped>
.le-glow {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 0;
    height: 900px;
    overflow: hidden;
    pointer-events: none;
}

.le-glow-blur {
    position: absolute;
    top: -180px;
    left: 50%;
    filter: blur(64px);
    opacity: var(--le-glow-opacity);
    transform: translateX(-35%);
}

.le-glow-shape {
    width: min(1154px, 140vw);
    aspect-ratio: 1154 / 678;
    background-image: linear-gradient(to right bottom, rgb(236, 230, 83), rgb(245, 168, 35));
    clip-path: polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%);
}
</style>
