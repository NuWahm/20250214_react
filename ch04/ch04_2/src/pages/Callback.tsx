import {useCallback, useMemo} from 'react'
import {Title} from '../components'
import {Button} from '../theme/daisyui'
import * as D from '../data'

export default function CopyMe() {
  // const onClick = () => alert('button clicked')
  // 위는 일반 함수를 캐시(전역선언) Rerendering 때마다 다시 호출되어 비효율적
  
  const onClick = useCallback(() => alert('button clicked'), [])
  // 일반 함수를 useCallback함으로 Performance에서 효율적
  
  const buttons = useMemo(
    () =>
      D.makeArray(3)
        .map(D.randomName)
        .map((name, index) => (
          <Button key={index} onClick={onClick} className="btn-primary btn-wide btn-xs">
            <span className="text-white">{name}</span>
          </Button>
        )),
    [onClick]
  )

  return (
    <div>
      <Title>useCallback Hook을 활용, 함수를 캐시하는 기능 구현</Title>
      <div className="flex justify-evenly mt-4">{buttons}</div>
    </div>
  )
}
