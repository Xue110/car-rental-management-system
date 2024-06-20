<template>
  <div class="core-technology">
    <h2>我们的技术栈</h2>
    <ul>
      <li v-for="technology in technologies" :key="technology.id">
        <h3>
          <i :class="technology.icon" :aria-label="technology.title"></i>
          {{ technology.title }}
        </h3>
        <p>{{ technology.description }}</p>
        <div class="tags">
          <span v-for="(tag, index) in technology.tags" :key="index" :style="{ backgroundColor: tag.color }">{{ tag.name
            }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CoreTechnology',
  data() {
    return {
      technologies: [
        {
          id: 1,
          title: 'Vue.js',
          description: 'Vue.js是一套用于构建用户界面的渐进式JavaScript框架。',
          tags: [
            { name: '前端', color: '#42b983' },
            { name: 'MVVM', color: '#68a063' },
            { name: '响应式', color: '#409eff' }
          ],
          icon: 'fab fa-vuejs'
        },
        {
          id: 2,
          title: 'Node.js',
          description:
            'Node.js是一个基于Chrome V8引擎的JavaScript运行环境，可用于构建高性能的网络应用程序。',
          tags: [
            { name: '后端', color: '#68a063' },
            { name: 'JavaScript', color: '#409eff' },
            { name: '非阻塞IO', color: '#fbbc05' }
          ],
          icon: 'fab fa-node'
        },
        {
          id: 3,
          title: 'Element UI',
          description: 'Element UI是一套基于Vue.js的桌面端UI库。',
          tags: [
            { name: '前端', color: '#42b983' },
            { name: 'UI组件', color: '#409eff' },
            { name: '响应式设计', color: '#fbbc05' }
          ],
          icon: 'fas fa-cubes'
        },
        {
          id: 4,
          title: 'Spring Boot',
          description: 'Spring Boot是一个用于简化Java应用程序开发的框架。',
          tags: [
            { name: '后端', color: '#68a063' },
            { name: 'Java', color: '#fbbc05' },
            { name: '快速开发', color: '#ea4335' }
          ],
          icon: 'fab fa-java'
        },
        {
          id: 5,
          title: 'MySQL',
          description: 'MySQL是一个开源的关系型数据库管理系统。',
          tags: [
            { name: '数据库', color: '#ea4335' },
            { name: 'SQL', color: '#409eff' },
            { name: '可扩展性', color: '#fbbc05' }
          ],
          icon: 'fas fa-database'
        }
      ]
    }
  }
}
</script>

<style scoped>
.core-technology {
  margin: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 32px;
  margin-bottom: 24px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 30px;
}

h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

p {
  font-size: 16px;
  margin-bottom: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tags span {
  font-size: 14px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  color: #fff;
}
</style>
