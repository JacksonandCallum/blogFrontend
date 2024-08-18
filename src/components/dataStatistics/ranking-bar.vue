<template>
  <div style="width: 100%; height: 350px;">
    <div id="ranking"></div>
  </div>
</template>

<script>
export default {
  name: "ranking",

  data() {
    return {
      // areaVisitData: [],
      province: [],
      values: [],
      max: 0,
      // 存储 ECharts 实例
      echart: null,
    };
  },

  mounted() {
    // 确保在 DOM 渲染完成之后再初始化 ECharts
    this.$nextTick(() => {
      this.echartsInit();
      this.getAreaVisitData();
    });
  },

  methods: {
    // 获取省份访问数据
    async getAreaVisitData() {
      try {
        const res = await this.$request.get("/user/selectAll");
        if (res.code === "200" && res.data) {
          res.data.forEach((user) => {
            const ipInfo = user.ip;
            if (ipInfo) { // 检查 ipInfo 是否存在
              const address = ipInfo.match(/address=([^,]*)/);
              if (address) {
                const provinceName = address[1].split("|")[2];
                let curProvince = this.province.find(
                  (p) => p.name === provinceName
                );
                if (curProvince) {
                  curProvince.value++;
                } else {
                  this.province.push({
                    name: provinceName,
                    value: 1,
                  });
                }
                if (1 > this.max) this.max = 1 + 100;
              }
            }
          });

          let empty = 10 - this.province.length;
          if (empty > 0) {
            new Array(empty).fill("-").forEach(() => {
              this.province.push("-");
              this.values.push(0);
            });
          }

          // 设置 values 和最大值
          this.values = this.province.map((p) => p.value);
          this.max += this.getDigit(`${this.max}`.length);

          // 更新 ECharts 配置
          this.updateEcharts();
        }
      } catch (err) {
        console.error("Request failed: ", err);
      }
    },

    // 初始化 ECharts 实例的方法
    echartsInit() {
      const element = document.getElementById("ranking");
      if (element) {
        this.echart = this.$echarts.init(element);
        window.addEventListener("resize", () => {
          this.echart.resize();
        });
      } else {
        console.error("Cannot find the DOM element with id 'ranking'");
      }
    },

    // 更新 ECharts 配置的方法
    updateEcharts() {
      const option = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          // 设置柱状图整体偏移量
          top: 0,
          left: "20%",
          right: 30,
          bottom: 8,
        },
        xAxis: {
          show: false,
          type: "value",
          max: this.max,
          //去除网格线
          splitLine: { show: false },
          // 坐标轴线
          axisLine: {
            show: false, // 是否显示
          },
        },
        yAxis: {
          inverse: true,
          type: "category",
          data: this.province.map((p) => p.name),
          splitLine: { show: false },
          axisLine: {
            show: false, // 是否显示
          },
          splitArea: {
            show: false, // 是否显示
          },
          // 分割标点
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            type: "bar",
            data: this.values,
            barMaxWidth: 20,
            barGap: "20%" /*多个并排柱子设置柱子之间的间距*/,
            // 默认背景
            showBackground: "#F5F5F5",
            backgroundStyle: {
              borderRadius: 5,
            },
            itemStyle: {
              // 给每个柱子设置颜色
              normal: {
                color: "#8089EF",
                barBorderRadius: 5,
                label: {
                  show: true, // 开启显示
                  position: "right", // 标签的位置。
                  color: "#999",
                  formatter(params) {
                    return params.value ? `${params.value}` : "";
                  },
                },
              },
            },
          },
        ],
      };
      if (this.echart) {
        this.echart.setOption(option);
      } else {
        console.error("ECharts instance is not initialized.");
      }
    },

    // 获取位数
    getDigit(n = 1) {
      let l = n == 1 ? "1" : n - 1;
      let zero = "1";
      new Array(l).fill("").forEach((i) => {
        zero = `${zero}0`;
      });
      return zero * 1;
    },
  },
};
</script>

<style lang="scss" scoped>
#ranking {
  width: 100%;
  height: 100%;
}
</style>
