import Vue from 'vue'
import Meta from 'vue-meta'
import App from '@/App'
import Element from 'element-ui'

import config from '@/config'
import store from '@/services/store'
import router from '@/services/routes'
import displayMessage from '@/services/mixins/displayMessage'
import settings from '@/services/mixins/settings'
import locale from 'element-ui/lib/locale/lang/en'
import '@/style/app.scss'

Vue.use(Meta)
Vue.use(Element, { locale })
Vue.mixin(displayMessage)
Vue.mixin(settings)

Vue.config.productionTip = false
Vue.prototype.$config = config

new Vue({
	store,
    router,
    render: h => h(App)
}).$mount('#app')
