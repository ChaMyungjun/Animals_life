import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import styled from "styled-components";
import Responsive from "../common/Responsive";
import "quill/dist/quill.bubble.css";
import ImageButton from "../write/ImageButton";
import { Typography } from "@material-ui/core";

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor .ql-blank::before {
    left: 0px;
  }
`;

const Editor = ({ title, body, image, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [urlData, setUrlData] = useState([]);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: 2 }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "orderd" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });

    //quill에 text-change 이벤트 적용
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "body", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };

  const onChnageUrl = (e) => {
    const data = e;
    if (data.length === 0) {
      return <Typography>이미지가 없습니다</Typography>;
    }
    onChangeField({ key: "image", value: data[0].data_url });
    setUrlData(data[0].data_url);
  };

  return (
    <EditorBlock>
      <Typography>이미지는 한개만 저장이 됩니다</Typography>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
      <ImageButton urlhandler={onChnageUrl} />
    </EditorBlock>
  );
};

export default Editor;
