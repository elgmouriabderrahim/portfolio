<template><div ref="canvasWrap" class="scene-canvas" aria-hidden="true"></div></template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
const canvasWrap = ref(null);
let dispose;
let cancelled = false;
onMounted(async () => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches) return;
  try {
    const THREE = await import('three');
    if (cancelled || !canvasWrap.value) return;
    const wrap = canvasWrap.value;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0.4, 9);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    wrap.appendChild(renderer.domElement);
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const material = new THREE.MeshPhysicalMaterial({ color: 0x77bcb5, metalness: 0.65, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.18 });
    const geometry = new THREE.TorusGeometry(1.52, 0.25, 24, 96);
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(i * Math.PI / 3, i * Math.PI / 3, i * 0.5);
      sculpture.add(ring);
    }
    const coreGeometry = new THREE.IcosahedronGeometry(0.66, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({ color: 0xd9e8df, metalness: 0.45, roughness: 0.24 });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);
    scene.add(new THREE.HemisphereLight(0xe8fff7, 0x17374e, 2.6));
    const lights = [[0xc6fff2, 40, -3, 4, 4], [0x82aaff, 28, 4, 1, 2], [0xffdbac, 35, 0, -3, -2]];
    lights.forEach(([color, intensity, x, y, z]) => { const light = new THREE.PointLight(color, intensity); light.position.set(x, y, z); scene.add(light); });
    const pointer = { x: 0, y: 0 };
    const move = (event) => { const bounds = wrap.getBoundingClientRect(); pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5; pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5; };
    const reset = () => { pointer.x = 0; pointer.y = 0; };
    const parent = wrap.parentElement;
    parent.addEventListener('pointermove', move, { passive: true });
    parent.addEventListener('pointerleave', reset);
    const resize = new ResizeObserver(() => { const width = wrap.clientWidth; const height = wrap.clientHeight; if (!width || !height) return; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); });
    resize.observe(wrap);
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let visible = true;
    const render = (time) => {
      const delta = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      elapsed += delta;
      sculpture.rotation.y += (pointer.x * 0.45 + elapsed * 0.12 - sculpture.rotation.y) * (1 - Math.exp(-3 * delta));
      sculpture.rotation.x += (0.35 + pointer.y * 0.3 - sculpture.rotation.x) * (1 - Math.exp(-3 * delta));
      sculpture.rotation.z = -0.3 + Math.sin(elapsed * 0.25) * 0.12;
      sculpture.position.y = Math.sin(elapsed * 0.65) * 0.12;
      core.rotation.y = elapsed * -0.22;
      renderer.render(scene, camera);
      wrap.classList.add('is-rendered');
      frame = requestAnimationFrame(render);
    };
    const sync = () => { cancelAnimationFrame(frame); previous = 0; if (!document.hidden && visible && !motion.matches) frame = requestAnimationFrame(render); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(wrap);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    dispose = () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', reset); geometry.dispose(); material.dispose(); coreGeometry.dispose(); coreMaterial.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  } catch (error) {
    // The CSS sculpture remains visible when WebGL is unavailable.
    console.warn('3D scene unavailable:', error);
  }
});
onBeforeUnmount(() => { cancelled = true; dispose?.(); });
</script>
