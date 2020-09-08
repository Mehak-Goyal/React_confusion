import React from "react";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <card>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments }) {
  if (comments != null) {
    let list = comments.map((comments) => {
      let date = comments.date;
      return (
        <li key={comments.id}>
          <div>
            <p>{comments.comment}</p>
            <p>
              --{comments.author} ,{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comments.date)))}
            </p>
          </div>
        </li>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{list}</ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  return props.dish ? (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish}></RenderDish>
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.dish.comments}></RenderComments>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default DishDetail;
