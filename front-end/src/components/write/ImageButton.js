import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import { Button, makeStyles, ButtonGroup } from "@material-ui/core";
import styles from "../../styles/ImageButton.module.css";

const EditImage = styled.img`
  position: relative;
  top: 0;
  left: 0;
  float: left;
  padding-bottom: 2rem;
  z-index: -999;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ImageButton = ({ urlhandler }) => {
  const [pictures, setPictures] = useState([]);

  const onDrop = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setPictures(imageList);
    urlhandler(imageList);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <ImageUploading
        multiple
        value={pictures}
        onChange={onDrop}
        maxNumber="64"
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          dragProps,
        }) => (
          // write your building UI
          <div className={classes.root}>
            <ButtonGroup className = {styles.Button}>
              <Button
                color="primary"
                onClick={onImageUpload}
                {...dragProps}
              >
                Add Image
              </Button>
              &nbsp;
              <Button
                onClick={onImageRemoveAll}
                color="secondary"
              >
                Remove image
              </Button>
            </ButtonGroup>
            {imageList.map((image, index) => (
              <div key={index}>
                <EditImage src={image.data_url} alt="" />
                <div>
                  <Button onClick={() => onImageUpdate(index)}>
                    Change Image
                  </Button>
                  &nbsp;
                  <Button onClick={() => onImageRemove(index)}>
                    Remove Image
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </React.Fragment>
  );
};

export default ImageButton;
