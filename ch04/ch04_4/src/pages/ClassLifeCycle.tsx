// 컴포넌트가 생성되고 렌더링되다가 어떤 시점에 소멸되는 과정을 컴포넌트의 생명주기라고 한다.
import {Component} from 'react'
import {Title} from '../components'

export default class ClassLifecycle extends Component {
  // 클래스 컴포넌트에서 상태는 항상 state라는 이름의 멤버 속성으로 구현
  // 타입스크립트 3.0 부터 추가된 unknown : any와 마찬가지로 모든 타입에 값이 할당

  state = {
    today: new Date(),
    // 타입검사를 할 때 애매한 타입 요소들을 직접 명시해 주는 키워드 as
    intervalId: null as unknown as ReturnType<typeof setInterval>
  }
  // componentDidMount()는 클래스 컴포넌트가 마운트되는 시점에 호출
  componentDidMount() {
    const duration = 1000
    // setState()는 컴포넌트의 state 객체에 대한 업데이트를 실행
    const intervalId = setInterval(() => this.setState({today: new Date()}), duration)
    console.log('type: ', typeof setInterval)
    this.setState({intervalId}) // {intervalId: intervalId} 저장하는 변수의 이름이 같을 때 이름을 생략
  }
  // componentWillUnmount()는 클래스 컴포넌트가 언마운트 발생 직전 실행 :: setInterval로 인한 메모리 누수 방지
  componentWillUnmount() {
    clearInterval(this.state?.intervalId)
  }
  render() {
    const today = new Date()
    return (
      <section className="mt-4">
        <Title>ClassLifecycle</Title>
        <div className="flex flex-col items-center mt-4">
          <p className="font-mono text-3xl">{today.toLocaleDateString()}</p>
          <p className="font-mono text-3xl">{today.toLocaleTimeString()}</p>
        </div>
      </section>
    )
  }
}
