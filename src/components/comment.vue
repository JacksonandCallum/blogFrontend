<template>
  <div>
    <!-- 评论框 -->
    <div style="margin-bottom: 40px">
      <div class="comment-head">
        <i class="el-icon-edit-outline" style="font-weight: bold;font-size: 22px;"></i> 留言
      </div>
      <div>
        <!-- 文字评论 -->
        <div v-show="!isGraffiti">
          <commentBox @showGraffiti="isGraffiti = !isGraffiti" @submitComment="submitComment">
          </commentBox>
        </div>
      </div>
    </div>

    <!-- 评论内容 -->
    <div v-if="commentList.length > 0">
      <!-- 评论数量 -->
      <div class="commentInfo-title">
        <span style="font-size: 1.15rem">Comments | </span>
        <span>{{ commentCount }} 条留言</span>
      </div>
      <!-- 评论详情 -->
      <div id="comment-content" class="commentInfo-detail" v-for="(item, index) in commentList" :key="index">
        <!-- 头像 -->
        <el-avatar shape="square" class="commentInfo-avatar" :size="35" :src="item.avatar"></el-avatar>

        <div style="flex: 1;padding-left: 12px">
          <!-- 评论信息 -->
          <div style="display: flex;justify-content: space-between">
            <div>
              <span class="commentInfo-username">{{ item.userName }}</span>
              <span class="commentInfo-master" v-if="item.userId === userId">UP</span>
              <span class="commentInfo-other">{{ $common.getDateDiff(item.time) }}</span>
              <span class="commentInfo-ip">{{ formatAddress(item.ip) }}</span>
            </div>
            <div style="display: flex;flex-direction: row;">
              <div class="commentInfo-reply" @click="commentDialog(item)">
                <span v-if="item.children.total > 0">{{ item.children.total }} </span><span>回复</span>
              </div>
              <div class="commentInfo-delete" @click="del(item.id)" v-if="item.userId === user.id">
                <span>删除</span>
              </div>
            </div>
          </div>
          <!-- 评论内容 -->
          <div class="commentInfo-content">
            <span v-html="item.content"></span>
          </div>
          <!-- 回复模块 -->
          <div v-if="!$common.isEmpty(item.children)">
            <div class="replyInfo-detail" v-for="(childItem, i) in item.children" :key="i">
              <!-- 头像 -->
              <el-avatar shape="square" class="commentInfo-avatar" :size="30" :src="childItem.avatar"></el-avatar>

              <div style="flex: 1;padding-left: 12px">
                <!-- 评论信息 -->
                <div style="display: flex;justify-content: space-between">
                  <div>
                    <span class="commentInfo-username-small">{{ childItem.userName }}</span>
                    <span class="commentInfo-master" v-if="childItem.userId === userId">UP</span>
                    <span class="commentInfo-other">{{ $common.getDateDiff(childItem.time) }}</span>
                    <span class="commentInfo-ip">{{ formatAddress(childItem.ip) }}</span>
                  </div>
                  <div style="display: flex;flex-direction: row;">
                    <div class="commentInfo-reply" @click.native="replyDialog(childItem, item)">
                      回复
                    </div>
                    <div class="commentInfo-delete" @click.native="del(childItem.id)" v-if="childItem.userId === user.id">
                      删除
                    </div>
                  </div>
                </div>
                <!-- 评论内容 -->
                <div class="commentInfo-content">
                  <template v-if="childItem.replyUser !== item.userName">
                    <span style="color: rgb(3, 169, 244)">@{{ childItem.replyUser }} </span>:
                  </template>
                  <span v-html="childItem.content"></span>
                </div>
              </div>
            </div>
            <!-- 分页 -->

          </div>
        </div>
      </div>
      <!-- 分页 -->
    </div>

    <div v-else class="myCenter" style="color: #797979">
      <i>来发第一个留言啦~</i>
    </div>

    <el-dialog title="留言" :visible.sync="replyDialogVisible" width="30%" :before-close="handleClose"
      :append-to-body="true" :close-on-click-modal="false" destroy-on-close center>
      <div>
        <replyBox :disableGraffiti="true" @submitReplyComment="submitReply">
        </replyBox>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const commentBox = () => import("./commentBox.vue");
const replyBox = () => import("./replyBox.vue");
export default {
  components: {
    commentBox,
    replyBox
  },
  props: {
    fid: {
      type: Number
    },
    module: {
      type: String
    },
    userId: {
      type: Number
    }
  },
  data() {
    return {
      isGraffiti: false,
      commentCount: 0,
      replyDialogVisible: false,
      replyPID: "",
      replyROOTID: "",
      commentList: [],
      user: JSON.parse(localStorage.getItem("USER") || "{}"),
      // ipInfo: ""

    };
  },

  computed: {},

  created() {
    this.loadComment();  // 加载评论
    // this.getIpInfo()
  },
  methods: {
    emoji(comments, flag) {
      comments.forEach(c => {
        c.content = c.content.replace(/\n/g, '<br/>');
        c.content = this.$common.faceReg(c.content);
        c.content = this.$common.pictureReg(c.content);
        if (flag) {
          if (!this.$common.isEmpty(c.children)) {
            c.children.forEach(cc => {
              c.content = c.content.replace(/\n/g, '<br/>');
              cc.content = this.$common.faceReg(cc.content);
              cc.content = this.$common.pictureReg(cc.content);
            });
          }
        }
      });
    },
    addGraffitiComment(graffitiComment) {
      this.submitComment(graffitiComment);
    },
    // 加载评论
    loadComment() {
      this.$request.get("/comment/selectForUser", {
        params: { fid: this.fid, module: this.module }
      }).then(res => {
        this.commentList = res.data || []
        this.emoji(this.commentList, true)
      })

      this.$request.get("/comment/selectCount", {
        params: { fid: this.fid, module: this.module }
      }).then(res => {
        this.commentCount = res.data || 0
      })
    },
    // 提交（添加）评论
    submitComment(commentContent) {
      this.$request.post("/comment/add", { content: commentContent, fid: this.fid, module: this.module }).then(res => {
        if (res.code === '200') {
          this.$message.success("评论成功！")
          this.loadComment()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // (pid,rootId,content)
    submitReply(replyComment) {
      this.$request.post("/comment/add", { pid: this.replyPID, rootId: this.replyROOTID, content: replyComment, fid: this.fid, module: this.module }).then(res => {
        if (res.code === '200') {
          this.$message.success("回复成功！")
          this.loadComment()
        } else {
          this.$message.error(res.msg)
        }
      })
      this.handleClose();
    },
    commentDialog(item) {
      if (item.pid === null) {
        // 如果被回复的评论没有父评论，则将其设置为根评论
        this.replyPID = item.id;
        this.replyROOTID = item.rootId;
      }
      this.replyDialogVisible = true;
    },
    replyDialog(childItem, item) {
      this.replyPID = childItem.id;
      this.replyROOTID = item.rootId;
      this.replyDialogVisible = true;
    },
    handleClose() {
      this.replyDialogVisible = false;
    },
    // 删除评论
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', { type: "warning" }).then(response => {
        this.$request.delete('/comment/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('删除成功')
            // 删除成功后递归删除子评论
            this.recursivelyDeleteChildren(id);
            this.loadComment()
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    // 递归删除子评论
    recursivelyDeleteChildren(parentId) {
      // 找到当前评论下的所有子评论
      const children = this.commentList.filter(comment => { comment.rootId === parentId || comment.pid === parentId });
      // 输出找到的子评论信息
      // console.log('找到的子评论:', children);
      // 遍历子评论并递归删除
      children.forEach(child => {
        // console.log('删除子评论:', child.id);
        this.del(child.id)
      });
    },
    // getIpInfo() {
    //   this.$request.get("/ip").then(res => {
    //     this.ipInfo = res.data
    //   }).catch(error => {
    //     console.error("获取 IP 信息时出错：", error);
    //   })
    // },
    formatAddress(address) {
      // 格式化IP和地址信息，去掉大括号和双引号
      // {address=中国|0|广西|玉林市|电信, ip=116.253.169.72}
      const addressRegex = /address=([^,]+), ip=([^}]+)/;
      const match = addressRegex.exec(address);
      if (match && match.length === 3) {
        let formattedAddress = match[1].replace(/["{}]/g, '');
        let ip = match[2];
        return `IP: ${ip}` + "   " + `地址: ${formattedAddress}`;
      } else {
        return '无效的地址信息';
      }
    }
  }
}
</script>

<style scoped>
.comment-head {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin: 40px 0 20px 0;
  user-select: none;
  color: orange;
}

.commentInfo-title {
  margin-bottom: 20px;
  color: #797979;
  user-select: none;
}

.commentInfo-detail {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  margin-bottom: 20px;
}

.replyInfo-detail {
  display: flex;
}

.commentInfo-avatar {
  border-radius: 50%;
}

.commentInfo-username {
  color: #EF794F;
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
}

.commentInfo-username-small {
  color: #EF794F;
  font-size: 14px;
  font-weight: 600;
  margin-right: 5px;
}

.commentInfo-master {
  color: #67C23A;
  border: 1px solid #67C23A;
  border-radius: 0.2rem;
  font-size: 12px;
  padding: 2px 4px;
  margin-right: 5px;
}

.commentInfo-other {
  font-size: 12px;
  color: #797979;
  user-select: none;
}

.commentInfo-ip {
  font-size: 12px;
  color: #797979;
  user-select: none;
  margin-left: 10px;
}

.commentInfo-reply {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  color: white;
  background: orange;
  border-radius: 0.2rem;
  padding: 3px 6px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.commentInfo-delete {
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  color: white;
  background: rgb(255, 0, 128);
  border-radius: 0.2rem;
  padding: 3px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.commentInfo-content {
  margin: 15px 0 25px;
  padding: 18px 20px;
  background: #F7F9FE;
  border-radius: 12px;
  color: black;
  word-break: break-word;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.pagination {
  padding: 6px 20px;
  border: 1px solid #DDDDDD;
  border-radius: 3rem;
  color: #797979;
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
}

.pagination:hover {
  border: 1px solid orange;
  color: orange;
  box-shadow: 0 0 5px orange;
}

/* 居中 */
.myCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
