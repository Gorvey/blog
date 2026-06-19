<script setup lang="ts">
interface FooterLink {
  icon?: string;
  to?: string;
  target?: string;
  label?: string;
}

const appConfig = useAppConfig();
const footer = appConfig.footer as {
  credits?: string;
  colorMode?: boolean;
  links?: FooterLink[];
};
</script>

<template>
  <UFooter>
    <template #left>
      <span v-if="footer.credits">{{ footer.credits }}</span>
    </template>

    <template #right>
      <UColorModeButton v-if="footer.colorMode" />

      <template v-if="footer.links">
        <UButton
          v-for="(link, index) of footer.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>
  </UFooter>
</template>
