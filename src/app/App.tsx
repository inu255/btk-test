import { Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { New } from "pages/new";
import { Home } from "pages/home";
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
            <Route path="/new" element={<New />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
      </Provider>
    </div>
  );
}

export default App;
