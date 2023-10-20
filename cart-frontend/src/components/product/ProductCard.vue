<template>
  <v-card>
    <v-img :src="image" aspect-ratio="1"></v-img>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-row justify="center">
      <v-btn @click="performAction">{{ actionLabel }}</v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
    actionLabel: String,
    action: Function
  },
  methods: {
    performAction() {
      this.action && this.action()
    }
  }
}
</script>
