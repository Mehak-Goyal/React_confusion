import React, { Component } from "react";

import { Control, LocalForm, Errors } from "react-redux-form";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                  --{comment.author} ,{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <div>
          <CommentForm></CommentForm>
        </div>
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
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr></hr>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish}></RenderDish>
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments}></RenderComments>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log("current state is : " + JSON.stringify(values));
    alert("current state is : " + JSON.stringify(values));
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          outline
          onClick={this.toggleModal}
          isOpen={this.state.isModalOpen}
        >
          <span className="fa fa-pencil fa-lg"></span>Submit Comment
        </Button>
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(values) => this.handleSubmit(values)}
                isOpen={this.state.isModalOpen}
                toggle={this.toggleModal}
              >
                <Row className="form-group">
                  <Label htmlFor="firstname" md={2}>
                    Rating
                  </Label>
                  <Col md={{ size: 10 }}>
                    <Control.select
                      model=".Rating"
                      name="Rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="firstname" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".firstname"
                      id="firstname"
                      name="firstname"
                      placeholder="First Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    ></Control.text>
                    <Errors
                      className="text-danger"
                      model=".firstname"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or Less",
                      }}
                    ></Errors>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="comment" md={2}>
                    Comment
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      row="6"
                      className="form-control"
                    ></Control.textarea>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
export default DishDetail;
