const cmdb = {
  // Homey: () => import('@views/Applatform.vue'),
  // App4: () => import('@/views/PlatformOverview.vue'),
  // Applatformaa: () => import('@views/Applatformaa.vue'),
  // App5: () => import('@/views/App5.vue'),
  dynamicTable: () => import('@/views/table/dynamicTable.vue'),
  EditableTable: () => import('@/views/table/dragTable.vue'),
  Nestedpage: () => import('@/views/nestedpage/index.vue'),
  ScriptEditor: () => import('@/views/editor')
}
export default cmdb