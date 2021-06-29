import React, { MouseEventHandler } from "react";
import { Button } from "react-bootstrap";

interface IProps {
  heading: string;
  buttonTitle?: string;
  handleAddClick?: MouseEventHandler<HTMLElement>;
}

const Title = (props: IProps) => {
  return (
    <div className="titleWrapper">
      <p className="title">{props.heading}</p>
      {props.buttonTitle && props.buttonTitle.length > 0 && (
        <Button onClick={props.handleAddClick} variant="primary">
          {props.buttonTitle}
        </Button>
      )}
    </div>
  );
};

export default Title;
