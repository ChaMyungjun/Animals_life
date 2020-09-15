import React, { useState } from "react";
import { Button, Divider } from "@material-ui/core";
import styled from "styled-components";
import AskRemoveModal from "./AskRemoveModal";

const PostActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const PostActionButtons = ({ onRemove, onPublish, onEdit }) => {

  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  
  const onCancel = () => {
    setModal(false);
  };
  
  const onConfirm = (e) => {
    e.preventDefault()
    setModal(false);
    onRemove();
  };

  return (
    <React.Fragment>
      <PostActionButtonsBlock>
        <Divider light={true} flexItem={true} />
        <Button onClick={onEdit}>
          수정
        </Button>
        <Button onClick={onRemoveClick}>삭제</Button>
      </PostActionButtonsBlock>
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </React.Fragment>
  );
};

export default PostActionButtons;
