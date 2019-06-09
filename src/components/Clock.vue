<template>
  <div class="clock">
    <!--<div data-name="date">-->
      <!--{{ now.year }}.{{ now.month }}.{{ now.date }} {{ now.day }}-->
    <!--</div>-->
    <div data-name="time">
      {{ now.hour | addZero }}:{{ now.minutes | addZero }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_TIME } from '@/stores/configs';
// import { WEEK } from '@/constants';

// const week = [WEEK.SUNDAY, WEEK.MONDAY, WEEK.TUESDAY, WEEK.WEDNESDAY, WEEK.THURSDAY, WEEK.FRIDAY, WEEK.SATURDAY];
// const timeInterval = 30000; // 30s

export default {
  name: 'Clock',
  computed: {
    ...mapGetters({
      now: GET_TIME,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .clock {
    display: inline-block;
    padding: 1rem;
  }
  div[data-name="date"] {
    text-align: right;
  }
  div[data-name="time"] {
    font-size: 8rem;
  }
</style>
