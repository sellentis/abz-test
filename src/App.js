import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Form from "./components/Form";
import Cards from "./components/Cards";


function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <About/>
        <Cards/>
        <Form/>
      </main>
    </>
  );
}

export default App;
