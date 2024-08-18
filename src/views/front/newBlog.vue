<template>
    <div>
        <div>
            <div class="user-container myCenter my-animation-hideToShow">
                <!-- 背景图片 -->
                <el-image class="my-el-image" style="position: absolute" v-once lazy :src="src" fit="cover">
                    <div slot="error" class="image-slot"></div>
                </el-image>
                <div class="shadow-box-mini user-info" style="display: flex">
                    <div class="user-left">
                        <div>
                            <div style="margin: 40px auto 40px 0px;">发表/编辑</div>
                        </div>
                        <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules"
                            ref="formRef">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="form.title" placeholder="标题"></el-input>
                            </el-form-item>
                            <el-form-item label="简介" prop="descr">
                                <el-input type="textarea" v-model="form.descr" placeholder="简介"></el-input>
                            </el-form-item>
                            <!-- /qiniu/image -->
                            <el-form-item label="封面" prop="cover">
                                <el-upload :action="$baseUrl + '/tencent/image'"
                                    :headers="{ token: user.token }" list-type="picture"
                                    :on-success="handleCoverSuccess">
                                    <el-button type="primary">上传封面</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="分类" prop="categoryId">
                                <el-select v-model="form.categoryId" style="width: 100%">
                                    <el-option v-for="item in categoryList" :key="item.id" :value="item.id"
                                        :label="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标签" prop="tags">
                                <el-select v-model="tagsArr" multiple filterable allow-create default-first-option
                                    @change="handleChange" style="width: 100%">
                                    <el-option value="Java"></el-option>
                                    <el-option value="面试"></el-option>
                                    <el-option value="Vue"></el-option>
                                    <el-option value="大数据"></el-option>
                                    <el-option value="算法"></el-option>
                                    <el-option value="程序员"></el-option>
                                    <el-option value="我们应该怎样活着"></el-option>
                                    <el-option value="被偷走的那几年"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <!-- 编辑 -->
                                <div class="w-e-text">
                                    <layEditor :content="content" @change="onLayEditor"></layEditor>
                                </div>
                            </el-form-item>
                        </el-form>
                        <div>
                            <proButton :info="'保存'" :before="'rgb(131, 123, 199)'"
                                :after="'linear-gradient(45deg, #f43f3b, #ec008c)'" @click.native="save()"></proButton>
                        </div>
                    </div>
                </div>
                <!-- <div class="user-right"></div> -->
            </div>
        </div>
    </div>
</template>

<script>
import proButton from '@/components/proButton.vue';

export default {
    name: "newBlog",
    components: {
        proButton
    },

    data() {
        return {
            form: {},
            user: JSON.parse(localStorage.getItem('USER') || '{}'),
            rules: {},
            blogId: this.$route.query.blogId,
            ids: [],
            categoryList: [],
            tagsArr: [],
            content: [],
            options: {
                uploadImg(file, src) {
                    // 创建一个新的 FormData 对象
                    let fileData = new FormData();

                    // 将文件添加到 fileData 中，名字为 'file'
                    fileData.append("file", file);

                    return this.$request.post("/files/emotion/upload", fileData).then(res => {
                        // 上传成功，返回上传后的图片地址
                        return src = res.data.url
                    }).catch(error => {
                        // 上传失败，可以根据需要处理错误
                        console.error('上传失败:', error);
                        throw error;
                    })
                },
                dialogue: [
                    {
                        // 左边人物图片
                        leftImg: "https://lay-editor.gitee.io/lay-editor-doc/dialogue/hamster-1.png",
                        // 右边人物图片
                        rightImg: "https://lay-editor.gitee.io/lay-editor-doc/dialogue/hamster-2.png",
                    },
                ],
                maxEmoticon: [
                    {},
                    {},
                ],
                // 配置 小图表情包
                minEmoticon: [
                    {},
                ],
            },
            src: require("@/assets/imgs/boyWithCat.jpg"),
            // commonToken: 'aoligeimeimaobin',
            uploadHeaders: {
                'Common-Token': 'aoligeimeimaobin' // 在此处将 commonToken 传递给请求头部
            }
        }
    },
    created() {
        this.load()
    },
    mounted() { },
    methods: {
        // 编辑器内容发生变化触发
        onLayEditor(data) {
            // console.log("编辑器", data)
        },
        save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
            this.$refs.formRef.validate((valid) => {
                if (valid) {
                    this.form.tags = JSON.stringify(this.tagsArr)  // 将JSON数组转换成JSON字符串存储到数据库
                    this.form.content = JSON.stringify(this.content);  // 将编辑器内容数组转换为字符串并保存到 form.content
                    this.$request({
                        url: this.form.id ? '/blog/update' : '/blog/add',
                        method: this.form.id ? 'PUT' : 'POST',
                        data: this.form
                    }).then(res => {
                        if (res.code === '200') {  // 表示成功保存
                            this.$message.success('保存成功')
                        } else {
                            this.$message.error(res.msg)  // 弹出错误的信息
                        }
                    })
                }
            })
        },
        load() {
            this.$request.get("/category/selectAll").then(res => {
                this.categoryList = res.data || []
            })

            this.$request.get("/blog/selectById/" + this.blogId).then(res => {
                this.form = res.data || {}
                if (this.form.id) {
                    setTimeout(() => {
                        this.content = JSON.parse(this.form.content || '[]')
                        this.tagsArr = JSON.parse(this.form.tags || '[]')
                    }, 0)
                }
            })
        },
        handleCoverSuccess(res) {
            this.form.cover = res.data
        },
        handleChange(value) {
            if (value.length > 1) {
                this.tagsArr = [value[value.length - 1]];
            }
        },
    }
}

</script>
<style scoped>
.user-container {
    width: 100vw;
    height: 100vh;
    position: relative;
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
</style>