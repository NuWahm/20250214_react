import FetchTest from './pages/FetchTest'
import WindowResizeTest from './pages/WindowResizeTest'
import ClassLifecycle from './pages/ClassLifecycle'

function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-5xl text-center p-3 text-white">
        생명주기와 관련이 있는 useEffect, useLayoutEffect Hook
      </h1>
      <FetchTest />
      <WindowResizeTest />
      <ClassLifecycle />
    </main>
  )
}

export default App
