import * as Sentry from '@sentry/react'
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// Apps
import { ToastContainer } from 'react-toastify'
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with dark styles to enable dark mode
 *
 * import './_metronic/assets/sass/style.dark.scss'
 *
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 * */
import 'react-toastify/dist/ReactToastify.css'
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/sass/style.scss'
import { AuthProvider, setupAxios } from './app/modules/auth'
import { AppRoutes } from './app/routing/AppRoutes'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */

/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)

Chart.register(...registerables)

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 0.1, // Tracing is enabled for 10% of requests
  // Session Replay
  replaysSessionSampleRate: 0.05, // This sets the sample rate at 5%
  replaysOnErrorSampleRate: 1.0, // The sample rate of 100% when sampling sessions where errors
  environment: process.env.REACT_APP_ENV,
})

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <MetronicI18nProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MetronicI18nProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById('root')
)
