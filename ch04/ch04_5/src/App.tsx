import ClickTest from './pages/ClickTest'
import FileDrop from './pages/FileDrop'
import InputFocusTest from './pages/InputFocusTest'
import InputValueTest from './pages/InputValueTest'
import ForwardRefTest from './pages/ForwardRefTest'
import ValidatableInputTest from './pages/ValidatableInputTest'

function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-white text-5xl text-center p-3">
        ref라는 속성에 적용하는 값을 만들어 주는 훅 useRef, useImperativeHandle
      </h1>
      <ValidatableInputTest />
      <ForwardRefTest />
      <InputValueTest />
      <InputFocusTest />
      <FileDrop />
      <ClickTest />
    </main>
  )
}

export default App
