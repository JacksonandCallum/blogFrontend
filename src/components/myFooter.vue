<template>
  <div class="myFooter-wrap" v-show="showFooter">
    <div class="myFooter">
      <!-- {{$store.state.webInfo.footer}} -->
      <div class="footer-title">{{ footerTitle }}</div>
      <div class="icp">本网站由 <a href="http://mrblog.cn" target="_blank">Mr Lv's BLOG</a> 强力支持</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      footerTitle: "Life is never Compromise!"
    }
  },
  created() {
  }
}
</script>

<style scoped>
/* 以my-animation-开头的class */
[class*=my-animation-] {
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

.my-animation-hideToShow {
  animation-name: hideToShow
}

/* 显示 */
@keyframes hideToShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.myFooter-wrap {
  user-select: none;
  animation: hideToShow 2s;
}

.myFooter {
  border-radius: 1.5rem 1.5rem 0 0;
  background: linear-gradient(-90deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  text-align: center;
  color: white;
  background-size: 300% 300%;
  animation: gradientBG 10s ease infinite;
}

/* 背景位置移动 */
@keyframes gradientBG {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

.footer-title {
  padding-top: 10px;
  font-size: 16px;
}

.icp,
.icp a {
  color: #595A5A;
  font-size: 13px;
}

.icp {
  padding-top: 10px;
  padding-bottom: 10px;
}

.icp a {
  text-decoration: none;
  transition: all 0.3s;
}

.icp a:hover {
  color: orange;
}
</style>