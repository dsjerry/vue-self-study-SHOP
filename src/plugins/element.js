import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
// 这个比较特殊，要这样挂载到vue实例上 $message 名字可以随便写
