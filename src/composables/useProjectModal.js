import { computed, ref } from 'vue';

export function useProjectModal() {
  const selectedProject = ref(null);
  const isOpen = computed(() => Boolean(selectedProject.value));

  const openProject = (project) => {
    selectedProject.value = project;
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    selectedProject.value = null;
    document.body.style.overflow = '';
  };

  return {
    selectedProject,
    isOpen,
    openProject,
    closeProject,
  };
}