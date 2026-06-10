export default defineNuxtPlugin({
  enforce: 'post',
  setup() {
    const appConfig = useAppConfig();

    if (import.meta.client) {
      function updateColor(type: 'primary' | 'neutral') {
        const color = localStorage.getItem(`nuxt-ui-${type}`);
        if (color) {
          appConfig.ui.colors[type] = color;
        }
      }

      function updateRadius() {
        const radius = localStorage.getItem('nuxt-ui-radius');
        if (radius) {
          appConfig.theme.radius = Number.parseFloat(radius);
        }
      }

      function updateBlackAsPrimary() {
        const blackAsPrimary = localStorage.getItem('nuxt-ui-black-as-primary');
        if (blackAsPrimary) {
          appConfig.theme.blackAsPrimary = blackAsPrimary === 'true';
        }
      }

      updateColor('primary');
      updateColor('neutral');
      updateRadius();
      updateBlackAsPrimary();
    }

    if (import.meta.server) {
      useHead({
        script: [
          {
            innerHTML: `
            const colorStyle = document.querySelector('style#nuxt-ui-colors');

            if (colorStyle) {
              let html = colorStyle.innerHTML;

              if (localStorage.getItem('nuxt-ui-primary')) {
                const primaryColor = localStorage.getItem('nuxt-ui-primary');
                if (primaryColor !== 'black') {
                  html = html.replace(
                    /(--ui-color-primary-\\d{2,3}:\\s*var\\(--color-)${appConfig.ui.colors.primary}(-\\d{2,3}.*?\\))/g,
                    \`$1\${primaryColor}$2\`
                  );
                }
              }
              if (localStorage.getItem('nuxt-ui-neutral')) {
                let neutralColor = localStorage.getItem('nuxt-ui-neutral');
                html = html.replace(
                  /(--ui-color-neutral-\\d{2,3}:\\s*var\\(--color-)${appConfig.ui.colors.neutral}(-\\d{2,3}.*?\\))/g,
                  \`$1\${neutralColor === 'neutral' ? 'old-neutral' : neutralColor}$2\`
                );
              }

              colorStyle.innerHTML = html;
            }
            `.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1
          },
          {
            innerHTML: `
            const radiusStyle = document.querySelector('style#nuxt-ui-radius');
            if (radiusStyle && localStorage.getItem('nuxt-ui-radius')) {
              radiusStyle.innerHTML = ':root { --ui-radius: ' + localStorage.getItem('nuxt-ui-radius') + 'rem; }';
            }
          `.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1
          },
          {
            innerHTML: `
            const blackStyle = document.querySelector('style#nuxt-ui-black-as-primary');
            if (blackStyle) {
              if (localStorage.getItem('nuxt-ui-black-as-primary') === 'true') {
                blackStyle.innerHTML = ':root { --ui-primary: black; } .dark { --ui-primary: white; }';
              } else {
                blackStyle.innerHTML = '';
              }
            }
          `.replace(/\s+/g, ' ')
          }
        ]
      });
    }
  }
});
