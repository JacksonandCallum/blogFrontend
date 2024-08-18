<template>
  <div>
    <!-- 框 -->
    <textarea class="comment-textarea" v-model="replyComment" placeholder="写下点什么..." maxlength="1000" />
    <!-- 按钮 -->
    <div class="myBetween" style="margin-bottom: 10px">
      <div style="display: flex">
        <div :class="{ 'emoji-active': showEmoji }" @click="showEmoji = !showEmoji">
          <i class="el-icon-orange myEmoji"></i>
        </div>
      </div>

      <div style="display: flex">
        <proButton :info="'提交'" @click.native="submitReplyComment()" :before="'rgb(131, 123, 199)'"
          :after="'linear-gradient(45deg, #f43f3b, #ec008c)'">
        </proButton>
      </div>
    </div>
    <!-- 表情 -->
    <emoji @addEmoji="addEmoji" :showEmoji="showEmoji"></emoji>

  </div>
</template>

<script>
const emoji = () => import("./emoji.vue");
const proButton = () => import("./proButton.vue");

export default {
  components: {
    emoji,
    proButton,
  },
  props: {
    disableGraffiti: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      replyComment: "",
      showEmoji: false,
    };
  },
  methods: {

    addEmoji(key) {
      this.replyComment += key;
    },
    submitReplyComment() {
      if (this.$common.isEmpty(this.$store.state.currentUser)) {
        this.$message.error("请先登录！")
        return;
      }

      if (this.replyComment.trim() === "") {
        this.$message.warning("你还没写呢~")
        return;
      }
      this.$emit("submitReplyComment", this.replyComment.trim());
      this.replyComment = "";
    }
  }
}
</script>

<style scoped>
.comment-textarea {
  border: 1px solid #DDDDDD;
  width: 100%;
  font-size: 14px;
  padding: 15px;
  min-height: 180px;
  /* 不改变大小 */
  resize: none;
  /* 不改变边框 */
  outline: none;
  border-radius: 4px;
  background-image: url("../assets/imgs/comment.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 100%;
  margin-bottom: 10px;
}

.comment-textarea:focus {
  border-color: orange;
}

/* 两边 */
.myBetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.myEmoji {
  font-size: 18px;
  cursor: pointer;
  transition: all 0.5s;
  margin-right: 12px;
}

.myEmoji:hover {
  transform: rotate(360deg);
  font-size: 22px;
}

.myPicture {
  font-size: 18px;
  cursor: pointer;
}

.emoji-active {
  color: red;
}
</style>
