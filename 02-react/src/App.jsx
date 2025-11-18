import { Header } from "./components/TheHeader.jsx";
import { Footer } from "./components/TheFooter.jsx";

import { HomePage } from "./pages/Home.jsx";
import { SearchPage } from "./pages/Search.jsx";
import { Route } from "./components/Route.jsx";

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Footer />
    </>
  );
}

export default App;
