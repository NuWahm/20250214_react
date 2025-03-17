import {SyntheticEvent, useCallback, useEffect, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import defaultImg from '../../assets/no-img.gif'
import {useToken} from '../../hooks'

interface MembersDTO {
  mid: number
  name: string
  nickname: string
  email: string
  mobile: string
}

interface JournalDTO {
  jno: number
  title: string
  content: string
  photosDTOList: {path: string}[]
  commentsCnt: number
  membersDTO: MembersDTO
  likes: number
  regDate: string
  modDate: string
}
interface PageRequestDTO {
  page: string
  size: string
  type: string
  keyword: string
}

export function Modify() {
  const token = useToken()
  const navigate = useNavigate()
  const [journalDTO, setJournalDTO] = useState<JournalDTO | null>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 주소의 쿼리를 받기 위한 선언
  const [query] = useSearchParams()
  let compare = query.get('page')
  const page = compare === 'null' || compare == null ? '1' : compare
  compare = query.get('type')
  const type = compare === 'null' || compare == null ? '' : compare
  compare = query.get('keyword')
  const keyword = compare === 'null' || compare == null ? '' : compare
  compare = query.get('jno')
  const jno = compare === 'null' || compare == null ? '' : compare

  // 기존 게시글 정보 로드
  useEffect(() => {
    const queryParams = []
    if (page) queryParams.push(`page=${page}`)
    if (type) queryParams.push(`type=${type}`)
    if (keyword) queryParams.push(`keyword=${keyword}`)

    let url = `http://localhost:8080/apiserver/journal/modify/${jno}`
    if (queryParams.length > 0) url += '?' + queryParams.join('&')

    if (token && jno) {
      fetch(url, {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`}
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then(data => {
          setJournalDTO(data.journalDTO)
          setTitle(data.journalDTO.title)
          setContent(data.journalDTO.content)
        })
        .catch(err => console.log('Error:', err))
    }
  }, [jno, token])

  const transDateFormat = useCallback((d: string) => {
    const date = new Date(Date.parse(d ?? ''))
    return (
      [
        date.getFullYear(),
        padTwoDigits(date.getMonth() + 1),
        padTwoDigits(date.getDate())
      ].join('-') +
      ' ' +
      [
        padTwoDigits(date.getHours()),
        padTwoDigits(date.getMinutes()),
        padTwoDigits(date.getSeconds())
      ].join(':')
    )
  }, [])

  function padTwoDigits(num: number) {
    return num.toString().padStart(2, '0')
  }

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImg
  }

  // [1] Post 페이지로 돌아가기 (수정 완료 후)
  const goPost = (jno: string, page: string, type: string, keyword: string) => {
    navigate(`/post?jno=${jno}&page=${page}&type=${type}&keyword=${keyword}`)
  }

  // [2] 수정 요청 함수
  const modifyData = {
    journalDTO: {
      jno: journalDTO?.jno,
      title,
      content: content,
      membersDTO: {
        mid: journalDTO?.membersDTO?.mid ?? 1
      }
    },
    pageRequestDTO: {
      page,
      type,
      keyword
    }
  }

  const handleModify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('http://localhost:8080/apiserver/journal/modify', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(modifyData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('수정 완료:', result)

    // 수정 후 원하는 동작 (Post 페이지로 이동)
    goPost(String(journalDTO?.jno), page, type, keyword)
  }

  return (
    <>
      <header
        className="masthead"
        style={{backgroundImage: `url('assets/img/home-bg.jpg')`}}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Modify Your Journal</h1>
                <h2 className="subheading">This is your journal. You can modify it.</h2>
                <span className="meta">
                  Posted by <a href="#!">Start Journal</a> on August 24, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {/* onSubmit으로 handleModify 호출 */}
              <form id="frmSend" onSubmit={handleModify}>
                <div className="form-group">
                  <label>Jno</label>
                  <input
                    type="text"
                    value={journalDTO?.jno || ''}
                    name="jno"
                    className="form-control"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <div
                    className="invalid-feedback"
                    data-sb-feedback="title:required"></div>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div style={{marginBottom: '30px'}}>
                  <label>Likes</label>
                  <input
                    type="text"
                    name="likes"
                    readOnly
                    className="form-control"
                    value={journalDTO?.likes ?? 0}
                  />
                </div>
                <div className="form-group">
                  <label>RegDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO?.regDate ?? '')}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>ModDate</label>
                  <input
                    type="text"
                    className="form-control"
                    value={transDateFormat(journalDTO?.modDate ?? '')}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input type="hidden" name="page" value={page} />
                  <input type="hidden" name="type" value={type} />
                  <input type="hidden" name="keyword" value={keyword} />
                  <button type="submit" className="btn btn-primary btnModi p-2">
                    Modify
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btnBack p-2"
                    onClick={() => {
                      // 목록으로 돌아가는 버튼
                      navigate(`/list?page=${page}&type=${type}&keyword=${keyword}`, {
                        replace: true
                      })
                    }}>
                    Back
                  </button>
                </div>
              </form>
              <div className="uploadResult">
                <ul>
                  {journalDTO?.photosDTOList.map((photosDTO, idx) => (
                    <li
                      key={idx}
                      data-file="${photosDTO.getThumbnailURL}"
                      style={{cursor: 'pointer'}}>
                      {photosDTO.path == null ? (
                        <img
                          key={idx}
                          src={defaultImg}
                          style={{display: 'inline-block', marginRight: '20px'}}
                          alt="Feed Thumbnail"
                        />
                      ) : (
                        <img
                          key={idx}
                          src={`http://localhost:8080/apiserver/display?fileName=${photosDTO.thumbnailURL}`}
                          style={{display: 'inline-block', marginRight: '20px'}}
                          alt="Feed Thumbnail"
                          onError={addDefaultImg}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="list-group comments-list"
                style={{marginBottom: '50px'}}></div>
              <div
                className="modal fade"
                id="myModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
