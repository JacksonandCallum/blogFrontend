<template>
  <div>
    <div class="card" style="padding: 15px">
      您好，{{ user?.name }}！欢迎使用本系统
    </div>

    <div style="display: flex; margin: 10px 0;flex-direction: row;">
      <!-- <div style="width: 50%;" class="card">
        <div style="margin-bottom: 30px; font-size: 20px; font-weight: bold">公告列表</div>
        <div >
          <el-timeline  reverse slot="reference">
            <el-timeline-item v-for="item in notices" :key="item.id" :timestamp="item.time">
              <el-popover
                  placement="right"
                  width="200"
                  trigger="hover"
                  :content="item.content">
                <span slot="reference">{{ item.title }}</span>
              </el-popover>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div> -->
      <div style="flex: 1;">
        <areaMap></areaMap>
      </div>
      <div style="flex: 1;">
        <rankingBar></rankingBar>
      </div>
    </div>
  </div>
</template>

<script>
import areaMap from '@/components/dataStatistics/area-map.vue'
import rankingBar from '@/components/dataStatistics/ranking-bar.vue'

export default {
  name: 'Home',
  components: {
    areaMap,
    rankingBar
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem('ADMIN') || '{}'),
      notices: []
    }
  },
  created() {
    this.$request.get('/notice/selectAll').then(res => {
      this.notices = res.data || []
    })
  }
}
</script>
