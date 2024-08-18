<template>
  <div>
    <!-- 公告 -->
    <!-- <div class="front-notice"><i class="el-icon-bell" style="margin-right: 2px"></i>公告：{{ top }}</div> -->
    <!--头部-->
    <!-- el过渡动画 -->
    <transition name="el-fade-in-linear">

      <!-- 手机导航按钮 -->
      <div v-if="$common.mobile() || mobile" style="display: flex;justify-content: space-between;">
        <div class="toolbar-title">
          <h2 @click="$router.push({ path: '/front/home' })">Mr Lv's BLOG</h2>
        </div>
        <div class="toolbar-mobile-menu" @click="toolbarDrawer = !toolbarDrawer" :class="{ enter: toolbar.enter }">
          <i class="el-icon-s-operation"></i>
        </div>
      </div>

      <!-- PC导航按钮 -->
      <div v-else>
        <div class="front-header" id="nav-bar" :class="[{ 'navbar-hover': isHovered }, navShow ? 'navOn' : 'navOff']"
          @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <!-- 左边 -->
          <div class="front-header-left">
            <!-- <img src="@/assets/imgs/logo.png" alt=""> -->
            <div class="title" style="color: white;">
              <span @click="$router.push({ path: '/front/home' })">Mr Lv's BLOG</span>
            </div>
          </div>
          <!-- 中间 导航列表 -->
          <div>
            <div class="front-header-center">
              <div class="front-header-nav">
                <el-menu :default-active="$route.path" mode="horizontal" router>
                  <el-menu-item index="/front/home" class="active">
                    🏡 <span>首页</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="/front/person">个人中心</el-menu-item> -->
                  <el-menu-item class="active">
                    <el-dropdown :hide-timeout="500" placement="bottom">
                      <li>
                        <div class="my-menu">
                          📒 <span>记录</span>
                        </div>
                      </li>
                      <el-dropdown-menu slot="dropdown" class="drop-items">
                        <el-dropdown-item v-for="category in categoryInfo" :key="category.id">
                          <!-- @click="$router.push({ path: '/front/blogSort', query: { sortId: category.id } }) -->
                          <div @click="$router.push('/front/blogSort?sortId=' + category.id)">
                            {{ category.name }}
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-menu-item>
                  <el-menu-item index="/front/activityCenter" class="active">
                    🧰 <span>活动中心</span>
                  </el-menu-item>
                  <el-menu-item index="/front/about" class="active">
                    🌏 <span>关于本网站</span>
                  </el-menu-item>
                  <el-menu-item class="active" v-if="$store.state.currentUser.name === '城北吕公'">
                    📪 <span @click="toBack()">后台</span>
                  </el-menu-item>
                </el-menu>
              </div>
            </div>
          </div>
          <!-- 右边 -->
          <div class="front-header-right">
            <div>
              <el-dropdown>
                <div class="front-header-dropdown" style="cursor: pointer;">
                  <img :src="user.avatar" alt="" class="img">
                  <div style="margin-left: 10px;color: black;">
                    <span style="color: aliceblue;">{{ user.username }}</span>
                  </div>
                </div>
                <el-dropdown-menu slot="dropdown" class="drop-items-right">
                  <div v-if="!user.username">
                    <el-dropdown-item>
                      <div style="text-decoration: none" @click="$router.push('/front/person')"
                        v-if="$common.isEmpty($store.state.currentUser)">
                        <i class="fa fa-sign-in" aria-hidden="true"></i> <span>登录</span>
                      </div>
                    </el-dropdown-item>
                  </div>
                  <div v-else>
                    <el-dropdown-item>
                      <div style="text-decoration: none" @click="$router.push('/front/person')"
                        v-if="!$common.isEmpty($store.state.currentUser)">
                        <i class="fa fa-user-circle" aria-hidden="true"></i> <span>个人中心</span>
                      </div>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div style="text-decoration: none" @click="logout"
                        v-if="!$common.isEmpty($store.state.currentUser)">
                        <i class="fa fa-sign-out" aria-hidden="true"></i> <span>退出</span>
                      </div>
                    </el-dropdown-item>
                  </div>

                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="toolButton">
      <div class="backTop" v-if="toolButton" @click="toTop()">
        <!-- 回到顶部按钮 -->
        <svg viewBox="0 0 1024 1024" width="50" height="50">
          <path
            d="M696.741825 447.714002c2.717387-214.485615-173.757803-312.227566-187.33574-320.371729-10.857551 5.430775-190.050127 103.168727-187.33274 320.371729-35.297037 24.435488-73.306463 65.1623-67.875688 135.752376 5.430775 70.589076 76.018851 119.460051 103.168726 116.745664 27.152875-2.716387 19.004713-21.7221 19.004713-21.7221l8.148162-38.011425s40.721814 59.732525 51.583363 59.732525h146.609927c13.574938 0 51.585363-59.732525 51.585363-59.732525l8.147162 38.011425s-8.147162 19.005713 19.004713 21.7221c27.148876 2.714388 97.738951-46.156588 103.168727-116.745664s-32.57965-111.316888-67.876688-135.752376z m-187.33574-2.713388c-5.426776 0-70.589076-2.717387-78.733239-78.737238 2.713388-73.306463 73.306463-78.733239 78.733239-81.450626 5.430775 0 76.02385 8.144163 78.736238 81.450626-8.143163 76.019851-73.305463 78.737238-78.736238 78.737238z m0 0"
            fill="#000000"></path>
          <path
            d="M423.602441 746.060699c6.47054-6.297579 12.823107-7.017417 21.629121-2.784372 34.520213 16.582259 70.232157 19.645568 107.031855 9.116944 8.118169-2.323476 15.974396-5.475765 23.598677-9.22392 13.712907-6.73648 26.003134 0.8878 26.080116 16.13936 0.109975 22.574907-0.024994 45.142816 0.080982 67.709725 0.031993 7.464316-2.277486 13.322995-9.44387 16.608254-7.277358 3.333248-13.765895 1.961558-19.526595-3.264264-3.653176-3.313253-7.063407-6.897444-10.634601-10.304675-6.563519-6.259588-6.676494-6.25259-10.625603 1.603638-8.437097 16.80121-16.821205 33.623415-25.257302 50.423625-2.489438 4.953882-5.706713 9.196925-11.411426 10.775569-8.355115 2.315478-15.772442-1.070758-20.272427-9.867774-8.774021-17.15313-17.269104-34.453228-25.918153-51.669344-3.750154-7.469315-3.9891-7.479313-10.141712-1.514658-3.715162 3.602187-7.31435 7.326347-11.142486 10.800563-5.571743 5.060858-11.934308 6.269586-18.936728 3.207277-6.82746-2.984327-9.869774-8.483086-9.892769-15.685462-0.070984-23.506697-0.041991-47.018393-0.020995-70.532089 0.007998-4.679944 1.46467-8.785018 4.803916-11.538397z"
            fill="#000000"></path>
        </svg>
      </div>

      <el-popover placement="left" :close-delay="500" trigger="hover">
        <div slot="reference">
          <i class="fa fa-cog iconRotate" style="color: black" aria-hidden="true"></i>
        </div>
        <div class="my-setting">
          <div>
            <!-- 太阳按钮 -->
            <i v-if="isDark" class="el-icon-sunny iconRotate" @click="changeColor()"></i>
            <!-- 月亮按钮 -->
            <i v-else class="fa fa-moon-o" aria-hidden="true" @click="changeColor()"></i>
          </div>
          <div>
            <i class="fa fa-snowflake-o" aria-hidden="true" @click="changeMouseAnimation()"></i>
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 点击动画 -->
    <canvas v-if="mouseAnimation" id="mousedown" style="position:fixed;left:0;top:0;pointer-events:none;z-index: 1000">
    </canvas>

    <el-drawer :visible.sync="toolbarDrawer" :show-close="false" size="65%" custom-class="toolbarDrawer" title="欢迎光临"
      direction="ltr">
      <div>
        <ul class="small-menu">
          <li @click="smallMenu({ path: '/front/home' })">
            <div>
              🏡 <span>首页</span>
            </div>
          </li>

          <li>
            <div>
              📒 <span>记录</span>
            </div>
            <div>
              <div v-for="category in categoryInfo" :key="category.id" class="sortMenu"
                @click="smallMenu('/front/blogSort?sortId=' + category.id)">
                {{ category.name }}
              </div>
            </div>
          </li>

          <!-- 活动中心 -->
          <li @click="smallMenu('/front/activityCenter')">
            <div>
              🧰 <span>活动中心</span>
            </div>
          </li>

          <!-- 关于本网站 -->
          <li @click="smallMenu('/front/about')">
            <div>
              🌏 <span>关于本网站</span>
            </div>
          </li>

          <!-- 后台 -->
          <li @click="smallToBackMenu('/login')" v-if="$store.state.currentUser.name === '城北吕公'">
            <div>
              📪 <span>后台</span>
            </div>
          </li>

          <template v-if="$common.isEmpty($store.state.currentUser)">
            <li @click="smallMenu('/front/person')">
              <div>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
                <span>&nbsp;登录</span>
              </div>
            </li>
          </template>
          <template v-else>
            <li @click="smallMenu('/front/person')" v-if="$store.state.currentUser.name === '城北吕公'">
              <div>
                <i class="fa fa-user-circle" aria-hidden="true"></i>
                <span>个人中心</span>
              </div>
            </li>
            <li @click="smallMenuLogout()">
              <div>
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                <span>&nbsp;退出</span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </el-drawer>

    <!--主体-->
    <div class="main-body">
      <router-view ref="child" @update:user="updateUser" />
    </div>

  </div>

</template>

<script>
import mousedown from '@/utils/mousedown'
export default {
  name: "FrontLayout",

  data() {
    return {
      top: '',
      notice: [],
      categoryInfo: [],
      user: JSON.parse(localStorage.getItem("USER") || '{}'),
      isHovered: false, // 添加变量控制悬停状态
      // top: '',
      navShow: true,  // 确保导航栏初始可见
      toolButton: false,
      isDark: false,
      mouseAnimation: false,
      scrollTop: 0,
      toolbarDrawer: false,
      mobile: false
    }
  },
  computed: {
    toolbar() {
      return this.$store.state.toolbar;
    },
  },
  watch: {
    // 监听top值的变化
    top(newValue, oldValue) {
      // 等新值大于100的时候再做变化（优化一下）
      if (newValue > 100) {
        if (newValue > oldValue) {
          this.navShow = false
          console.log('向下滚动')
        } else {
          this.navShow = true
          console.log('向上滚动')
        }
      }
    },
    scrollTop(newVal, oldVal) {
      this.toolButton = newVal > window.innerHeight / 3;
      const topValue = newVal - oldVal < 0;
      //导航栏显示与颜色
      let toolbarStatus = {
        enter: this.toolButton,
        visible: topValue,
      };
      this.$store.commit("changeToolbarStatus", toolbarStatus);
    },
  },
  created() {
    this.isDark = localStorage.getItem('darkMode') === 'true';
    this.updateMode();
    this.mobile = document.body.clientWidth < 1100;
    window.addEventListener('resize', () => {
      let docWidth = document.body.clientWidth;
      if (docWidth < 1100) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
    let toolbarStatus = {
      enter: false,
      visible: true,
    };
    this.$store.commit("changeToolbarStatus", toolbarStatus);
  },
  mounted() {
    this.loadNotice()
    this.loadCategory()
    window.addEventListener('scroll', () => {
      this.top = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY
      this.scrollTop = this.top;
      this.toolButton = this.scrollTop > window.innerHeight / 3;
    });
    if (this.isDaylight()) {
      this.isDark = true;
      let root = document.querySelector(":root");
      root.style.setProperty("--background", "#272727");
      root.style.setProperty("--fontColor", "white");
      root.style.setProperty("--borderColor", "#4F4F4F");
      root.style.setProperty("--borderHoverColor", "black");
      root.style.setProperty("--articleFontColor", "#E4E4E4");
      root.style.setProperty("--articleGreyFontColor", "#D4D4D4");
      root.style.setProperty("--commentContent", "#D4D4D4");
      root.style.setProperty("--favoriteBg", "#1e1e1e");
    };
  },
  destroyed() {
  },
  methods: {
    // 鼠标悬停时触发
    handleMouseEnter() {
      this.isHovered = true;
    },
    // 鼠标离开时触发
    handleMouseLeave() {
      this.isHovered = false;
    },
    loadNotice() {
      this.$request.get('/notice/selectAll').then(res => {
        this.notice = res.data
        let i = 0
        if (this.notice && this.notice.length) {
          this.top = this.notice[0].content
          setInterval(() => {
            this.top = this.notice[i].content
            i++
            if (i === this.notice.length) {
              i = 0
            }
          }, 2500)
        }
      })
    },
    updateUser() {
      this.user = JSON.parse(localStorage.getItem('USER') || '{}')   // 重新获取下用户的最新信息
    },
    // 退出登录
    logout() {
      localStorage.removeItem("USER");
      location.href = "/front/person"
    },
    // 到后台
    toBack() {
      setTimeout(() => {
        // this.$router.push("/login");
        window.open("/login")
      }, 0)
    },
    // 分类信息
    loadCategory() {
      this.$request.get("/category/selectAll").then(res => {
        this.categoryInfo = res.data
      })
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      console.log("发射~")
    },
    isDaylight() {
      let currDate = new Date();
      if (currDate.getHours() > 22 || currDate.getHours() < 7) {
        return true;
      } else {
        return false;
      }
    },
    changeColor() {
      this.isDark = !this.isDark;

      if (this.isDark) {
        localStorage.setItem('darkMode', this.isDark);
        this.updateMode();
      } else {
        localStorage.setItem('darkMode', this.isDark);
        this.updateMode();
      }
    },
    updateMode() {
      document.body.classList.toggle('dark-mode', this.isDark);
    },
    changeMouseAnimation() {
      this.mouseAnimation = !this.mouseAnimation;
      if (this.mouseAnimation) {
        this.$nextTick(() => {
          mousedown();
        });
      }
    },
    smallMenu(data) {
      this.$router.push(data)
      this.toolbarDrawer = false;
    },
    smallToBackMenu(data) {
      setTimeout(() => {
        window.open(data)
      }, 0)
      this.toolbarDrawer = false;
    },

    smallMenuLogout() {
      this.logout();
      this.toolbarDrawer = false;
    },
  }

}
</script>

<style scoped>
@import "@/assets/css/front.css";

.drop-items {
  text-align: center;
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  /* background-color: transparent; */
}

.drop-items:hover {
  box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
}

.drop-items li {
  font-size: 15px;
}

.drop-items li:hover {
  background-color: white;
  color: #409eff;
}

.drop-items-right {
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  /* background-color: transparent; */
}

.drop-items-right:hover {
  box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
}

.drop-items-right li {
  /* font-size: 15px; */
}

.drop-items-right li:hover {
  background-color: white;
  color: #409eff;
}

.xxx {
  /* 固定位置，不随滚动条滚动 */
  position: fixed;
  z-index: 100;
  /* 禁止选中文字 */
  user-select: none;
  background-color: transparent;
  transition: background-color 0.3s;
}

.front-header {
  position: fixed;
  width: 100%;
  background-color: transparent;
  transition: background-color 0.3s;
  z-index: 100;
}


.front-header.navbar-hover {
  /* background-color: rgba(0, 34, 77, 0.05); */
  background-color: rgba(0, 0, 0, 0.5);
}

.front-header-center .active:active,
.front-header-center .active:focus,
.front-header-center .active:hover {
  background-color: transparent;
}

.main-body {
  /* margin-top: 80px; */
}

@keyframes screen {
  0% {
    opacity: 0;
  }
}

.navOn {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s ease-in-out 0.2s;
  transform: translateZ(0);
}

.navOff {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s ease-in-out 0.2s;
  transform: translate3d(0, -100%, 0);
}

/* 以my-animation-开头的class */
[class*=my-animation-] {
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

.my-animation-slide-bottom {
  animation-name: slide-bottom
}

/* 下移 */
@keyframes slide-bottom {
  0% {
    opacity: 0;
    transform: translateY(20%)
  }

  100% {
    opacity: 1;
    transform: translateY(0)
  }
}

.toolButton {
  position: fixed;
  right: 3vh;
  bottom: 10vh;
  animation: slide-bottom 0.5s ease-in-out both;
  z-index: 100;
  cursor: pointer;
  font-size: 25px;
  width: 30px;
}

.backTop {
  transition: all 0.3s ease-in;
  position: relative;
  top: 0;
  left: -13px;
}

.backTop:hover {
  top: -10px;
}

.my-setting {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  cursor: pointer;
  font-size: 20px;
}

.my-setting i {
  padding: 5px;
}

.my-setting i:hover {
  color: orange;
}

body.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark-mode .front-header {
  background-color: rgba(0, 0, 0, 0.9);
}

body.dark-mode .main-body {
  background-color: rgba(18, 18, 18, 0.9);
  ;
}

body.dark-mode .content {
  background-color: #222;
  color: #e0e0e0;
}

body.dark-mode .title {
  color: white;
  margin-left: 30px;
  cursor: pointer;
}

.sortMenu {
  margin-left: 44px;
  font-size: 17px;
  position: relative;
}

.sortMenu:after {
  top: 32px;
  width: 35px;
  left: 0;
  height: 2px;
  background: orange;
  content: "";
  border-radius: 1px;
  position: absolute;
}

.small-menu {
  color: white;
  font-size: 20px;
  user-select: none;
  position: relative;
}

.small-menu>li {
  list-style: none;
  line-height: 40px;
  cursor: pointer;
  margin-left: 30px;
}

.toolbar-title {
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
}

.toolbar-mobile-menu {
  font-size: 30px;
  margin-right: 15px;
  cursor: pointer;
}

/* .toolbar-content.enter {
  background: rgba(255, 255, 255, 1);
  color: #333333;
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.05);
} */
</style>