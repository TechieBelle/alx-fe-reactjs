import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage.jsx";
import Header from "./components/Header.jsx";
import MainContent from "./components/Maincontent.jsx";
import Footer from "./components/Footer.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Counter from "./components/Counter.jsx";

function App() {
  const bio = "Software engineer with a passion for travel and technology.";
    return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
        <UserProfile name="Belle" age="28" bio={bio} />
        <Counter />
    </>
  );
}

export default App;
