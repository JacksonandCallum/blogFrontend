<template>
  <div>
    <!-- 登陆和注册 -->
    <div v-if="this.$common.isEmpty(currentUser)" class="myCenter in-up-container my-animation-hideToShow">
      <!-- 背景图片 -->
      <el-image class="my-el-image" style="position: absolute" v-once lazy :src="login_register_src" fit="cover">
        <div slot="error" class="image-slot"></div>
      </el-image>
      <div class="in-up" id="loginAndRegist">
        <div class="form-container sign-up-container">
          <div class="myCenter">
            <h1>注册</h1>
            <input v-model="loginParam.username" type="text" maxlength="30" placeholder="用户名">
            <input v-model="loginParam.password" type="password" maxlength="30" placeholder="密码">
            <input v-model="loginParam.email" type="email" placeholder="邮箱">
            <input v-model="loginParam.code" type="text" placeholder="验证码" disabled>
            <a style="margin: 0" href="#" @click="changeDialog('邮箱验证码')">获取验证码</a>
            <button @click="regist()">注册</button>
          </div>
        </div>
        <div class="form-container sign-in-container">
          <div class="myCenter">
            <h1>登录</h1>
            <input v-model="inputValue" type="text" placeholder="用户名/邮箱">
            <input v-model="loginParam.password" type="password" placeholder="密码">
            <a href="#" @click="changeDialog('找回密码')">忘记密码？</a>
            <button @click="login()">登录</button>
          </div>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel myCenter overlay-left">
              <h1>已有帐号？</h1>
              <p>请登录🚀</p>
              <button class="ghost" @click="signIn()">登录</button>
            </div>
            <div class="overlay-panel myCenter overlay-right">
              <h1>没有帐号？</h1>
              <p>立即注册吧😃</p>
              <button class="ghost" @click="signUp()">注册</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户信息 -->
    <div v-else class="user-container myCenter my-animation-hideToShow">
      <!-- 背景图片 -->
      <el-image class="my-el-image" style="position: absolute" v-once lazy :src="src" fit="cover">
        <div slot="error" class="image-slot"></div>
      </el-image>
      <div class="shadow-box-mini user-info" style="display: flex">
        <div class="user-left">
          <div>
            <el-tabs v-model="activeName" @tab-click="clickTab" stretch="stretch">
              <el-tab-pane label="个人资料" name="个人资料">
                <!-- 个人资料 -->
                <PersonPage :currentUser="currentUser"></PersonPage>
              </el-tab-pane>
              <el-tab-pane label="我发表的博客" name="我发表的博客">
                <!-- 我发表的博客 -->
                <div style="margin-top: 30px;margin-bottom: 30px;">
                  <proButton :info="'发表博客'" :before="'rgb(131, 123, 199)'"
                    :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="addBlog()">
                  </proButton>
                </div>
                <div>
                  <myBlogList :blogs="blogs"></myBlogList>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我报名的活动" name="我报名的活动">
                <!-- 我报名的活动 -->
                <div>
                  <myActivityList></myActivityList>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我的点赞" name="我的点赞">
                <!-- 我的点赞 -->
                <div style="display: flex;flex-direction: row;margin-top: 30px;">
                  <div style="margin: auto 5px;">
                    <proButton :info="'博客'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="likesCurrent = '博客'">
                    </proButton>
                  </div>
                  <div style="margin: auto 5px;">
                    <proButton :info="'活动'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="likesCurrent = '活动'">
                    </proButton>
                  </div>
                </div>
                <div>
                  <myLikeAndCollectBlogList :blogs="likeBlog" :tip="'点赞'" blogType="like" v-if="likesCurrent === '博客'"
                    style="margin-top: 30px;">
                  </myLikeAndCollectBlogList>
                </div>
                <div>
                  <myLikeAndCollectActivityList v-if="likesCurrent === '活动'" type="like" :tip="'点赞'">
                  </myLikeAndCollectActivityList>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我的收藏" name="我的收藏">
                <!-- 我的收藏 -->
                <div style="display: flex;flex-direction: row;margin-top: 30px;">
                  <div style="margin: auto 5px;">
                    <proButton :info="'博客'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="collectCurrent = '博客'">
                    </proButton>
                  </div>
                  <div style="margin: auto 5px;">
                    <proButton :info="'活动'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="collectCurrent = '活动'">
                    </proButton>
                  </div>
                </div>
                <div>
                  <myLikeAndCollectBlogList :blogs="collectBlog" :tip="'收藏'" blogType="collect"
                    v-if="collectCurrent === '博客'" style="margin-top: 30px;">
                  </myLikeAndCollectBlogList>
                </div>
                <div>
                  <myLikeAndCollectActivityList v-if="collectCurrent === '活动'" type="collect" :tip="'收藏'">
                  </myLikeAndCollectActivityList>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我的评论" name="我的评论">
                <!-- 我的评论 -->
                <div style="display: flex;flex-direction: row;margin-top: 30px;">
                  <div style="margin: auto 5px;">
                    <proButton :info="'博客'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="commentCurrent = '博客'">
                    </proButton>
                  </div>
                  <div style="margin: auto 5px;">
                    <proButton :info="'活动'" :before="'rgb(131, 123, 199)'"
                      :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="commentCurrent = '活动'">
                    </proButton>
                  </div>
                </div>
                <div>
                  <myLikeAndCollectBlogList :blogs="commentBlog" :tip="'评论'" blogType="comment"
                    v-if="commentCurrent === '博客'" style="margin-top: 30px;">
                  </myLikeAndCollectBlogList>
                </div>
                <div>
                  <myLikeAndCollectActivityList v-if="commentCurrent === '活动'" type="comment" :tip="'评论'">
                  </myLikeAndCollectActivityList>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- <div class="user-right"></div> -->
      </div>
    </div>


    <!-- 弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="30%" :append-to-body="true"
      :close-on-click-modal="false" center>
      <div class="myCenter" style="flex-direction: column">
        <div>
          <div v-if="dialogTitle === '找回密码'">
            <div class="myCenter" style="margin-bottom: 12px">
              <el-radio-group v-model="passwordFlag">
                <el-radio :label="1" style="margin-right: 10px">手机号</el-radio>
                <el-radio :label="2">邮箱</el-radio>
              </el-radio-group>
            </div>
            <div v-if="passwordFlag === 1">
              <div style="margin-bottom: 5px">手机号：</div>
              <el-input v-model="loginParam.phone"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="loginParam.code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="loginParam.password"></el-input>
            </div>
            <div v-else-if="passwordFlag === 2">
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="loginParam.email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="loginParam.code"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">新密码：</div>
              <el-input maxlength="30" v-model="loginParam.password"></el-input>
            </div>
          </div>
          <div v-else-if="dialogTitle === '邮箱验证码'">
            <div>
              <div style="margin-bottom: 5px">邮箱：</div>
              <el-input v-model="loginParam.email"></el-input>
              <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
              <el-input v-model="loginParam.code"></el-input>
            </div>
          </div>
        </div>
        <div style="display: flex;margin-top: 30px">
          <proButton :info="codeString" v-show="dialogTitle === '找回密码' || dialogTitle === '邮箱验证码'"
            @click.native="getCode()" :before="$constant.before_color_1" :after="$constant.after_color_1"
            style="margin-right: 20px">
          </proButton>
          <proButton :info="'提交'" @click.native="submitDialog()" :before="$constant.before_color_2"
            :after="$constant.after_color_2">
          </proButton>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
const proButton = () => import("@/components/proButton");
const PersonPage = () => import("@/components/PersonPage.vue")
const myBlogList = () => import("@/components/myBlogList.vue")
const myActivityList = () => import("@/components/myActivityList.vue")
const myLikeAndCollectBlogList = () => import("@/components/myLikeAndCollectBlogList.vue")
const myLikeAndCollectActivityList = () => import("@/components/myLikeAndCollectActivityList.vue")

export default {
  components: {
    proButton,
    PersonPage,
    myBlogList,
    myActivityList,
    myLikeAndCollectBlogList,
    myLikeAndCollectActivityList
  },
  data() {
    return {
      currentUser: this.$store.state.currentUser,
      loginParam: {
        email: "",
        password: "",
        code: "",
        username: ""
      },
      showDialog: false,
      code: "",
      dialogTitle: "",
      codeString: "验证码",
      passwordFlag: null,
      src: require("@/assets/imgs/boyWithCat.jpg"),
      login_register_src: require("@/assets/imgs/nice.jpg"),
      activeName: "个人资料",
      blogs: [],
      likeBlog: [],
      collectBlog: [],
      commentBlog: [],
      stretch: false,
      likesCurrent: "博客",
      collectCurrent: "博客",
      commentCurrent: "博客",
      blogType: "like"
    }
  },
  computed: {
    inputValue: {
      get() {
        // 根据当前的登录参数返回相应的值
        return this.loginParam.username || this.loginParam.email;
      },
      set(value) {
        // 判断输入值是否为邮箱
        if (value.includes('@')) {
          this.loginParam.email = value;
          this.loginParam.username = ''; // 清空用户名
        } else {
          this.loginParam.username = value;
          this.loginParam.email = ''; // 清空邮箱
        }
      }
    }
  },
  created() {
    this.loadMyBlogs()
    this.loadMyLikeBlogs()
    this.loadCollectBlogs()
    this.loadCommentBlogs()
  },
  methods: {
    addBlog() {
      window.open("/front/newBlog")
    },
    loadMyBlogs() {
      let userId = this.$store.state.currentUser.id
      this.$request.get("/blog/selectByUserId/" + userId).then(res => {
        this.blogs = res.data
      })
    },
    loadMyLikeBlogs() {
      let userId = this.$store.state.currentUser.id
      if (this.blogType === "like") {
        this.$request.get("/blog/selectLikesByUserId/" + userId).then(res => {
          this.likeBlog = res.data
        })
      }
    },
    loadCollectBlogs() {
      let userId = this.$store.state.currentUser.id
      this.blogType = "collect"
      if (this.blogType === "collect") {
        this.$request.get("/blog/selectCollectByUserId/" + userId).then(res => {
          this.collectBlog = res.data
        }).catch(error => {
          console.error("Error loading collected blogs:", error); // 添加错误处理
        });
      }
    },
    loadCommentBlogs() {
      let userId = this.$store.state.currentUser.id
      this.blogType = "comment"
      if (this.blogType === "comment") {
        this.$request.get("/blog/selectCommentByUserId/" + userId).then(res => {
          this.commentBlog = res.data
        }).catch(error => {
          console.error("Error loading collected blogs:", error); // 添加错误处理
        });
      }
    },

    clickTab(tab) {
      console.log(tab)
    },
    signUp() {
      document.querySelector("#loginAndRegist").classList.add('right-panel-active');
    },
    signIn() {
      document.querySelector("#loginAndRegist").classList.remove('right-panel-active');
    },
    login() {
      if (this.$common.isEmpty(this.loginParam.password)) {
        this.$message.error("请输入密码！");
        return;
      }

      let user = {
        password: this.loginParam.password.trim(),
        role: "USER"
      };

      // 如果用户名或邮箱不为空，则添加到用户对象中
      if (!this.$common.isEmpty(this.loginParam.username)) {
        user.username = this.loginParam.username.trim();
      } else {
        user.username = ""; // 确保即使用户名为空，也传递一个空字符串到后端
      }

      if (!this.$common.isEmpty(this.loginParam.email)) {
        user.email = this.loginParam.email.trim();
      } else {
        user.email = ""; // 确保即使邮箱为空，也传递一个空字符串到后端
      }

      this.$request.post('/user/login', user).then(res => {
        if (res.code === '200') {
          location.href = '/front/home'
          localStorage.setItem("USER", JSON.stringify(res.data))  // 存储用户数据
          this.loginParam.password = "";
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    regist() {
      if (this.$common.isEmpty(this.loginParam.username) || this.$common.isEmpty(this.loginParam.password)) {
        this.$message.error("请输入用户名或密码！")
        return;
      }

      if (this.dialogTitle === "邮箱验证码" && this.$common.isEmpty(this.loginParam.email)) {
        this.$message.error("请输入邮箱！")
        return false;
      }

      if (this.$common.isEmpty(this.loginParam.code)) {
        this.$message.error("请输入验证码！")
        return;
      }

      if (this.loginParam.username.indexOf(" ") !== -1 || this.loginParam.password.indexOf(" ") !== -1) {
        this.$message.error("用户名或密码不能包含空格！")
        return;
      }

      let user = {
        username: this.loginParam.username.trim(),
        code: this.loginParam.code.trim(),
        password: this.loginParam.password.trim(),
        role: "USER"
      };

      if (this.dialogTitle === "邮箱验证码") {
        user.email = this.loginParam.email;
      }
      // { username: this.loginParam.username, password: this.loginParam.password, email: this.loginParam.email, code: this.loginParam.code }
      this.$request.post("/user/register", user).then(res => {
        if (res.code === '200') {
          this.$message.success("注册成功");
          this.loginParam.username = "";
          this.loginParam.password = "";
          this.loginParam.email = ""
          this.loginParam.code = ""
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    changeDialog(value) {
      if (value === "邮箱验证码") {
        if (this.$common.isEmpty(this.loginParam.email)) {
          this.$message.error("请输入邮箱！")
          return false;
        }
        if (!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.loginParam.email))) {
          this.$message.error("邮箱格式有误！")
          return false;
        }
      }

      this.dialogTitle = value;
      this.showDialog = true;
    },

    getCode() {
      if (this.codeString === "验证码") {
        if (this.dialogTitle === "邮箱验证码" || this.dialogTitle === "找回密码") {
          this.$request.post("/user/code/request", { email: this.loginParam.email }).then(_ => {
            this.$request.post("/user/code/email", { email: this.loginParam.email, code: _.data }).then(res => {
              if (res.code === '200') {
                // 通知邮箱发送
                this.$notify({
                  title: '邮箱验证码已发送',
                  message: '验证码有效时长5分钟, 失效请重新发送',
                  type: 'success',
                  duration: 15 * 1000
                })
              }
            })
          })
        }
      }
    },

    submitDialog() {
      if (this.dialogTitle === "找回密码") {
        if (this.passwordFlag !== 1 && this.passwordFlag !== 2) {
          this.$message.error("请选择找回方式！")
        } else if (this.passwordFlag == 2) {
          this.updateSecretInfo();
        }
      } else if (this.dialogTitle === "邮箱验证码") {
        this.showDialog = false;
      }
    },

    updateSecretInfo() {
      if (this.$common.isEmpty(this.loginParam.code)) {
        this.$message.error("请输入验证码！")
        return;
      }
      if (this.$common.isEmpty(this.loginParam.password)) {
        this.$message.error("请输入密码！");
        isPasswordValid = false;
      } else if (!/(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}/.test(this.loginParam.password)) {
        this.$message.error("密码长度在6-18个字符，只能包含数字、大小写字母，且至少包含一个字母");
        isPasswordValid = false;
      }

      let isPasswordValid = true;
      if (!isPasswordValid) {
        return;
      }

      let params = {
        email: this.loginParam.email.trim(),
        code: this.loginParam.code.trim(),
        password: this.loginParam.password.trim()
      };
      if (this.dialogTitle === "找回密码") {
        this.$request.post("/user/findPassword", params).then(res => {
          if (res.code === '200') {
            this.$message.success({
              message: "密码修改成功，请重新登录！",
              duration: 5000 // 持续时间为5秒
            });
            this.loginParam.password = ""
            this.loginParam.email = ""
            this.loginParam.code = ""
            this.showDialog = false;
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
  },
}

</script>

<style scoped>
.in-up-container {
  height: 100vh;
  position: relative;
}

.in-up {
  opacity: 0.9;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  width: 750px;
  max-width: 100%;
  min-height: 450px;
  margin: 10px;
}

.in-up p {
  font-size: 14px;
  letter-spacing: 1px;
  margin: 20px 0 30px 0;
}

.in-up a {
  color: black;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

/* 以my-animation-开头的class */
[class*=my-animation-] {
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

.my-animation-hideToShow {
  animation-name: hideToShow
}

.form-container {
  position: absolute;
  height: 100%;
  transition: all 0.5s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
}

.form-container div {
  background: white;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
}

.form-container input {
  background: #EEEEEE;
  border-radius: 2px;
  border: none;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;
  outline: none;
}

.in-up button {
  border-radius: 2rem;
  border: none;
  background: #ff4b2b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 2px;
  cursor: pointer;
}

.in-up button:hover {
  animation: scale 0.8s ease-in-out;
}

.in-up button.ghost {
  background: transparent;
  border: 1px solid white;
}

.sign-up-container button {
  margin-top: 20px;
}

.overlay-container {
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.overlay {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
}

.overlay-panel {
  position: absolute;
  top: 0;
  flex-direction: column;
  height: 100%;
  width: 50%;
  transition: all 0.5s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
  white-space: nowrap;
  font-size: 16px;
}

.overlay-left {
  transform: translateY(-20%);
  white-space: nowrap;
  font-size: 16px;
}

.in-up.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.in-up.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.in-up.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
}

.in-up.right-panel-active .overlay {
  transform: translateX(50%);
}

.in-up.right-panel-active .overlay-left {
  transform: translateY(0);
}

.in-up.right-panel-active .overlay-right {
  transform: translateY(20%);
}

.user-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}

/* 阴影 */
.shadow-box-mini {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.user-info {
  width: 80%;
  z-index: 10;
  margin-top: 70px;
  height: calc(100vh - 90px);
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
}

.user-left {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
}

.user-right {
  width: 50%;
  background: rgba(255, 255, 255, 0.5);
  padding: 20px;
}

.user-title {
  text-align: right;
  user-select: none;
}

.user-content {
  text-align: left;
}

.user-title div {
  height: 55px;
  line-height: 55px;
  text-align: center;
}

.user-content>div {
  height: 55px;
  display: flex;
  align-items: center;
}

.user-content>>>.el-input__inner,
.user-content>>>.el-textarea__inner {
  border: none;
  background: rgba(255, 255, 255, 0.3);
}

.user-content>>>.el-input__count {
  background: rgba(0, 0, 0, 0);
  user-select: none;
}

.changeInfo {
  color: white;
  font-size: 0.75rem;
  cursor: pointer;
  background: orange;
  padding: 3px;
  border-radius: 0.2rem;
  user-select: none;
}

@media screen and (max-width: 920px) {
  .user-info {
    width: 90%;
  }

  .user-left {
    width: 100%;
  }

  .user-right {
    display: none;
  }
}
</style>