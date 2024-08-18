<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入标题查询" style="width: 200px;margin-right: 10px;" v-model="title"></el-input>
      <el-input placeholder="请输入分类查询" style="width: 200px;margin-right: 10px;" v-model="categoryName"></el-input>
      <el-input placeholder="请输入发布人查询" style="width: 200px" v-model="userName"></el-input>
      <el-button type="info" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <div class="table">
      <el-table :data="tableData" strip @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="序号" width="70" align="center" sortable></el-table-column>
        <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descr" label="简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="查看内容">
          <template v-slot="scope">
            <el-button @click="preview(scope.row.content)">查看内容</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cover" label="封面">
          <template v-slot="scope">
            <div style="display: flex;justify-content: center;align-items: center;">
              <el-image style="width: 50px; height: 50px; border-radius: 5px" v-if="scope.row.cover"
                :src="scope.row.cover" :preview-src-list="[scope.row.cover]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="分类"></el-table-column>
        <el-table-column prop="tags" label="标签">
          <template v-slot="scope">
            <el-tag v-for="item in JSON.parse(scope.row.tags || '[]')" :key="item" style="margin: 5px;">{{
              item
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="发布人"></el-table-column>
        <el-table-column prop="date" label="发布日期"></el-table-column>
        <el-table-column prop="readCount" label="浏览量"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum"
          :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>


    <el-dialog title="文章内容" :visible.sync="fromVisible1" width="60%" :close-on-click-modal="false"
      :append-to-body="true" destroy-on-close>
      <div class="w-e-text">
        <!-- 渲染 -->
        <layRender :content="content"></layRender>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fromVisible1 = false">关 闭</el-button>
      </div>
    </el-dialog>


    <el-dialog title="信息" :visible.sync="fromVisible" width="60%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="descr">
          <el-input type="textarea" v-model="form.descr" placeholder="简介"></el-input>
        </el-form-item>
        <!-- /qiniu/image  -->
        <el-form-item label="封面" prop="cover">
          <el-upload :action="$baseUrl + '/tencent/image'" list-type="picture" :headers="{ token: user.token }"
            :on-success="handleCoverSuccess">
            <el-button type="primary">上传封面</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="form.categoryId" style="width: 100%">
            <el-option v-for="item in categoryList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="tagsArr" filterable multiple allow-create default-first-option @change="handleChange" style="width: 100%">
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="fromVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>

export default {
  name: "Blog",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      title: null,
      categoryName: null,
      userName: null,
      fromVisible: false,
      fromVisible1: false,
      form: {},
      user: JSON.parse(localStorage.getItem('ADMIN') || '{}'),
      rules: {},
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
      commonToken : 'aoligeimeimaobin'
    }
  },
  created() {
    this.load(1)
  },
  mounted() { },
  methods: {
    // 编辑器内容发生变化触发
    onLayEditor(data) {
      // console.log("编辑器", data)
    },
    handleAdd() {   // 新增数据
      this.form = {}  // 新增数据的时候清空数据
      this.tagsArr = []
      this.fromVisible = true   // 打开弹窗
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row || {}))  // 给form对象赋值  注意要深拷贝数据
      this.tagsArr = JSON.parse(this.form.tags || '[]')
      this.fromVisible = true   // 打开弹窗
      // 将编辑器内容字符串转换为数组
      if (row.content) {
        try {
          this.content = JSON.parse(row.content);
          console.log("编辑", this.content);
        } catch (error) {
          console.error("Error parsing content JSON:", error);
          this.content = [];
        }
      } else {
        this.content = [];
      }
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
              this.load(1)
              this.fromVisible = false
              this.content = []; // 清空编辑器内容数组
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })
        }
      })
    },
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', { type: "warning" }).then(response => {
        this.$request.delete('/blog/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)   //  [1,2]
    },
    delBatch() {   // 批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确定批量删除这些数据吗？', '确认删除', { type: "warning" }).then(response => {
        this.$request.delete('/blog/delete/batch', { data: this.ids }).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    load(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/blog/selectPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
          categoryName: this.categoryName,
          userName: this.userName
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })

      this.$request.get("/category/selectAll").then(res => {
        this.categoryList = res.data || []
      })
    },
    reset() {
      this.title = null
      this.categoryName = null
      this.userName = null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
    handleCoverSuccess(res) {
      this.form.cover = res.data
    },
    handleChange(value) {
      if (value.length > 1) {
        this.tagsArr = [value[value.length - 1]];
      }
    },
    preview(content) {
      this.content = JSON.parse(content || '[]')
      this.fromVisible1 = true
    },
  }
}

</script>

<style scoped></style>
