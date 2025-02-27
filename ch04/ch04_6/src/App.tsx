import ResponsiveContextTest from './pages/ResponsiveContextTest'
import {ResponsiveProvider} from './contexts'

export default function App() {
  return (
    // 모든 Context 제공자는 가장 최상위 Component로 동작해야한다는 
    <ResponsiveProvider>
      <main>
        <ResponsiveContextTest />
      </main>
    </ResponsiveProvider>
  )
}
