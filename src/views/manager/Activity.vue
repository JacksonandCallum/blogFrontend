<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入活动名称查询" style="width: 200px" v-model="name"></el-input>
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
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="descr" label="活动简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="查看活动详情" style="margin-right: 5px;">
          <template v-slot="scope">
            <el-button @click="preview(scope.row.content)" style="margin-right: 5px;">活动详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="cover" label="封面">
          <template v-slot="scope">
            <div style="display: flex;justify-content: center;align-items: center;">
              <el-image style="width: 50px; height: 30px; border-radius: 5px" v-if="scope.row.cover"
                :src="scope.row.cover" :preview-src-list="[scope.row.cover]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="start" label="开始时间"></el-table-column>
        <el-table-column prop="end" label="结束时间"></el-table-column>
        <el-table-column prop="form" label="活动形式"></el-table-column>
        <el-table-column prop="address" label="活动地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="host" label="主办方"></el-table-column>
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


    <el-dialog title="活动详情" :visible.sync="fromVisible1" width="80%" :close-on-click-modal="false"
      :append-to-body="true" destroy-on-close>
      <div class="w-e-text">
        <!-- 渲染 -->
        <layRender :content="content"></layRender>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="fromVisible1 = false">关 闭</el-button>
      </div>
    </el-dialog>


    <el-dialog title="信息" :visible.sync="fromVisible" width="80%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form" label-width="100px" style="padding-right: 50px" :rules="rules" ref="formRef">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动简介" prop="descr">
          <el-input type="textarea" v-model="form.descr" placeholder="活动简介"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-upload :action="$baseUrl + '/tencent/image'" :headers="{ token: user.token }" list-type="picture"
            :on-success="handleCoverSuccess">
            <el-button type="primary">上传封面</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="开始时间" prop="start">
          <el-date-picker style="width: 100%" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="form.start"
            placeholder="开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end">
          <el-date-picker style="width: 100%" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="form.end"
            placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动形式" prop="form">
          <el-select style="width: 100%" v-model="form.form">
            <el-option value="线上"></el-option>
            <el-option value="线下"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动地址" prop="address">
          <el-input v-model="form.address" placeholder="活动地址"></el-input>
        </el-form-item>
        <el-form-item label="主办方" prop="host">
          <el-input v-model="form.host" placeholder="主办方"></el-input>
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
  name: "Activity",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      name: null,
      editor: null,
      fromVisible: false,
      fromVisible1: false,
      content: [],
      form: {},
      user: JSON.parse(localStorage.getItem('ADMIN') || '{}'),
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        descr: [
          { required: true, message: '请输入活动简介', trigger: 'blur' },
        ],
        start: [
          { required: true, message: '请输入活动开始时间', trigger: 'blur' },
        ],
        end: [
          { required: true, message: '请输入活动结束时间', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入活动地址', trigger: 'blur' },
        ],
        host: [
          { required: true, message: '请输入主办方', trigger: 'blur' },
        ],
      },
      ids: [],
      commonToken : 'aoligeimeimaobin'
    }
  },
  created() {
    this.load(1)
  },
  methods: {
    // 编辑器内容发生变化触发
    onLayEditor(data) {
      console.log("编辑器", data)
    },
    handleAdd() {   // 新增数据
      this.form = {}  // 新增数据的时候清空数据
      this.content = []
      this.fromVisible = true   // 打开弹窗
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
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
          // 新增、编辑弹窗的富文本内容赋值到 content
          this.form.content = JSON.stringify(this.content);  // 将编辑器内容数组转换为字符串并保存到 form.content
          this.$request({
            url: this.form.id ? '/activity/update' : '/activity/add',
            method: this.form.id ? 'PUT' : 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {  // 表示成功保存
              this.$message.success('保存成功')
              this.load(1)
              this.fromVisible = false
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })
        }
      })
    },
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', { type: "warning" }).then(response => {
        this.$request.delete('/activity/delete/' + id).then(res => {
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
        this.$request.delete('/activity/delete/batch', { data: this.ids }).then(res => {
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
      this.$request.get('/activity/selectPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },
    reset() {
      this.name = null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
    handleCoverSuccess(res) {
      this.form.cover = res.data
    },
    preview(content) {
      this.content = JSON.parse(content || '[]')
      this.fromVisible1 = true
    },
  }
}
</script>

<style scoped></style>
