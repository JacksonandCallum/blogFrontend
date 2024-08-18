<template>
    <div>
        <!-- 两句诗 -->
        <div class="my-animation-slide-top">
            <twoPoem></twoPoem>
        </div>

        <div style="background: white; padding-top: 40px" class="my-animation-slide-bottom">
            <!-- 标签 -->
            <div class="sort-warp shadow-box" v-if="!$common.isEmpty(articles)">
                <div v-for="(article, index) in articles" :key="index" :class="{
                    isActive:
                        !$common.isEmpty(article.tags)
                }">
                    <proTag :info="processTags(article.tags)"
                        :color="$constant.before_color_list[Math.floor(Math.random() * 6)]" style="margin: 12px">
                    </proTag>
                </div>
            </div>

            <!-- 文章 -->
            <div class="article-wrap">
                <articleList :articleList="articles"></articleList>
                <div class="pagination-wrap">
                    <div style="user-select: none">~~到底啦~~</div>
                </div>
            </div>
            <!-- 页脚 -->
            <myFooter></myFooter>
        </div>
    </div>
</template>

<script>
const twoPoem = () => import("@/components/twoPoem.vue");
const proTag = () => import("@/components/proTag");
const articleList = () => import("@/components/articleList");
const myFooter = () => import("@/components/myFooter.vue");

export default {
    components: {
        twoPoem,
        proTag,
        articleList,
        myFooter,
    },

    data() {
        return {
            sortId: this.$route.query.sortId,
            articles: [],
        };
    },

    computed: {},

    watch: {
        $route() {
            this.articles.splice(0, this.articles.length);
            this.sortId = this.$route.query.sortId;
            this.getArticles();
        },
    },

    created() {
        this.getArticles();
    },

    mounted() { },

    methods: {
        getArticles() {
            this.$request.get("/blog/selectCategoryID/" + this.sortId).then((res) => {
                this.articles = res.data;
            });
        },
        // 处理标签，去除字符串数组的符号
        processTags(tagsString) {
            // 去除字符串两端的中括号和双引号，并以空格分割为数组
            return tagsString.replace(/[\[\]"]/g, "");
        },
    },
};
</script>

<style scoped>
/* 以my-animation-开头的class */
[class*="my-animation-"] {
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
}

.my-animation-slide-top {
    animation-name: slide-top;
}

.my-animation-slide-bottom {
    animation-name: slide-bottom;
}

.sort-warp {
    width: 70%;
    max-width: 780px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
}

.shadow-box {
    box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.shadow-box:hover {
    box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
}

.article-wrap {
    width: 70%;
    margin: 40px auto;
    min-height: 600px;
}

.isActive {
    animation: scale 1.5s ease-in-out infinite;
}

.pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

@media screen and (max-width: 900px) {
    .sort-warp {
        width: 90%;
    }

    .article-wrap {
        width: 90%;
    }
}
</style>
