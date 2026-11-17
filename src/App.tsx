import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion } from 'framer-motion'
import { CountryProvider } from '@/context/CountryProvider'
import { ChatProvider } from '@/context/ChatProvider'
import { ScrollProvider } from '@/context/ScrollProvider'
import Layout from '@/components/layout/Layout'

// framer-motion features load on demand (see src/lib/motionFeatures.ts)
const loadFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={loadFeatures} strict>
      <BrowserRouter>
        <CountryProvider>
          <ChatProvider>
            <ScrollProvider>
              <Layout />
            </ScrollProvider>
          </ChatProvider>
        </CountryProvider>
      </BrowserRouter>
      </LazyMotion>
    </HelmetProvider>
  )
}
