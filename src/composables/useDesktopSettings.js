import { reactive, watch } from 'vue';
const defaults = { theme: 'aubergine', wallpaper: 'image', animations: true, shortcuts: true };
let saved = {};
try { saved = JSON.parse(localStorage.getItem('portfolio-desktop-settings') || '{}') || {}; } catch {}
export const desktopSettings = reactive({
  theme: ['aubergine', 'graphite'].includes(saved.theme) ? saved.theme : defaults.theme,
  wallpaper: ['image', 'gradient', 'plain'].includes(saved.wallpaper) ? saved.wallpaper : defaults.wallpaper,
  animations: typeof saved.animations === 'boolean' ? saved.animations : true,
  shortcuts: typeof saved.shortcuts === 'boolean' ? saved.shortcuts : true,
});
watch(desktopSettings, value => { try { localStorage.setItem('portfolio-desktop-settings', JSON.stringify(value)); } catch {} });
export function resetDesktopSettings() { Object.assign(desktopSettings, defaults); }
