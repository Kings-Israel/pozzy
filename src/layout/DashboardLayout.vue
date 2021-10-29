<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Pozzy"
      title="Pozzy"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />
        <sidebar-item :link="{name: 'App Users', icon: 'ni ni-single-02', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Schools', icon: 'ni ni-building', path: '/maps'}"/>
        <sidebar-item :link="{name: 'Questions', icon: 'ni ni-books', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Videos', icon: 'ni ni-camera-compact', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Activities', icon: 'ni ni-user-run', path: '/activities'}"/>
        <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>

        <!-- <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
import SidebarItem from '../components/SidebarPlugin/SidebarItem.vue';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition,
        SidebarItem
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
