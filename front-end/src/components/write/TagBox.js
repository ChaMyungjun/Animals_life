import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

const TagBoxBlock = styled.div`
  width: 100%;
  border-top: 1px solid #eeeeee;
  padding-top: 2rem;
  h4 {
    color: #424242;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const TagForm = styled.form`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  width: 280px;
  border: 1px solid #212121;
  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
  }
  button {
    cursor: pointer;
    padding-right: 1rem;
    padding-left: 1rem;
    border: none;
    background: #424242;
    color: white;
    font-weight: bold;
    & :hover {
      background: #757575;
    }
  }
`;

const Tag = styled.div`
  margin-right: 0.5rem;
  color: #757575;
  cursor: pointer;
  & :hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

//memo를 사용하여 tag값 바뀔 때 마다 리렌더링
const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState("");
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return; //공백이라면 추가하지 않음
      if (localTags.includes(tag)) return alert("이미 존재 하는 Tag입니다"); //이미 존재할 시 추가하지 않음
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );
  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);
  
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim()); //앞 뒤 공백을 없앤 후 등록
      setInput(""); //input 초기화
    },
    [input, insertTag]
  );

  //tag값이 바뀔 때 마다
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input
          placeholder="태그를 추가하세요"
          value={input}
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
