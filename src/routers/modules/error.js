const error = {
  error401: () => import('../../views/error-page/401.vue'),
  error404: () => import('../../views/error-page/404.vue')
}

export default error