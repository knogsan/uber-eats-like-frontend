import React, { Fragment, useReducer, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

// components
import { Skeleton } from '@mui/material'
import { LocalMallIcon } from '../components/Icons';

// apis
import { fetchRestaurants } from '../apis/restaurants';

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../reducers/restaurants';

// constants
import { REQUEST_STATE } from '../constants';
import { COLORS } from '../style_constants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';

// styles
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const RestaurantsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

const ContentTitleWrapper = styled.div`
  text-align: center;
  padding: 8px 32px;
  margin-bottom: 32px;
`

const ContentTitle = styled.h2`
  position: relative;
  font-size: 26px;
  text-align: center;
  border-bottom: 5px solid #dddddd;
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 5px;
    background-color: #387ccc;
  }
`

const LinkWrapper = styled.div`
  text-align: center;
  margin-bottom: 100px;
`

export const Top = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
      .then((data) =>
        dispatch({
          type: restaurantsActionTypes.FETCH_SUCCESS,
          payload: {
            restaurants: data.restaurants
          }
        })
      )
  }, [])

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      <ContentTitleWrapper>
        <ContentTitle>レストラン一覧</ContentTitle>
      </ContentTitleWrapper>
      <RestaurantsContentsList>
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
          :
            state.restaurantsList.map((item, index) =>
              <Link to={`/restaurants/${item.id}/foods`} key={index} style={{ textDecoration: 'none' }}>
                <RestaurantsContentWrapper>
                  <RestaurantsImageNode src={RestaurantImage} />
                  <MainText>{item.name}</MainText>
                  <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
                </RestaurantsContentWrapper>
              </Link>
            )
        }
      </RestaurantsContentsList>
      <LinkWrapper>
        <Link to="/restaurants">一覧を見る</Link>
      </LinkWrapper>
    </Fragment>
  )
}
