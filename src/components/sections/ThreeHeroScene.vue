<template>
  <div ref="canvasWrap" class="absolute inset-0 h-full w-full overflow-hidden"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvasWrap = ref(null);
let dispose = null;

onMounted(async () => {
  if (!canvasWrap.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const THREE = await import('three');
  const { Scene, PerspectiveCamera, WebGLRenderer, BufferGeometry, Float32BufferAttribute, PointsMaterial, Points, Color, Group, SphereGeometry, MeshStandardMaterial, Mesh, AmbientLight, DirectionalLight } = THREE;

  const scene = new Scene();
  scene.fog = new THREE.Fog(0x050816, 12, 28);

  const camera = new PerspectiveCamera(55, canvasWrap.value.clientWidth / canvasWrap.value.clientHeight, 0.1, 100);
  camera.position.set(0, 0.2, 9.5);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvasWrap.value.clientWidth, canvasWrap.value.clientHeight);
  renderer.setClearColor(0x000000, 0);
  canvasWrap.value.appendChild(renderer.domElement);

  const group = new Group();
  scene.add(group);

  const pointsGeometry = new BufferGeometry();
  const pointCount = 1800;
  const positions = new Float32Array(pointCount * 3);

  for (let i = 0; i < pointCount; i += 1) {
    const radius = 6 + Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi) * 0.65;
  }

  pointsGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  const pointsMaterial = new PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    color: new Color('#89f7ff'),
    transparent: true,
    opacity: 0.9,
  });
  const points = new Points(pointsGeometry, pointsMaterial);
  group.add(points);

  const coreGeometry = new SphereGeometry(1.5, 64, 64);
  const coreMaterial = new MeshStandardMaterial({
    color: 0x15264d,
    emissive: 0x4c7dff,
    emissiveIntensity: 1.35,
    metalness: 0.8,
    roughness: 0.18,
  });
  const core = new Mesh(coreGeometry, coreMaterial);
  core.position.set(0, 0, 0);
  group.add(core);

  const ringGeometry = new SphereGeometry(2.6, 32, 32);
  const ringMaterial = new MeshStandardMaterial({
    color: 0x0b1530,
    emissive: 0xa855f7,
    emissiveIntensity: 0.8,
    metalness: 0.45,
    roughness: 0.25,
    wireframe: true,
  });
  const ring = new Mesh(ringGeometry, ringMaterial);
  group.add(ring);

  const ambient = new AmbientLight(0xffffff, 2.1);
  const directional = new DirectionalLight(0x89f7ff, 2.8);
  directional.position.set(4, 4, 8);
  scene.add(ambient, directional);

  const pointer = { x: 0, y: 0 };
  const handleMove = (event) => {
    const rect = canvasWrap.value.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
    pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
  };
  window.addEventListener('mousemove', handleMove, { passive: true });

  const onResize = () => {
    if (!canvasWrap.value) return;
    camera.aspect = canvasWrap.value.clientWidth / canvasWrap.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWrap.value.clientWidth, canvasWrap.value.clientHeight);
  };

  window.addEventListener('resize', onResize);

  let rafId = 0;
  const animate = (time) => {
    const t = time * 0.00035;
    group.rotation.y = t * 0.9 + pointer.x * 0.35;
    group.rotation.x = Math.sin(t * 0.7) * 0.12 + pointer.y * 0.18;
    core.rotation.y += 0.006;
    core.rotation.x += 0.003;
    ring.rotation.z -= 0.0025;
    points.rotation.y -= 0.0014;
    points.rotation.x += 0.0008;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };
  rafId = requestAnimationFrame(animate);

  dispose = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('mousemove', handleMove);
    renderer.dispose();
    pointsGeometry.dispose();
    pointsMaterial.dispose();
    coreGeometry.dispose();
    coreMaterial.dispose();
    ringGeometry.dispose();
    ringMaterial.dispose();
    renderer.domElement.remove();
  };
});

onBeforeUnmount(() => {
  if (dispose) dispose();
});
</script>