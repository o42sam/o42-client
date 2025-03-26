import { writable } from 'svelte/store';

const DISPLAY_BREAKPOINTS = {
  mobile: '(max-width: 767px)',
  desktop: '(min-width: 768px)'
};

export const display = (() => {
  const { subscribe, set } = writable({
    isMobile: false,
    isDesktop: false
  });

  if (typeof window !== 'undefined') {
    const mobileMQ = window.matchMedia(DISPLAY_BREAKPOINTS.mobile);
    const desktopMQ = window.matchMedia(DISPLAY_BREAKPOINTS.desktop);

    set({
      isMobile: mobileMQ.matches,
      isDesktop: desktopMQ.matches
    });

    const updateMedia = () => {
      set({
        isMobile: mobileMQ.matches,
        isDesktop: desktopMQ.matches
      });
    };

    mobileMQ.addEventListener('change', updateMedia);
    desktopMQ.addEventListener('change', updateMedia);

    return {
      subscribe,
      cleanup: () => {
        mobileMQ.removeEventListener('change', updateMedia);
        desktopMQ.removeEventListener('change', updateMedia);
      }
    };
  }

  return { subscribe };
})();

export const scrollY = writable<number>(0);

export const mediaLocation = writable({
  ip: "",
  gps: ""
});

export const isTrusted = writable(false);