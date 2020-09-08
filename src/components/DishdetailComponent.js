import React, { Component } from "react";
import { Card, CardImg, CardBody, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  formatDate({ date }) {
    return new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  renderDish(dish) {
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

  renderComments(comments) {
    if (comments != null) {
      let list = comments.map((comments) => {
        let date = comments.date;
        return (
          <li key={comments.id}>
            <div>
              <p>{comments.comment}</p>
              <p>
                --{comments.author} , {this.formatDate({ date })}
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
  render() {
    const { dishSelect } = this.props;
    return dishSelect ? (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(dishSelect)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(dishSelect.comments)}
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
export default DishDetail;
