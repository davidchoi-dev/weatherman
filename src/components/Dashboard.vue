<template>
  <div id="dashboard">
    <div class="main-info">
      <Clock />
      <p
        data-name="greeting"
        v-show="userName">
        {{ computedGreeting }}, {{ userName }}
      </p>
    </div>
    <WeatherViewer />
    <AirQualityViewer />
    <WeatherPhotoInfo />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { GET_DAY_NIGHT } from '@/stores/configs';
import Clock from '@/components/Clock';
import WeatherViewer from '@/components/WeatherViewer';
import { DAY_NIGHT } from '@/constants';
import AirQualityViewer from '@/components/AirQualityViewer';
import WeatherPhotoInfo from '@/components/WeatherPhotoInfo';

export default {
  name: 'Dashboard',
  components: {
    WeatherPhotoInfo,
    Clock,
    WeatherViewer,
    AirQualityViewer,
  },
  computed: {
    computedGreeting () {
      if (this.dayNight === DAY_NIGHT.DAY) {
        return 'Good day';
      }
      else if (this.dayNight === DAY_NIGHT.NIGHT) {
        return 'Good Evening';
      }
      else {
        return 'Hi';
      }
    },
    ...mapState({
      userName: 'userName',
    }),
    ...mapGetters({
      dayNight: GET_DAY_NIGHT,
    }),
  },
};
</script>

<style lang="scss" scoped>
$padding: 1.5rem;

#dashboard {
  height: 100vh;
}
.main-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .clock {
    color: #fff;
  }
  p[data-name="greeting"] {
    color: #fff;
    font-size: 2.5rem;
  }
}
.weather-viewer {
  position: absolute;
  top: $padding;
  right: $padding;
  color: #fff;
}
.weather-photo-info {
  position: absolute;
  bottom: $padding;
  left: $padding;
  color: #fff;
}
.air-quality-viewer {
  position: absolute;
  bottom: $padding;
  right: $padding;
  color: #fff;
}
</style>
