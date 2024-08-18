<template>
  <div class="main-content">
    <el-image style="animation: header-effect 2s" class="background-image" v-once lazy :src="this.url" fit="cover">
      <div slot="error" class="image-slot background-image-error"></div>
    </el-image>
    <!-- 首页文字 -->
    <div class="signature-wall myCenter my-animation-hideToShow">
      <h1 class="playful">
        <span>{{ webInfo }}</span>
      </h1>
      <div class="printer" @click="getGuShi()">
        <printer :printerInfo="printerInfo">
          <template slot="paper" slot-scope="scope">
            <h3>{{ scope.content }}<span class="cursor">|</span></h3>
          </template>
        </printer>
      </div>
      <div id="bannerWave1"></div>
      <div id="bannerWave2"></div>
      <i class="el-icon-arrow-down" @click="navigation('.page-container-wrap')"></i>
    </div>
    <div class="page-container-wrap">
      <div class="page-container">
        <!-- 文章列表（左侧） -->
        <div class="recent-posts">
          <!-- （未搜索时的博客列表） -->
          <div v-show="indexType === 1">
            <div style="margin-top: 40px;">
              <div class="recent-post-item shadow-box background-opacity" v-for="blog in blogList" :key="blog.id"
                @click="$router.push('/front/BlogDetail?blogId=' + blog.id)">
                <!-- 图片 -->
                <div class="recent-post-item-image" :class="{
                  leftImage: blog.id % 2 !== 0,
                  rightImage: blog.id % 2 === 0,
                }">
                  <el-image class="my-el-image" v-once lazy :src="blog.cover" fit="cover">
                    <div slot="error" class="image-slot myCenter" style="background-color: #39c5bb">
                      <div class="error-text">
                        <div>遇事不决，可问春风</div>
                      </div>
                    </div>
                  </el-image>
                </div>
                <!-- 内容 -->
                <div class="recent-post-item-post" :class="{
                  leftImage: blog.id % 2 === 0,
                  rightImage: blog.id % 2 !== 0,
                }">
                  <!-- 时间 -->
                  <div class="post-meta">
                    <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
                      <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF"></path>
                      <path
                        d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
                        fill="#FFFFFF"></path>
                      <path
                        d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
                        fill="#FFFFFF"></path>
                    </svg>
                    发布于 {{ blog.date }}
                  </div>
                  <!-- 标题 -->
                  <div style="margin-top: 20px; margin-bottom: 20px">
                    <el-tooltip placement="top" effect="light">
                      <div slot="content">{{ blog.title }}</div>
                      <h3>{{ blog.title }}</h3>
                    </el-tooltip>
                  </div>
                  <!-- 博主 热度 点赞 -->
                  <div class="post-meta" style="margin-bottom: 15px">
                    <span>
                      <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
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
                        <path d="M775.338667 198.775467l131.669333 76.032-186.026667 322.218666-131.6864-76.032z"
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
                      {{ blog.userName }}
                    </span>
                    <span>
                      <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
                        <path d="M14.656 512a497.344 497.344 0 1 0 994.688 0 497.344 497.344 0 1 0-994.688 0z"
                          fill="#FF0000"></path>
                        <path
                          d="M374.976 872.64c-48.299-100.032-22.592-157.44 14.421-211.37 40.448-58.966 51.115-117.611 51.115-117.611s31.659 41.386 19.115 106.005c56.149-62.72 66.816-162.133 58.325-200.405 127.317 88.746 181.59 281.002 108.181 423.381C1016 652.501 723.093 323.2 672.277 285.867c16.939 37.333 20.054 100.032-14.101 130.474-58.027-219.84-201.664-265.002-201.664-265.002 16.96 113.536-61.781 237.397-137.344 330.24-2.816-45.163-5.632-76.544-29.483-119.808-5.333 82.176-68.373 149.269-85.29 231.445-22.912 111.637 17.237 193.173 170.581 279.424z"
                          fill="#FFFFFF"></path>
                      </svg>
                      {{ blog.readCount }} 热度
                    </span>
                    <span>
                      <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px">
                        <path
                          d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                          fill="#FF713C"></path>
                        <path
                          d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                          fill="#885F44"></path>
                      </svg>
                      {{ blog.likesCount }} 点赞
                    </span>
                  </div>
                  <!-- 描述 -->
                  <div class="recent-post-desc">
                    {{ ((blog.descr)) }}
                  </div>
                  <!-- 分类 标签 -->
                  <div class="sort-label">
                    <span style="margin-right: 12px"
                      @click="$router.push({ path: '/front/blogSort', query: { sortId: blog.categoryId } })">
                      <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px">
                        <path
                          d="M179.2 153.6m89.6 0l588.8 0q89.6 0 89.6 89.6l0 486.4q0 89.6-89.6 89.6l-588.8 0q-89.6 0-89.6-89.6l0-486.4q0-89.6 89.6-89.6Z"
                          fill="#FF9C55"></path>
                        <path
                          d="M25.6 193.4208A91.0208 91.0208 0 0 1 116.6208 102.4H382.592a91.0208 91.0208 0 0 1 87.5008 65.9712l24.5504 85.7216h412.7488A91.0208 91.0208 0 0 1 998.4 345.1392v485.4528A91.0208 91.0208 0 0 1 907.3792 921.6H116.608A91.0208 91.0208 0 0 1 25.6 830.5792V193.408z"
                          fill="#FFD977"></path>
                        <path
                          d="M128 665.6m25.6 0l76.8 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-76.8 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                          fill="#FFF1C9"></path>
                        <path
                          d="M128 768m25.6 0l179.2 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-179.2 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                          fill="#FFF1C9"></path>
                        <path
                          d="M128 486.4m51.2 0l0 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z"
                          fill="#FFA86A"></path>
                      </svg>
                      {{ blog.categoryName }}
                    </span>
                    <!-- v-for="(tag, index) in processTags(blog.tags)" :key="index" -->
                    <span>
                      <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px">
                        <path
                          d="M905.0112 560.4352l-342.784 342.784c-56.7808 56.7808-148.7872 56.7808-205.568 0l-231.5776-231.5776c-56.7808-56.7808-56.7808-148.7872 0-205.568l342.9376-342.9376a114.8928 114.8928 0 0 1 84.224-33.5872l266.3936 7.2192c60.7744 1.6384 109.7216 50.3808 111.5648 111.1552l8.2944 267.8272c1.024 31.6928-11.1104 62.3104-33.4848 84.6848z"
                          fill="#8C7BFD"></path>
                        <path
                          d="M675.2256 491.4688c-82.176 0-149.0432-66.8672-149.0432-149.0432s66.8672-149.0432 149.0432-149.0432 149.0432 66.8672 149.0432 149.0432-66.8672 149.0432-149.0432 149.0432z m0-192.2048c-23.808 0-43.2128 19.3536-43.2128 43.2128 0 23.808 19.3536 43.2128 43.2128 43.2128 23.808 0 43.2128-19.3536 43.2128-43.2128s-19.4048-43.2128-43.2128-43.2128z"
                          fill="#FFE37B"></path>
                      </svg>
                      {{ processTags(blog.tags) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="pagination-wrap1">
                <div v-if="total !== blogList.length">
                  <el-pagination background @current-change="handleCurrentChange" :current-page="pageNum"
                    :page-sizes="[5, 10, 20]" :page-size="pageSize" layout=" prev, pager, next" :total="total">
                  </el-pagination>
                </div>
                <div v-else style="user-select: none">~~到底啦~~</div>
              </div>
            </div>
          </div>
          <!-- （搜索后的博客列表） -->
          <div v-show="indexType === 2">
            <blogList :blogs="blogs"></blogList>
          </div>
        </div>

        <!-- 侧边栏（右侧） -->
        <div class="aside-content">
          <div class="card-content shadow-box background-opacity wow" style="animation: hideToShow 1s ease-in-out">
            <div style="margin-bottom: 10px">欢迎您！😊</div>
            <a href="/front/person" style="color: #000">
              <div>写下博客，记录美好的一天</div>
            </a>
          </div>
          <!-- 搜索 -->
          <div style="
              padding: 15px;
              border-radius: 10px;
              margin-top: 30px;
              animation: hideToShow 1s ease-in-out;
            " class="shadow-box background-opacity wow">
            <div style="
                color: #39c5bb;
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
              ">
              搜索
            </div>
            <div style="display: flex">
              <input class="ais-SearchBox-input" type="text" v-model="search.title" placeholder="搜索文章" maxlength="32" />
              <div class="ais-SearchBox-submit" @click="selectArticle()">
                <svg style="margin-top: 3.5px; margin-left: 18px" viewBox="0 0 1024 1024" width="20" height="20">
                  <path
                    d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
                    fill="#51C492"></path>
                  <path
                    d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
                    fill="#FFFFFF"></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 文章榜单 -->
          <div class="card shadow-box background-opacity wow" style="margin-top: 30px">
            <div style="
                display: flex;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
              ">
              <div style="font-size: 20px; flex: 1">文章榜单</div>
              <div style="font-size: 12px; color: #666; cursor: pointer" @click="refreshTop">
                <i class="el-icon-refresh"></i>换一换
              </div>
            </div>
            <div>
              <div v-for="(item, index) in showList" :key="item.id" style="
                  margin: 15px 0;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                ">
                <a :href="'/front/BlogDetail?blogId=' + item.id">
                  <div class="recommend-title">
                    <span style="
                        width: 18px;
                        display: inline-block;
                        text-align: right;
                        margin-right: 10px;
                      ">
                      <span style="color: orangered" v-if="item.index === 1">{{
                        item.index
                      }}</span>
                      <span style="color: goldenrod" v-else-if="item.index === 2">{{ item.index }}</span>
                      <span style="color: dodgerblue" v-else-if="item.index === 3">{{ item.index }}</span>
                    </span>
                    <span class="title" style="color: #666; margin-left: 10px">{{ item.title }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- 热门活动 -->
          <div v-show="indexType === 1">
            <div class="card shadow-box background-opacity wow" style="margin-top: 30px">
              <div style="
                  display: flex;
                  align-items: center;
                  padding-bottom: 10px;
                  border-bottom: 1px solid #ddd;
                ">
                <div style="font-size: 20px; flex: 1">热门活动</div>
              </div>
              <div>
                <div v-for="item in topActivityList" :key="item.id" style="margin-bottom: 10px; cursor: pointer">
                  <!-- href="/fornt/activityDetail?activityId=" +item.id   target="_blank"-->
                  <a :href="'/front/activityDetail?activityId=' + item.id" target="_blank">
                    <img :src="item.cover" :alt="item.name" :title="item.name"
                      style="width: 100%; border-radius: 10px" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <div style="background: white">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>
import myFooter from "@/components/myFooter.vue";
import printer from "@/components/printer.vue";
import blogList from "@/components/blogList.vue";

export default {
  components: {
    myFooter,
    printer,
    blogList,
  },
  created() {
    this.getGuShi();
  },
  data() {
    return {
      webInfo: "心想事成",
      url: "https://ys.mihoyo.com/main/_nuxt/img/s1.5c125a1.png",
      blogList: [],
      blogs: [],
      topList: [],
      showList: [],
      lastIndex: 0,
      topActivityList: [],
      printerInfo: "要么永远不踏出那一步，要么就是现在。",
      guShi: {
        "content": "",
        "origin": "",
        "author": "",
        "category": ""
      },
      indexType: 1,
      search: {
        title: "",
      },
      pageNum: 1,   // 当前的页码
      pageSize: 5,  // 每页显示的个数
      total: 0,
    };
  },
  mounted() {
    this.loadBlog(1);
    this.refreshTop();
    this.loadTopActivity();
    // 每隔一段时间更新诗词数据(10秒变换一次)
    setInterval(this.getGuShi, 10000);
  },
  methods: {
    async selectArticle() {
      this.blogs = [];
      await this.getBlogs();
      this.search = {
        title: "",
      };
      this.$nextTick(() => {
        this.indexType = 2;
        // $(".announcement").css("max-width", "780px");
        document.querySelector(".recent-posts").scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      });
    },

    async getBlogs() {
      await this.$request("/blog/selectArticle", { params: this.search }).then(
        (res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.blogs = res.data;
          } else {
            this.$message.error("好像没有你想要的呢~");
          }
        }
      );
    },

    loadTopActivity() {
      this.$request.get("/activity/selectTop").then((res) => {
        this.topActivityList = res.data || [];
      });
    },
    refreshTop() {
      this.$request.get("/blog/selectTop").then((res) => {
        this.topList = res.data || [];

        // this.topList = this.topList.slice(0,5)
        let i = 1;
        this.topList.forEach((item) => (item.index = i++));

        if (this.lastIndex === 10) {
          this.lastIndex = 0;
        }
        this.showList = this.topList.slice(this.lastIndex, this.lastIndex + 5);
        this.lastIndex += 5;
      });
    },


    /**
     * 从 JSON 数组中提取核心内容并返回摘要数组
     * @param {*} layEditorContentArray 
     */
    extractSummaries(layEditorContentArray) {
      const summaries = [];

      // 遍历 LayEditor 内容数组
      layEditorContentArray.forEach((item) => {
        // 如果是标题类型，直接将标题内容作为摘要
        if (item.type === "title") {
          summaries.push(this.extractContent(item.content.template));
        }
        // 如果是其他类型，你可以根据需要进一步处理
        // else if (item.type === '其他类型') {
        //     // 进一步处理其他类型的内容
        // }
      });

      return summaries;
    },

    /**
     * 从模板字符串中提取内容
     * @param {*} templateString 
     */
    extractContent(templateString) {
      // 使用正则表达式匹配模板字符串中的内容
      const match = templateString.match(/<div[^>]*>([\s\S]*?)<\/div>/);
      if (match && match[1]) {
        // 返回匹配到的内容
        return match[1].trim();
      } else {
        return ""; // 如果未匹配到内容，则返回空字符串
      }
    },

    // 处理标签，去除字符串数组的符号
    processTags(tagsString) {
      // 去除字符串两端的中括号和双引号，并以空格分割为数组
      return tagsString.replace(/[\[\]"]/g, "");
    },
    // 博客
    loadBlog(pageNum) {
      if (pageNum) this.pageNum = pageNum
      this.$request.get("/blog/selectPageForAll", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
        }
      }).then((res) => {
        this.blogList = res.data?.list
        this.total = res.data?.total
      });
    },
    navigation(selector) {
      let pageId = document.querySelector(selector);
      window.scrollTo({
        top: pageId.offsetTop,
        behavior: "smooth",
      });
    },
    getGuShi() {
      let that = this;
      let xhr = new XMLHttpRequest();
      xhr.open('get', this.$constant.jinrishici);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          that.guShi = JSON.parse(xhr.responseText);
          that.printerInfo = that.guShi.content;
        }
      };
      xhr.send();
    },
    handleCurrentChange(pageNum) {
      this.loadBlog(pageNum)
    },
  },
};
</script>

<style>
/* 图片 */
.background-image {
  width: 100vw;
  height: 50vh;
  /* 固定位置，不随滚动条滚动 */
  position: fixed;
  z-index: -1;
}

.background-image::before {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  content: "";
}

.background-image-error {
  background-color: #39c5bb;
  width: 100vw;
  height: 50vh;
  /* 固定位置，不随滚动条滚动 */
  position: fixed;
  z-index: -1;
}

.signature-wall {
  /* 向下排列 */
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  height: 50vh;
  overflow: hidden;
}

/* 居中 */
.myCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-text {
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 8px;
  color: white;
}

/* 以my-animation-开头的class */
[class*="my-animation-"] {
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

/* 显示 */
@keyframes hideToShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.my-animation-hideToShow {
  animation-name: hideToShow;
}

.playful {
  margin-bottom: 30px;
  color: rgb(255, 255, 255);
  font-size: 40px;
}

.printer {
  cursor: pointer;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  height: 60px;
  line-height: 60px;
  white-space: nowrap;
  font-size: 15px;
}

/* 光标 */
.cursor {
  margin-left: 1px;
  animation: hideToShow 0.7s infinite;
  font-weight: 200;
}

/* 背景位置移动 */
@keyframes gradientBG {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

#bannerWave1 {
  height: 84px;
  background: url("/src/assets/imgs/bannerwave1.png");
  position: absolute;
  width: 200%;
  bottom: 0;
  z-index: 10;
  animation: gradientBG 120s linear infinite;
}

#bannerWave2 {
  height: 84px;
  background: url("/src/assets/imgs/bannerwave1.png");
  position: absolute;
  width: 400%;
  bottom: 0;
  z-index: 5;
  animation: gradientBG 120s linear infinite;
}

/* 下移 */
@keyframes my-shake {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  30% {
    opacity: 0.5;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.el-icon-arrow-down {
  font-size: 40px;
  font-weight: bold;
  color: white;
  position: absolute;
  bottom: 60px;
  animation: my-shake 1.5s ease-out infinite;
  z-index: 15;
  cursor: pointer;
}

.page-container-wrap {
  background: rgb(255, 255, 255);
  position: relative;
  padding: 5px;
}

.page-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 0 20px 40px 20px;
  margin: 0 auto;
  flex-direction: row;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}

.recent-posts {
  width: 70%;
  order: 1;
  /* 默认顺序，文章列表在左侧 */
}

/* 以my-animation-开头的class */
[class*="my-animation-"] {
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

.my-animation-hideToShow {
  animation-name: hideToShow;
}

/* 显示 */
@keyframes hideToShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.recent-post-item:not(:last-child) {
  margin-bottom: 40px;
}

.recent-post-item {
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: row;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  animation: hideToShow 1s ease-in-out;
}

/* 背景位置移动 */
@keyframes gradientBG {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}

.card-content {
  height: 100px;
  background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea) !important;
  background-size: 400% 400% !important;
  animation: gradientBG 10s ease infinite !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
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

.recent-post-item-image {
  width: 50%;
  height: 100%;
}

.recent-post-item-image img.el-image__inner {
  transition: all 1s;
}

.recent-post-item-image img.el-image__inner:hover {
  transform: scale(1.2);
}

.leftImage {
  position: absolute;
  left: 0;
}

.rightImage {
  position: absolute;
  right: 0;
  text-align: right;
}

.recent-post-item-post {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 35px;
}

.recent-post-item-post h3 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.post-meta {
  font-size: 12px;
  color: #797979;
}

.post-meta span:not(:last-child) {
  margin-right: 10px;
}

.recent-post-desc {
  font-size: 15px;
  line-height: 1.7;
  /* 超出4行就... */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.leftImage .sort-label {
  position: absolute;
  bottom: 20px;
}

.rightImage .sort-label {
  position: absolute;
  bottom: 20px;
  right: 35px;
}

.sort-label span {
  padding: 3px 10px;
  background-color: #eeeeee;
  border-radius: 3px;
  font-size: 14px;
  color: #797979;
  transition: all 0.3s;
  cursor: pointer;
  user-select: none;
}

.sort-label span:hover {
  background-color: orange;
  color: white;
}

.pagination-wrap1 {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 40px;
}

.aside-content {
  width: calc(30% - 40px);
  user-select: none;
  /* 设置距离顶部的距离 */
  margin-top: -800px;
  margin-right: 40px;
  max-width: 300px;
  float: right;
  padding: 0;
  /* 可以设置一个合适的 z-index */
  /* z-index: 1000; */
  order: 2;
  /* 默认顺序，侧边栏在右侧 */
}

.ais-SearchBox-input {
  padding: 0 14px;
  height: 30px;
  width: calc(100% - 50px);
  outline: 0;
  border: 2px solid #39c5bb;
  border-right: 0;
  border-radius: 40px 0 0 40px;
  color: #595a5a;
  background: white;
}

.ais-SearchBox-submit {
  height: 30px;
  width: 50px;
  border: 2px solid #39c5bb;
  border-left: 0;
  border-radius: 0 40px 40px 0;
  background: white;
  cursor: pointer;
}

.recommend-title {
  margin-bottom: 5px;
}

.title:hover {
  color: #39c5bb !important;
}

.info {
  /* 超出2行就... */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@media screen and (max-width: 700px) {
  .recent-post-item {
    height: 450px;
    position: unset;
    display: block;
    flex-direction: unset;
  }

  .recent-post-item-image {
    width: 100%;
    height: 200px;
  }

  .leftImage {
    position: unset;
    left: unset;
  }

  .rightImage {
    position: unset;
    right: unset;
    text-align: unset;
  }

  .recent-post-item-post {
    width: 100%;
    height: 250px;
    position: relative;
  }

  .recent-post-desc {
    -webkit-line-clamp: 3;
  }

  .leftImage .sort-label {
    position: absolute;
    bottom: 20px;
  }

  .rightImage .sort-label {
    position: absolute;
    bottom: 20px;
    right: unset;
  }
}

@media screen and (max-width: 1100px) {
  .recent-posts {
    width: 100%;
  }

  .page-container {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {

  .page-container {
    /* 文章栏与侧标栏垂直排列 */
    flex-direction: column;
  }

  .recent-posts {
    order: 2;
    /* 移动端顺序，文章列表在下 */
  }

  .aside-content {
    width: 100%;
    max-width: unset;
    float: unset;
    margin: 30px auto 0;
    order: 1;
    /* 移动端顺序，侧边栏在上 */
  }
}
</style>
