import {useOrCreate} from './UseOrCreate'
import * as D from '../data'
import {Title, Avatar} from '../components'

export default function UseOrCreate() {
  // 전역 변수를 이용, 캐쉬 기능 구현
  // prettier-ignore
  const headTexts = useOrCreate<string[]>('headTexts', () => [
    'NO.',
    'Name',
    'Job Title',
    'Email Adress'
  ])

  const users = useOrCreate<D.IUser[]>('users', () =>
    D.makeArray(10).map(D.makeRandomUser)
  )

  const head = useOrCreate('head', () =>
    headTexts.map(text => <th key={text}>{text}</th>)
  )

  const body = useOrCreate('children', () =>
    users.map((user, index) => (
      <tr key={user.uuid}>
        <th>{index + 1}</th>
        <td className="flex items-center">
          <Avatar src={user.avatar} size="1.5rem" />
          <p className="ml-2">{user.name}</p>
        </td>
        <td>{user.jobTitle}</td>
        <td>{user.email}</td>
      </tr>
    ))
  )
  return (
    <div className="mt-4">
      <Title>전역변수를 활용한 캐시 구현</Title>
      <div className="overflow-x-auto mt-4 p-4"></div>
      {/*<table className="table table-zebra table-compact w-full>">*/}
      <table className="table table-s table-comapct w-full">
        <thead>
          <tr>{head}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  )
}
