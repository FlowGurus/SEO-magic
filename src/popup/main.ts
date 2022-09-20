import { createApp } from 'vue'
import Toast, { PluginOptions } from 'vue-toastification'
import App from './Popup.vue'
import '../styles'

// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.mount('#app')

const options: PluginOptions = {
  // You can set your default options here
}

app.use(Toast, options)
