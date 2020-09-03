import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useFetch from './hooks/useFetch'
import ListItem from './component/Item'
import List from './component/List';
import { QuestionItem } from './common/types';
import Modal from './component/Modal';
import Placeholder from './component/Item/placeholder';

const PAGE_SIZE = 20
const BASE_URL = "https://api.stackexchange.com/2.2/questions?"
const ORDER = "desc"
const SORT = "activity"
const SITE = "stackoverflow"

function onScrollThreshold(callback: () => void) {
  const elm = document.querySelector('html') || { scrollHeight: 0, scrollTop: 0, clientHeight: 0 }
  document.addEventListener('scroll', function () {
    var scrollHeight = elm.scrollHeight;
    var scrollTop = elm.scrollTop;
    var clientHeight = elm.clientHeight;
    console.log(scrollHeight, scrollTop, clientHeight, "tytyt")

    if (scrollHeight - scrollTop === clientHeight) {
      callback()
    }
  })
}

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [activeItem, setActiveItem] = useState<QuestionItem | null>(null)
  const [totalLoadedItems, setTotalLoadedItems] = useState<QuestionItem[]>([])

  const url = useMemo(() => {
    return `${BASE_URL}page=${currentPage}&pagesize=${PAGE_SIZE}&order=${ORDER}&sort=${SORT}&site=${SITE}`
  }, [currentPage])

  const [response, isLoading, error] = useFetch(url)

  useEffect(() => {
    response && response.items && setTotalLoadedItems(items => [...items, ...response.items])
  }, [response])

  const nextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
  }

  useEffect(() => {
    onScrollThreshold(nextPage)
  }, [])

  const onItemClick = useCallback((e, item) => {
    setActiveItem(item)
  }, [])
  const handleClose = useCallback((e) => {
    setActiveItem(null)
  }, [])


  return (
    <div className="App">
      <List>
        {error && <h3 className="text-center">{error}</h3>}
        {totalLoadedItems.map((item: QuestionItem, i) => {
          return <ListItem item={item} onItemClick={onItemClick} key={i} />
        })}
        {isLoading && new Array(PAGE_SIZE).fill("").map((_, i) => <Placeholder key={i} />)}
      </List>
      {activeItem && <Modal heading="Details" onClose={handleClose}>
        <h5> <span dangerouslySetInnerHTML={{ __html: activeItem.title }}></span> <a className="ml-auto" href={activeItem.link}>View details</a></h5>
      </Modal>}
    </div>
  );
}

export default App;
