<template>
    <div>
        <div class="main-content">
            <!-- 封面 -->
            <div class="article-head my-animation-slide-top">
                <!-- 背景图片 -->
                <el-image class="article-image my-el-image" v-once lazy v-if="src" :src="src" fit="cover">
                    <div slot="error" class="image-slot">
                        <div class="article-image"></div>
                    </div>
                </el-image>
                <div>
                    <!-- 活动信息 -->
                    <div class="article-info-container">
                        <div class="article-title">{{ activity.name }}</div>
                        <!-- <div class="article-descr">{{ activity.descr }}</div> -->
                        <div class="article-info">
                            <!-- 活动发布人 -->
                            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                                <path
                                    d="M113.834667 291.84v449.194667a29.013333 29.013333 0 0 0 28.842666 29.013333h252.928v90.453333l160.597334-90.453333h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333h-665.6a29.013333 29.013333 0 0 0-29.696 29.013333z"
                                    fill="#FFDEAD"></path>
                                <path
                                    d="M809.130667 262.826667h-665.6a29.013333 29.013333 0 0 0-28.842667 29.013333v40.106667a29.013333 29.013333 0 0 1 28.842667-29.013334h665.6a29.013333 29.013333 0 0 1 29.013333 29.013334V291.84a29.013333 29.013333 0 0 0-29.013333-29.013333z"
                                    fill="#FFF3DB"></path>
                                <path
                                    d="M556.202667 770.048h252.928a29.013333 29.013333 0 0 0 29.013333-29.013333V362.837333s-59.733333 392.533333-724.309333 314.709334v63.488a29.013333 29.013333 0 0 0 28.842666 29.013333h253.098667v90.453333z"
                                    fill="#F2C182"></path>
                                <path
                                    d="M619.008 632.32l101.888-35.157333-131.754667-76.117334 29.866667 111.274667zM891.904 148.992a61.44 61.44 0 0 0-84.138667 22.528l-19.968 34.133333 106.666667 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-22.528-84.138667z"
                                    fill="#69BAF9"></path>
                                <path
                                    d="M775.338667 198.775467l131.669333 76.032-186.026667 322.218666-131.6864-76.032z"
                                    fill="#F7FBFF"></path>
                                <path
                                    d="M775.168 198.826667l-5.290667 9.216 59.221334 34.133333a34.133333 34.133333 0 0 1 12.458666 46.592l-139.946666 242.346667a34.133333 34.133333 0 0 1-46.762667 12.629333l-59.050667-34.133333-6.656 11.434666 88.746667 51.2L720.896 597.333333l186.026667-322.56z"
                                    fill="#D8E3F0"></path>
                                <path
                                    d="M616.448 622.592l2.56 9.728 101.888-35.157333-44.885333-25.941334-59.562667 51.370667zM891.904 148.992c-1.024 0-2.218667-0.853333-3.242667-1.536A61.610667 61.610667 0 0 1 887.466667 204.8l-19.968 34.133333-73.728-42.496-5.12 8.704 106.666666 61.610667 19.968-34.133333a61.781333 61.781333 0 0 0-23.381333-83.626667z"
                                    fill="#599ED4"></path>
                                <path
                                    d="M265.898667 417.621333H494.933333a17.066667 17.066667 0 1 0 0-34.133333H265.898667a17.066667 17.066667 0 1 0 0 34.133333zM265.898667 533.504H494.933333a17.066667 17.066667 0 0 0 0-34.133333H265.898667a17.066667 17.066667 0 0 0 0 34.133333z"
                                    fill="#3D3D63"></path>
                                <path
                                    d="M959.488 354.645333a99.84 99.84 0 0 0-23.722667-127.488 78.677333 78.677333 0 0 0-142.848-64.170666l-11.605333 20.138666a17.066667 17.066667 0 0 0-20.821333 7.168l-32.085334 55.466667H142.677333a46.250667 46.250667 0 0 0-45.909333 46.08v449.194667a46.08 46.08 0 0 0 45.909333 46.08h236.032v73.386666a17.066667 17.066667 0 0 0 8.362667 14.848 17.066667 17.066667 0 0 0 8.704 2.218667 17.066667 17.066667 0 0 0 8.362667-2.218667l156.672-88.234666h248.32a46.08 46.08 0 0 0 46.08-46.08V398.677333L921.6 283.306667a17.066667 17.066667 0 0 0-4.266667-21.504l1.877334-3.413334a65.365333 65.365333 0 0 1 10.410666 79.189334l-53.077333 91.989333a56.832 56.832 0 0 0 20.821333 77.653333 17.066667 17.066667 0 0 0 24.234667-6.314666 17.066667 17.066667 0 0 0-6.997333-23.04 23.04 23.04 0 0 1-8.362667-31.061334z m-138.410667 386.389334a11.946667 11.946667 0 0 1-11.946666 11.946666H556.202667a17.066667 17.066667 0 0 0-8.362667 2.218667l-134.997333 76.117333v-61.269333a17.066667 17.066667 0 0 0-17.066667-17.066667H142.677333a11.946667 11.946667 0 0 1-11.776-11.946666V291.84a11.946667 11.946667 0 0 1 11.776-11.946667h565.930667L574.464 512a17.066667 17.066667 0 0 0-1.706667 12.970667L597.333333 615.253333H265.898667a17.066667 17.066667 0 1 0 0 34.133334h352.938666a17.066667 17.066667 0 0 0 5.802667 0l102.4-35.328a17.066667 17.066667 0 0 0 9.216-7.509334l85.333333-147.968z m-204.8-184.661334l63.829334 36.864-49.322667 17.066667z m206.848-170.666666v1.365333l-108.373333 186.709333-102.4-59.050666L781.482667 221.866667l102.4 59.050666z m76.458667-161.28L887.466667 244.224l-76.970667-44.373333 11.264-19.797334a44.544 44.544 0 1 1 77.141333 44.544z"
                                    fill="#3D3D63"></path>
                            </svg>
                            <span style="margin-left: 5px;">{{ activity.host }}</span>
                            <span>·</span>
                            <!-- 时间 -->
                            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                                <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF">
                                </path>
                                <path
                                    d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
                                    fill="#FFFFFF"></path>
                                <path
                                    d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
                                    fill="#FFFFFF"></path>
                            </svg>
                            <span style="margin-left: 5px;">{{ activity.start }} ~ {{ activity.end }}</span>
                            <span>·</span>
                            <!-- 热度（阅读数） -->
                            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                                <path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z"
                                    fill="#FF0000"></path>
                                <path
                                    d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
                                    fill="#FFFFFF"></path>
                            </svg>
                            <span style="margin-left: 5px;">{{ activity.readCount }}</span>
                            <span>·</span>
                            <!-- 点赞数 -->
                            <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                                <path
                                    d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                                    fill="#FF713C"></path>
                                <path
                                    d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                                    fill="#885F44"></path>
                            </svg>
                            <span style="margin-left: 5px;">{{ activity.likesCount }}</span>
                        </div>
                    </div>
                    <!-- 加号图标 -->
                    <div class="article-info-news" @click="weiYanDialogVisible = true">
                        <svg width="30" height="30" viewBox="0 0 1024 1024">
                            <path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01"></path>
                            <path
                                d="M989.866667 512c0 263.918933-213.947733 477.866667-477.866667 477.866667S34.133333 775.918933 34.133333 512 248.081067 34.133333 512 34.133333s477.866667 213.947733 477.866667 477.866667z"
                                fill="#FF7744"></path>
                            <path
                                d="M512 221.866667A51.2 51.2 0 0 1 563.2 273.066667v187.733333H750.933333a51.2 51.2 0 0 1 0 102.4h-187.733333V750.933333a51.2 51.2 0 0 1-102.4 0v-187.733333H273.066667a51.2 51.2 0 0 1 0-102.4h187.733333V273.066667A51.2 51.2 0 0 1 512 221.866667z"
                                fill="#FFFFFF"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <!-- 活动 -->
            <div style="background: white;">
                <div class="article-container my-animation-slide-bottom">

                    <!-- 活动内容 -->
                    <layRender :content="activityContentHtml" class="entry-content"></layRender>
                    <!-- 最后更新时间 -->
                    <div class="article-update-time">
                        <span>文章最后更新于 {{ activity.start }}</span>
                    </div>
                    <!-- 分类 -->
                    <div class="article-sort">
                        <!-- {path: '/sort', query: {sortId: article.sortId, labelId: article.labelId}} -->
                        <!-- <span @click="$router.push()">{{ blog.categoryName + " ▶ " + processTags(blog.tags) }}</span> -->
                    </div>
                    <!-- 作者信息 -->
                    <blockquote>
                        <div>
                            作者：{{ activity.host }}
                        </div>
                        <div>
                            版权声明：转载请注明文章出处
                        </div>
                    </blockquote>
                    <!-- 点赞、收藏 -->
                    <div class="card-Likes" style="text-align: center;">
                        <span style="margin-right: 20px;font-size: 25px;color: #797979;"><i
                                class="el-icon-thumb article-like-icon" :class="{ 'article-like': activity.isLike }"
                                @click="setLikes"></i>{{
                                    activity.likesCount }}</span>
                        <span style="font-size: 25px;color: #797979;"><i class="el-icon-star-off article-like-icon"
                                :class="{ 'article-like': activity.isCollect }" @click="setCollect"></i>{{
                                    activity.collectCount }}</span>
                    </div>
                    <!-- 评论 -->
                    <div style="margin-top: 20px;">
                        <comment :fid="parseInt(activityId)" :module="module" :userId="activity.hostId"></comment>
                    </div>
                </div>
                <!-- 博主信息 推荐文章 -->
            </div>
            <!-- 页脚 -->
            <div style="background: white">
                <myFooter></myFooter>
            </div>

            <el-dialog title="活动" :visible.sync="weiYanDialogVisible" width="40%" :append-to-body="true"
                :close-on-click-modal="false" destroy-on-close center>
                <div>
                    <div class="myCenter" style="margin-bottom: 20px">
                        <div style="color: #666;">
                            <i class="el-icon-location"></i>地址
                            <a style="color: #2a60c9;" :href="activity.address" v-if="activity.form === '线上'">{{
                                activity.address }}</a>
                            <span v-else>{{ activity.address }}</span>
                            <el-tag type="primary" size="mini" style="margin-left: 5px;">{{ activity.form }}</el-tag>
                        </div>

                    </div>
                    <div class="myCenter">
                        <div v-if="activity.isEnd">
                            <proButton :info="'已结束'" :before="'rgb(131, 123, 199)'"
                                :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" class="disabled-button"></proButton>
                        </div>
                        <div v-if="!activity.isEnd && !activity.isSign">
                            <proButton :info="'报名'" :before="'rgb(131, 123, 199)'"
                                :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="sign()"></proButton>
                        </div>
                        <div v-if="!activity.isEnd && activity.isSign">
                            <proButton :info="signText" :before="'rgb(131, 123, 199)'"
                                :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="cancel()"
                                @mouseenter.native="signText = '取消报名'" @mouseleave.native="signText = '已报名'">
                            </proButton>
                        </div>
                    </div>
                </div>
            </el-dialog>



        </div>
    </div>
</template>

<script>
import myFooter from '@/components/myFooter.vue';
import comment from '@/components/comment.vue';
import proButton from '@/components/proButton.vue';

export default {
    name: "ActivityDetail",
    components: {
        myFooter,
        comment,
        proButton
    },
    data() {
        return {
            src: "",
            activityId: this.$route.query.activityId,
            activity: {},
            activityContentHtml: [],
            isSidebarFixed: false,
            module: "活动",
            weiYanDialogVisible: false,
            signText: "已报名"
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    created() {
        this.load()

        // 更新浏览量
        this.$request.put("/activity/updateReadCount/" + this.activityId)

        // 在页面加载时从 Vuex store 中获取点赞状态
        // this.$store.commit('setLikes', localStorage.getItem('isLikes') === 'true')
        // 在页面加载时从 Vuex store 中获取收藏状态
        // this.$store.commit('setCollect', localStorage.getItem('isCollect') === 'true')
    },
    methods: {
        sign() {
            this.$request.post("/activitySign/add", { activityId: this.activityId }).then(res => {
                if (res.code === '200') {
                    this.$message.success("报名成功！")
                    this.load()
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // setLikes() {
        //     this.$request.post("/likes/set", { fid: this.activityId, module: this.module }).then(res => {
        //         if (res.code === '200') {
        //             // 若已点赞（true）,则可以取消点赞; 若当前用户没有点赞（false）,则可以点赞操作
        //             if (!this.$store.state.isLikes) {
        //                 this.$message.success("点赞成功")
        //             } else {
        //                 this.$message.error("取消点赞")
        //             }
        //             // 切换点赞状态
        //             this.$store.commit('setLikes', !this.$store.state.isLikes);
        //             // 更新本地存储的点赞状态
        //             localStorage.setItem('isLikes', this.$store.state.isLikes.toString());
        //             this.load()
        //         }
        //     })
        // },
        setLikes() {
            this.$request.post("/likes/set", { fid: this.activityId, module: this.module }).then(res => {
                if (res.code === '200') {
                    // 若已点赞（true）,则可以取消点赞; 若当前用户没有点赞（false）,则可以点赞操作
                    this.activity.isLike ? this.$notify({
                        title: '取消点赞',
                        message: '您已取消对该活动的点赞',
                        type: 'error'
                    }) : this.$notify({
                        title: '点赞成功',
                        message: '您已成功点赞该活动',
                        type: 'success'
                    });
                    this.load()
                }
            })
        },
        // setCollect() {
        //     this.$request.post("/collect/set", { fid: this.activityId, module: this.module }).then(res => {
        //         if (res.code === '200') {
        //             // 若已收藏（true）,则可以取消收藏; 若当前用户没有收藏（false）,则可以收藏操作
        //             if (!this.$store.state.isCollect) {
        //                 this.$message.success("收藏成功")
        //             } else {
        //                 this.$message.error("取消收藏")
        //             }
        //             // 切换点赞状态
        //             this.$store.commit('setCollect', !this.$store.state.isCollect);
        //             // 更新本地存储的点赞状态
        //             localStorage.setItem('isCollect', this.$store.state.isCollect.toString());
        //             this.load()
        //         }
        //     })
        // },
        setCollect() {
            this.$request.post("/collect/set", { fid: this.activityId, module: this.module }).then(res => {
                if (res.code === '200') {
                    // 若已收藏（true）,则可以取消收藏; 若当前用户没有收藏（false）,则可以收藏操作
                    this.activity.isCollect ? this.$notify({
                        title: '取消收藏',
                        message: '您已取消对该活动的收藏',
                        type: 'error'
                    }) : this.$notify({
                        title: '收藏成功',
                        message: '您已成功收藏该活动',
                        type: 'success'
                    });
                    this.load()
                }
            })
        },
        cancel() {   // 单个删除
            this.$confirm('您确定取消报名吗？', '确认取消报名', { type: "warning" }).then(response => {
                this.$request.delete('/activitySign/delete/user/' + this.activityId + '/' + this.$store.state.currentUser.id).then(res => {
                    if (res.code === '200') {   // 表示操作成功
                        this.$message.success('取消成功')
                        this.load()
                    } else {
                        this.$message.error(res.msg)  // 弹出错误的信息
                    }
                })
            }).catch(() => {
            })
        },
        // 处理（滑动滚动条时）顶部导航栏与侧边栏的距离
        handleScroll() {
            var header = document.querySelector('.front-header');
            var sidebar = document.querySelector('.aside-content');
            if (header && sidebar) {
                const sticky = header.offsetTop + header.offsetHeight;
                this.isSidebarFixed = window.scrollY >= sticky;
            }
        },
        // 处理标签，去除字符串数组的符号
        processTags(tagsString) {
            if (!tagsString) {
                return ''; // 处理空值情况，返回一个合适的默认值
            }
            // 去除字符串两端的中括号和双引号，并以空格分割为数组
            return tagsString.replace(/[\[\]"]/g, '');
        },
        load() {
            this.$request.get("/activity/selectById/" + this.activityId).then(res => {
                this.activity = res.data || {}
                this.src = this.activity.cover || "";
                this.activityContentHtml = JSON.parse(this.activity.content || '[]')
            })
        }
    },
}
</script>

<style>
.article-head {
    height: 40vh;
    position: relative;
}

/* 以my-animation-开头的class */
[class*=my-animation-] {
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
}


.my-animation-slide-top {
    animation-name: slide-top
}

.article-image::before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
    content: "";
}

.article-info-container {
    position: absolute;
    bottom: 50px;
    left: 20%;
    color: white;
    margin-left: -55px;
}

.article-title {
    font-size: 28px;
    margin-bottom: 15px;
}

.article-descr {
    font-size: 15px;
    font-style: italic;
    margin-bottom: 15px;
}

.article-info {
    font-size: 14px;
    user-select: none;
}

.article-info i {
    margin-right: 6px;
}

.article-info span:not(:last-child) {
    margin-right: 5px;
}

.article-info-news {
    position: absolute;
    bottom: 10px;
    right: 20%;
    cursor: pointer;
    animation: scale 1s ease-in-out infinite;
}

.article-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
}

.my-animation-slide-bottom {
    animation-name: slide-bottom
}

.article-update-time {
    color: #797979;
    font-size: 12px;
    margin: 20px 0;
    user-select: none;
}

.article-sort {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.article-sort span {
    padding: 3px 10px;
    background-color: orange;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    transition: all 0.3s;
    margin-right: 25px;
    cursor: pointer;
    user-select: none;
}

.article-sort span:hover {
    background-color: red;
}

blockquote {
    line-height: 2;
    border-left: 0.2rem solid rgb(3, 169, 244);
    padding: 10px 1rem;
    background-color: #ECF7FE;
    border-radius: 4px;
    margin: 0 0 40px 0;
    user-select: none;
    color: black;
    font-size: 15px;
}

.article-like-icon {
    font-size: 45px;
    cursor: pointer;
    color: #797979;
    transition: all 0.5s;
    border-radius: 50%;
    margin-bottom: 20px;
}

.article-like-icon:hover {
    transform: rotate(360deg);
}

.article-like {
    color: red !important;
}

.aside {
    width: 350px;
    position: absolute;
    right: 85px;
    top: 0%;
    z-index: 800;
    /* 更快速的过渡，使用 cubic-bezier 缓动函数 */
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.aside.fixed {
    position: fixed;
    /* 相对顶部导航栏 */
    top: 100px;
    /* 固定时不需要位移 */
    transform: translateY(0);
}


.aside:not(.fixed) {
    /* 非固定时向下滑动 */
    transform: translateY(100%);
}

.card-Likes {
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    /* box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1); */
}

.shadow-box {
    box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.shadow-box:hover {
    box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
}

/* 模块化背景色及透明度 */
.background-opacity {
    background: white;
    opacity: 0.88;
}

.info {
    /* 超出2行就... */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.img:hover {
    transform: rotate(-360deg);
    cursor: pointer;
}

.img {
    transition: all 0.6s;
    cursor: poiter
}

.recommend-title {
    margin-bottom: 5px;
}

.recommend-title:hover {
    color: #2a60c9;
}

.disabled-button {
    /* 改变按钮的外观 
    ** 降低不可用按钮的不透明度
    */
    opacity: 0.5;

    /* 显示禁用按钮的禁止点击光标
    ** 禁用点击事件
    */
    cursor: not-allowed !important;
    /* 禁用鼠标事件 */
    pointer-events: none !important;

}
</style>