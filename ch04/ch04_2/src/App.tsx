import UseOrCreateTest from './pages/UseOrCreateTest'
import Memo from './pages/Memo'
import Callback from './pages/Callback'
import HighOrderCallback from './pages/HighOrderCallback'

export default function App() {
  return (
    <main>
      <h1 className="bg-blue-500 text-5xl text-center p-3">useMemo, useCallback</h1>
      <div className="mockup-window border-base-300 border">
        <div className="border-base-300 flex justify-center border-t px-4 py-16">
          <ol>
            <li>
              리액트 훅은 함수. 함수 안에서 선언한 변수의 유효범위는 함수 안
              따라서 함수 범위를 벗어난 변수는 소멸
            </li>
            <li>
              소멸되지 않게 상태 값을 가지고, 상태(State)는 변수의 유효범위와 무관
            </li>
            <li>
              함수 컴포넌트는 '함수'이므로 블록 범위로 인해 상태를 가질 수 없다
              함수 범위 밖에 변수 선언 시 소멸 없이 지속
              {/*
              const global = 1 // 번역 변수
                export default function UseOrCreat(){
                  return <p>{global}</>
                }
                 */} 
            </li>
            <li>캐시를 사용, 전역 변수 구현 가능</li>
          </ol>
        </div>
      </div>
      <HighOrderCallback />
      <Callback />
      <Memo />
      <UseOrCreateTest />
    </main>
  )
}
