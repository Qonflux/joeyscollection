<template>
  <div class="spinner" :style="spinnerStyle" />
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 1.5
    },
    lineSize: {
      type: [Number, String],
      default: 0.25
    },
    lineBgColor: {
      type: String,
      default: '#eee'
    },
    lineFgColor: {
      type: String,
      default: '#7C3AED'
    },
    speed: {
      type: [Number, String],
      default: 0.8
    }
  },
  computed: {
    spinnerStyle() {
      return {
        'margin': '0 auto',
        'border-radius': '100%',
        'border': this.lineSize + 'rem solid ' + this.lineBgColor,
        'border-top': this.lineSize + 'rem solid ' + this.lineFgColor,
        'width': this.size + 'rem',
        'height': this.size + 'rem',
        'animation': 'spinner-spin ' + this.speed + 's linear infinite'
      }
    }
  }
}
</script>

<style>
.spinner {
  transition: all 0.3s linear;
}

@keyframes spinner-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>