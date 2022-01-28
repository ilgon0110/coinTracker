import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import { ChartProps } from "./Chart";
import styled from "styled-components";

interface IPrice {
  quotes: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}
const Wrapper = styled.div`
  text-align: center;
`;
const Title = styled.h1`
  font-size: 24px;
  padding-bottom: 10px;
`;
const Change = styled.h2`
  padding-bottom: 4px;
`;
const High = styled.h2`
  padding-top: 4px;
  padding-bottom: 4px;
`;
function Price({ coinId }: ChartProps) {
  const { data, isLoading } = useQuery<IPrice>(["coinprices", coinId], () =>
    fetchCoinTickers(coinId)
  );
  console.log(data);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper>
      <Title>{`Price: ${data?.quotes.USD.price.toFixed(1)}$`}</Title>
      <Change>{`Percent change in one day: ${data?.quotes.USD.percent_change_24h}%`}</Change>
      <Change>{`Percent change in one week: ${data?.quotes.USD.percent_change_7d}%`}</Change>
      <Change>{`Percent change in one month: ${data?.quotes.USD.percent_change_30d}%`}</Change>
      <Change>{`Percent change in one year: ${data?.quotes.USD.percent_change_1y}%`}</Change>
      <High>{`The highest price: ${data?.quotes.USD.ath_price.toFixed(
        1
      )}$`}</High>
      <High>{`The highest price day: ${data?.quotes.USD.ath_date.slice(
        0,
        10
      )}`}</High>
    </Wrapper>
  );
}

export default Price;
