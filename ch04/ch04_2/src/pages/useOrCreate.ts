// any의 특징 : 모든 타입 허용, 타입 체크 기능이 비활성, 모든 연산에 오류 발생 x
// 주의 : 타입스크립트를 사용하는 취지에 부합 x, 예상치 못한 오류 발생 가능
// any, 꼭 필요한 경우에만 사용. 정확한 타입 지정 우선

// cache라는 변수를 함수 밖에서 선언, 전역변수화 하여 캐쉬처럼 사용
// React는 cache로 선ㅇ너된 전역 변수를 탐지 하기 어려움
const cache: Record<string, any> = {}

export const useOrCreate = function <T>(key: string, callback: () => T): T {
  if (!cache[key]) cache[key] = callback()
  return cache[key] as T
}