<script>
export default {
  beforeCreate () {
    this.$router.push(this.$route.query.path)
  },
  render: function (h) {
    return h();
  }
}
</script>
