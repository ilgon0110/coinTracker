import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loading = styled.div`
  font-size: 24px;
  margin: 0 auto;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        {/* <button onClick={toggleDarkAtom}>
          {darkAtom ? "Toggle WhiteMode" : "Toggle DarkMode"}
        </button> */}
      </Header>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="Coin's image"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
