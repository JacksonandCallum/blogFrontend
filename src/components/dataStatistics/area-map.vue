<template>
  <div style="width: 100%; height: 100%;">
    <div id="area-map"></div>
  </div>
</template>

<script>
import mapData from "./map";
export default {
  name: "area-map",
  data() {
    return {
      chinaJson: [],
      areaVisitData: [],
      max: 200,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getAreaVisitData();
    });
  },

  methods: {
    getAreaVisitData() {
      this.$request.get("/user/selectAll").then(res => {
        if (res.code === "200") {
          const data = res.data;
          this.chinaJson = mapData;
          let province = [];
          this.chinaJson.features.forEach((item) => {
            data.forEach((user) => {
              const ipInfo = user.ip;
              if (ipInfo) {
                const addressMatch = ipInfo.match(/address=([^,]*)/);
                if (addressMatch) {
                  const addressParts = addressMatch[1].split('|');
                  const provinceName = addressParts[2];
                  if (item.properties.name.indexOf(provinceName) !== -1) {
                    let curProvince = province.find(p => p.name === item.properties.name);
                    if (curProvince) {
                      curProvince.value++;
                    } else {
                      province.push({
                        name: item.properties.name,
                        value: 1,
                      });
                    }
                    this.max = Math.max(this.max, curProvince ? curProvince.value : 1);
                  }
                }
              }
            });
          });
          this.areaVisitData = province;
          this.echartsInit();
        } else {
          console.error("Failed to fetch data: ", res.msg);
        }
      }).catch(err => {
        console.error("Request failed: ", err);
      });
    },

    async echartsInit() {
      // let data = this.areaVisitData;
      // console.log(data);
      let data = [
        { name: "北京市", value: 39.93 },
        { name: "天津市", value: 39.13 },
        { name: "河北省", value: 147 },
        { name: "山西省", value: 39 },
        { name: "内蒙古自治区", value: 58 },
        { name: "辽宁省", value: 50 },
        { name: "吉林省", value: 51 },
        { name: "黑龙江省", value: 114 },
        { name: "上海市", value: 31.23 },
        { name: "江苏省", value: 67 },
        { name: "浙江省", value: 84 },
        { name: "安徽省", value: 117 },
        { name: "福建省", value: 29 },
        { name: "海南省", value: 54 },
        { name: "重庆市", value: 66 },
        { name: "四川省", value: 500 },
        { name: "贵州省", value: 71 },
        { name: "云南省", value: 2500 },
        { name: "西藏自治区", value: 24 },
        { name: "湖南省", value: 61 },
        { name: "湖北省", value: 99 },
        { name: "江西省", value: 57 },
        { name: "宁夏回族自治区", value: 52 },
        { name: "新疆维吾尔自治区", value: 84 },
        { name: "台湾省", value: 88 },
        { name: "香港特别行政区", value: 66 },
      ];
      const areaMapElement = document.getElementById("area-map");

      if (areaMapElement) {
        const echart = this.$echarts.init(areaMapElement);
        this.$echarts.registerMap("chinaMap", this.chinaJson);

        echart.setOption({
          title: {
            left: "right",
          },
          tooltip: {
            trigger: "item",
            formatter(params) {
              return `${params.name}<br/>${params.value || 0} 访问次数`;
            },
          },
          backgroundColor: "#fff",
          visualMap: {
            top: 0,
            orient: "horizontal",
            type: "piecewise",
            formatter: function (value, value2) {
              return value.toFixed(0) + "-" + value2.toFixed(0);
            },
            min: 0,
            max: this.max,
            textGap: 5,
            itemGap: 30,
            inRange: {
              color: ["#A3E80D", "#FAC858", "#B289EB", "#8089EF", "#EF3B34"],
            },
          },
          series: [
            {
              type: "map",
              map: "chinaMap",
              zoom: 1.4,
              center: [107.97, 37.71],
              data: this.areaVisitData,
              geoIndex: 0,
              itemStyle: {
                borderColor: "#FFF",
                areaColor: "#F5F5F5",
                borderWidth: 1.5,
              },
              emphasis: {
                label: {
                  color: "#333",
                  fontWeight: 500,
                },
                itemStyle: {
                  borderColor: "#FFF",
                  areaColor: "#9FD7DD",
                },
              },
            },
          ],
        });
        window.addEventListener("resize", () => {
          echart.resize();
        });
      } else {
        console.error("Cannot find the DOM element with id 'area-map'");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#area-map {
  width: 100%;
  height: 100%;
}
</style>
