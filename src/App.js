import Pages from './pages/Pages';
import Category from './components/Category';
import { BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './images/delicieux-logo.png'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <img src={logo} width='60px' />
          <Logo to={'/'}>Delicieux</Logo>
          <Search />
        </Nav>

        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Pacifico', cursive;
  background: linear-gradient(to right, #231557 0%, #FF1361 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg{
    font-size: 2rem;
  }
`;


export default App;
