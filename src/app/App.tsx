import { Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { AddPostForm } from "pages/add-post-form";
import { Home } from "pages/home";
import { PostList } from "pages/post-list/ui";
import { Header } from "widgets/header";
import { store } from "./store";

import "antd/dist/reset.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header />
        <main className="container p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-post-form" element={<AddPostForm />} />
            <Route path="/post-list" element={<PostList />} />
          </Routes>
        </main>
      </Provider>
    </div>
  );
}

export default App;
