<template>
    <div>
        <!-- <el-image style="animation: header-effect 2s" class="background-image" v-once lazy :src="$constant.friendBG"
            fit="cover">
            <div slot="error" class="image-slot background-image-error"></div>
        </el-image> -->

        <!-- 封面 -->
        <!-- <div class="friend-head myCenter">
            <h1 style="color: white;z-index: 10;font-weight: 700;font-size: 45px">友人帐</h1>
        </div> -->

        <div class="friend-wrap">
            <div class="friend-main">
                <hr>
                <card :activityList="list"></card>
            </div>
        </div>

        <!-- 页脚 -->
        <!-- <myFooter></myFooter> -->
    </div>
</template>

<script>

const card = () => import("./card.vue");

export default {
    components: {
        card,
    },

    data() {
        return {
            list: [],
        }
    },

    computed: {},

    watch: {},

    created() {
        this.getList();
    },

    mounted() {

    },

    methods: {
        getList() {
            this.$request.get("/activity/selectAll").then(res => {
                if (res.code === '200') {
                    this.list = res.data || []
                } else {
                    this.$message.error(res.msg)
                }
            })
        }
    }
}
</script>

<style scoped>
.friend-head {
    height: 300px;
    position: relative;
}

.friend-head::before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    content: '';
}

.friend-main {
    max-width: 1200px;
    margin: 40px auto;
    border-radius: 10px;
    padding: 40px;
    background: rgba(255, 255, 255, .85);
}

.friend-main h2 {
    font-size: 20px;
}

hr {
    position: relative;
    margin: 40px auto;
    border: 2px dashed #39c5bb;
    overflow: visible;
}

hr:before {
    position: absolute;
    top: -14px;
    left: 5%;
    color: #39c5bb;
    content: '❄';
    font-size: 30px;
    line-height: 1;
    transition: all 1s ease-in-out;
}

hr:hover:before {
    left: calc(95% - 20px);
}

.form-wrap {
    margin: 0 auto;
    overflow: hidden;
    width: 530px;
    height: 447px;
    position: relative;
    top: 0;
    transition: all 1s ease-in-out .3s;
    z-index: 0;
    cursor: pointer;
}


.before-img {
    position: absolute;
    bottom: 126px;
    left: 0;
    background-repeat: no-repeat;
    width: 530px;
    height: 317px;
    z-index: -100;
}

.after-img {
    position: absolute;
    bottom: -2px;
    left: 0;
    background-repeat: no-repeat;
    width: 530px;
    height: 259px;
    z-index: 100;
}

.friend-wrap {
    padding: 0 20px;
    color: black;
}

.envelope {
    position: relative;
    margin: 0 auto;
    transition: all 1s ease-in-out .3s;
    padding: 200px 20px 20px;
}

.form-main {
    background: white;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
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

.user-content>>>.el-input__inner {
    border: none;
    height: 35px;
    background: rgba(255, 255, 255, 0.3);
}

.form-friend {
    margin-top: 12px;
    background-color: #eee;
    border: #ddd 1px solid;
    padding: 20px 0;
}

blockquote {
    line-height: 2;
    border-left: 0.2rem solid #ed6ea0;
    padding: 10px 1rem;
    background-color: #ffe6fa;
    border-radius: 4px;
    margin: 20px auto;
    color: #595A5A;
}

@media screen and (max-width: 700px) {
    .form-wrap {
        width: auto;
    }

    .before-img {
        width: auto;
    }

    .after-img {
        width: auto;
    }
}

@media screen and (max-width: 500px) {
    .friend-main {
        padding: 40px 15px;
    }

    .friend-wrap {
        padding: 0 10px
    }
}
</style>