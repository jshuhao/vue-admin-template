<template>
  <a-upload name="file"
            :multiple="false"
            :action="action"
            :headers="headers"
            @change="handleChange">
    <a-button :loading="loading"> <a-icon type="upload" /> 点击上传</a-button>
  </a-upload>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    },
  },
  data () {
    return {
      fileList: [],
      loading: false,
      headers: {
        authorization: 'authorization-text',
      },
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        console.log(info.file, info.fileList);
      }
      console.log('info', info)
      if (info.file.status === 'done') {
        this.$emit('get-url', info.response.data.key)
        this.$message.success(`${info.file.name} file uploaded successfully`);
        this.loading = false
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
        this.loading = false
      }
    },
  }
}
</script>

<style scoped lang="less">
/deep/.ant-upload-list-item-info {
  display: none;
}
/deep/.ant-upload-list {
  display: none;
}
</style>