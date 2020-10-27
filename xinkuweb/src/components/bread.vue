<!--
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-22 14:56:35
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-22 15:00:49
-->
<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  },
  methods: {
    isHome (route) {
      return route.name === "home";
    },
    getBreadcrumb () {
      let matched = this.$route.matched;
      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/Homes", meta: { title: "首页" } }].concat(matched);
      }
      this.breadList = matched;
    }
  },
  created () {
    this.getBreadcrumb();
  }
};
</script>