import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import About from "./components/About";
import Form from "./components/Form";
import Cards from "./components/Cards";
import axios from "axios";


function App() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(6)
  const [isPageLast, setIsPageLast] = useState(false)


  const fetchData = (page, count) => {
    axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      params: {
        page: page,
        count: count
      }
    }).then(response => {
      setIsPageLast(!!response.data.links.next_url)
      setPage(prev => prev + 1)
      setUsers(prev => [...prev, ...response.data.users])
    })
  }

  useEffect(() => {
    fetchData(page, 6)
  }, [])

  const loadMore = () => {
    fetchData(page, count)
  }
  return (
    <>
      <Header/>
      <main className="main">
        <About/>
        <Cards users={users} isPageLast={isPageLast} loadMore={loadMore}/>
        <Form setUsers={setUsers} fetchData={fetchData} setPage={setPage}/>
      </main>
    </>
  );
}

export default App;
