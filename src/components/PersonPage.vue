<template>
    <div>
        <!-- 个人中心 -->
        <div
            style="display: flex;flex-direction: column; justify-content: center;align-items: center;margin-top: 30px;">
            <div>
                <el-avatar class="user-avatar" @click.native="changeDialog('修改头像')" :size="60"
                    :src="currentUser.avatar"></el-avatar>
            </div>
            <div class="myCenter" style="margin-top: 12px">
                <div class="user-title">
                    <div>用户名：</div>
                    <div>手机号：</div>
                    <div>邮箱：</div>
                    <div>性别：</div>
                    <div>简介：</div>
                </div>
                <div class="user-content">
                    <div>
                        <el-input maxlength="30" v-model="currentUser.username"></el-input>
                    </div>
                    <div>
                        <div v-if="!$common.isEmpty(currentUser.phone)">
                            {{ currentUser.phone }} <span class="changeInfo"
                                @click="changeDialog('修改手机号')">修改（功能未接入）</span>
                        </div>
                        <div v-else><span class="changeInfo" @click="changeDialog('绑定手机号')">绑定手机号（功能未接入）</span>
                        </div>
                    </div>
                    <div>
                        <div v-if="!$common.isEmpty(currentUser.email)">
                            {{ currentUser.email }} <span class="changeInfo" @click="changeDialog('修改邮箱')">修改</span>
                        </div>
                        <div v-else><span class="changeInfo" @click="changeDialog('绑定邮箱')">绑定邮箱</span></div>
                    </div>
                    <div>
                        <el-radio-group v-model="currentUser.sex">
                            <el-radio label="薛定谔的猫" style="margin-right: 10px"></el-radio>
                            <el-radio label="男" style="margin-right: 10px"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </div>
                    <div>
                        <el-input v-model="currentUser.info" maxlength="60" type="textarea" show-word-limit></el-input>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px">
                <proButton :info="'提交'" @click.native="submitUserInfo()" :before="$constant.before_color_2"
                    :after="$constant.after_color_2">
                </proButton>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="30%" :append-to-body="true"
            :close-on-click-modal="false" center>
            <div class="myCenter" style="flex-direction: column">
                <div>
                    <div v-if="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号'">
                        <div style="margin-bottom: 5px">手机号：</div>
                        <el-input v-model="phone"></el-input>
                        <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
                        <el-input v-model="code"></el-input>
                        <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
                        <el-input v-model="password"></el-input>
                    </div>
                    <div v-else-if="dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'">
                        <div style="margin-bottom: 5px">邮箱：</div>
                        <el-input v-model="InputParams.email"></el-input>
                        <div style="margin-top: 10px;margin-bottom: 5px">验证码：</div>
                        <el-input v-model="InputParams.code"></el-input>
                        <div style="margin-top: 10px;margin-bottom: 5px">密码：</div>
                        <el-input v-model="InputParams.password"></el-input>
                    </div>
                    <div v-else-if="dialogTitle === '修改头像'">
                        <el-upload class="upload-demo" drag :action="$baseUrl + '/tencent/image'" multiple
                            :auto-upload="true" :limit="1" :on-success="handleCoverSuccess" :on-change="handleChange"
                            list-type="picture" :headers="{ token: this.currentUser.token }">
                            <div class="el-upload__text">
                                <svg viewBox="0 0 1024 1024" width="40" height="40">
                                    <path
                                        d="M666.2656 629.4528l-113.7664-112.4864c-20.7872-20.5824-54.3232-20.5312-75.1104 0.1024l-113.3056 112.4864c-20.8896 20.736-21.0432 54.528-0.256 75.4688 20.736 20.8896 54.528 21.0432 75.4688 0.256l22.6304-22.4256v189.5936c0 29.44 23.9104 53.3504 53.3504 53.3504s53.3504-23.9104 53.3504-53.3504v-189.5424l22.6816 22.4256a53.1456 53.1456 0 0 0 37.5296 15.4112c13.7728 0 27.4944-5.2736 37.9392-15.8208 20.6336-20.9408 20.4288-54.7328-0.512-75.4688z"
                                        fill="#FFE37B"></path>
                                    <path
                                        d="M820.992 469.504h-5.376c-3.072-163.328-136.3456-294.8096-300.4416-294.8096S217.856 306.1248 214.784 469.504H209.408c-100.7104 0-182.3744 81.664-182.3744 182.3744s81.664 182.3744 182.3744 182.3744h209.7664V761.856c-30.208 5.5808-62.464-3.3792-85.6576-26.7264-37.3248-37.5808-37.0688-98.5088 0.512-135.7824l113.3056-112.4864c37.2224-36.9664 97.8432-37.0176 135.168-0.1536l113.7664 112.4864c18.2272 18.0224 28.3648 42.0864 28.5184 67.7376 0.1536 25.6512-9.728 49.8176-27.7504 68.0448a95.40096 95.40096 0 0 1-68.3008 28.5184c-5.9392 0-11.776-0.512-17.5104-1.5872v72.3456h209.7664c100.7104 0 182.3744-81.664 182.3744-182.3744S921.7024 469.504 820.992 469.504z"
                                        fill="#8C7BFD"></path>
                                </svg>
                                <div>拖拽上传 / 点击上传</div>
                            </div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过100MB</div>
                        </el-upload>
                    </div>
                </div>
                <div style="display: flex;margin-top: 30px" v-if="dialogTitle !== '修改头像'">
                    <proButton :info="codeString"
                        v-show="dialogTitle === '修改手机号' || dialogTitle === '绑定手机号' || dialogTitle === '修改邮箱' || dialogTitle === '绑定邮箱'"
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

export default {
    name: "PersonPage",
    components: {
        proButton,
    },
    props: {
        currentUser: {}
    },
    data() {
        return {
            InputParams: {},
            avatar: "",
            showDialog: false,
            code: "",
            dialogTitle: "",
            codeString: "验证码",
        }
    },
    created() {
        this.showAvatar()
    },
    methods: {
        changeDialog(value) {
            if (value === "邮箱验证码") {
                if (this.$common.isEmpty(this.InputParams.email)) {
                    this.$message.error("请输入邮箱！")
                    return false;
                }
                if (!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.InputParams.email))) {
                    this.$message.error("邮箱格式有误！")
                    return false;
                }
            }

            this.dialogTitle = value;
            this.showDialog = true;
        },
        submitUserInfo() {
            if (!this.checkParameters()) {
                return;
            }

            let user = {
                id: this.currentUser.id,
                username: this.currentUser.username,
                sex: this.currentUser.sex
            };

            if (!this.$common.isEmpty(this.currentUser.info)) {
                user.info = this.currentUser.info.trim();
            }

            this.$confirm('确认保存？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'success',
                center: true
            }).then(() => {
                this.$request.put("/user/update", user).then(res => {
                    if (res.code === '200') {
                        // 成功更新用户信息后，从后端获取最新的用户信息并保存到 Vuex 中
                        this.$request.get("/user/selectById/" + this.currentUser.id).then(response => {
                            // 将之前保存的 token 添加到新的用户信息中
                            response.data.token = this.currentUser.token;
                            // 在这里已经将最新的用户信息保存到 Vuex 中，页面会自动更新
                            this.$store.commit("loadCurrentUser", response.data);
                            this.$message.success("修改成功！")
                        })
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }).catch(() => {
                this.$message.warning("已取消保存!")
            });
        },
        getCode() {
            if (this.codeString === "验证码") {
                if (this.dialogTitle === "修改邮箱") {
                    this.$request.post("/user/code/request", { email: this.InputParams.email }).then(_ => {
                        this.$request.post("/user/code/email", { email: this.InputParams.email, code: _.data }).then(res => {
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
            } else {
                this.$message.warning("请稍后再试！")
            }
        },
        handleChange(file, fileList) {
            console.log('文件上传状态发生变化：', file, fileList);
        },
        handleCoverSuccess(res) {
            console.log('handleCoverSuccess 方法被调用了！');
            let user = {
                id: this.currentUser.id,
                avatar: res.data,
            };
            // console.log(res.data)
            this.$request.put("/user/update", user).then(res => {
                if (res.code === '200') {
                    this.$request.get("/user/selectById/" + this.currentUser.id).then(response => {
                        // 将之前保存的 token 添加到新的用户信息中
                        response.data.token = this.currentUser.token;
                        this.currentUser.avatar = response.avatar
                        // 在这里已经将最新的用户信息保存到 Vuex 中，页面会自动更新
                        this.$store.commit("loadCurrentUser", response.data);
                        // 刷新页面
                        window.location.reload();
                    })
                    this.$message.success("修改成功！")
                    this.showDialog = false
                }
            })
        },
        showAvatar() {
            const User = localStorage.getItem("USER")
            this.$store.commit("loadCurrentUser", JSON.parse(User));
        },
        submitDialog() {
            if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号" || this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱") {
                this.updatePhoneOrEmail();
            }
        },
        updatePhoneOrEmail() {
            if (this.$common.isEmpty(this.InputParams.code)) {
                this.$message.error("请输入验证码！")
                return;
            }
            if (this.$common.isEmpty(this.InputParams.password)) {
                this.$message.error("请输入密码！")
                isPasswordValid = false;
            } else if (!/(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}/.test(this.InputParams.password)) {
                this.$message.error("密码长度在6-18个字符，只能包含数字、大小写字母，且至少包含一个字母");
                isPasswordValid = false;
            }

            let isPasswordValid = true;
            if (!isPasswordValid) {
                return;
            }

            let params = {
                email: this.InputParams.email.trim(),
                code: this.InputParams.code.trim(),
                password: this.InputParams.password.trim()
            };

            if (!this.checkParams(params)) {
                return;
            }

            if (this.dialogTitle === "修改邮箱") {
                this.$request.post("/user/updateEmail", params).then(res => {
                    if (res.code === '200') {
                        this.$request.get("/user/selectById/" + this.currentUser.id).then(response => {
                            // 将之前保存的 token 添加到新的用户信息中
                            response.data.token = this.currentUser.token;
                            this.$store.commit("loadCurrentUser", response.data);
                            // 在这里已经将最新的用户信息保存到 Vuex 中，页面会自动更新
                            this.$message.success("修改成功！")
                            this.InputParams.email = ""
                            this.InputParams.code = ""
                            this.InputParams.password = ""
                        })
                    } else {
                        this.$message.error(res.msg)
                    }
                })

            }
        },
        checkParameters() {
            if (this.$common.isEmpty(this.currentUser.username)) {
                this.$message.error("请输入用户名！")
                return false;
            }

            if (this.currentUser.username.indexOf(" ") !== -1) {
                this.$message.error("用户名不能包含空格！")
                return false;
            }
            return true;
        },
        checkParams(params) {
            if (this.dialogTitle === "修改手机号" || this.dialogTitle === "绑定手机号") {
                if (this.$common.isEmpty(this.phone)) {
                    this.$message.error("请输入手机号！")
                    return false;
                }
                if (!(/^1[345789]\d{9}$/.test(this.phone))) {
                    this.$message.error("手机号格式有误！")
                    return false;
                }
                params.place = this.phone;
                return true;
            } else if (this.dialogTitle === "修改邮箱" || this.dialogTitle === "绑定邮箱") {
                if (this.$common.isEmpty(this.InputParams.email)) {
                    this.$message.error("请输入邮箱！")
                    return false;
                }
                if (!(/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(this.InputParams.email))) {
                    this.$message.error("邮箱格式有误！")
                    return false;
                }
                return true;
            }
            return false;
        },

    }
}
</script>

<style>
.user-title {
    text-align: right;
    user-select: none;
}

.user-title div {
    height: 55px;
    line-height: 55px;
    text-align: center;
}

.user-content {
    text-align: left;
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

.el-upload.el-upload--picture,
.el-upload.el-upload--text {
    width: 100%;
}

.el-upload-dragger {
    width: 100% !important;
    height: 100px !important;
}
</style>