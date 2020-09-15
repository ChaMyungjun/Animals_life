import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import styles from "../../styles/subInfo.module.css";

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}

  color: #757575;

  span + span:before {
    color: #bdbdbd;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: "\\B7";
  }
`;

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
          <Link to={`/@${username}`} className={styles.subInfoUsername}>
            {username}
          </Link>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
