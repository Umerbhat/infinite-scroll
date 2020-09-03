import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useFetch from './hooks/useFetch'
import ListItem from './component/Item'
import List from './component/List';
import { QuestionItem } from './common/types';
import Modal from './component/Modal';
import Placeholder from './component/Item/placeholder';
import { PAGE_SIZE, BASE_URL, ORDER, SORT, SITE } from './common/constants'
import onScrollEnd from './utils/onScrollEnd';


function App() {
  const [requestPageNumber, setRequestPageNumber] = useState<number>(1)
  const [activeQuestion, setActiveQuestion] = useState<QuestionItem | null>(null)
  const [totalQuestions, setTotalQuestions] = useState<QuestionItem[]>([])

  const requestUrl = useMemo(() => {
    return `${BASE_URL}page=${requestPageNumber}&pagesize=${PAGE_SIZE}&order=${ORDER}&sort=${SORT}&site=${SITE}`
  }, [requestPageNumber])

  const [response, isLoading, error] = useFetch(requestUrl)

  useEffect(() => {
    if (response && response.items) {
      setTotalQuestions(items => [...items, ...response.items])
    }
  }, [response])

  useEffect(() => {
    onScrollEnd(function () {
      setRequestPageNumber(pageNum => pageNum + 1)
    })
  }, [])

  const onItemClick = useCallback((e, item) => {
    setActiveQuestion(item)
  }, [])

  const handleClose = useCallback((e) => {
    setActiveQuestion(null)
  }, [])


  return (
    <div className="App">
      <List>
        {error && <h3 className="text-center">{error}</h3>}
        {totalQuestions.map((item: QuestionItem, i) => {
          return <ListItem item={item} onItemClick={onItemClick} key={i} />
        })}
        {isLoading && new Array(PAGE_SIZE).fill("").map((_, i) => <Placeholder key={i} />)}
      </List>
      {activeQuestion && <Modal heading="Details" onClose={handleClose}>
        <h5> <span dangerouslySetInnerHTML={{ __html: activeQuestion.title }}></span> <a className="ml-auto" href={activeQuestion.link}>View details</a></h5>
      </Modal>}
    </div>
  );
}

export default App;
