import React, { Component } from 'react';
import { 
    Container,
    Badge,
    Card,
    Row,
    Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewUser from './ViewUser';

class Rejected extends Component {
    
    static propTypes = {
        user: PropTypes.array.isRequired
    }

  render() {
    
    let filteredUsersByStatus = this.props.user.filter(
      (user) => {
          return user.status === "Rejected"
      }
  );

  let filteredUsers = filteredUsersByStatus.filter(
    (user) => {
      return user.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
    }
  )
    return (
        <Container>
                <Row>
                { Object.keys(filteredUsers).length === 0
                    ? <h1 paddingTop="1rem">No user rejected</h1>
                    :
                filteredUsers.map(user => (
                    <Col md="3" style={{paddingTop: "2rem"}}>
                <Card key={user.id}>
                    <Card.Img className="card-img-top" variant="top" src={user.Image} />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            <Badge pill variant="danger">
                            {user.status}
                            </Badge>
                        </Card.Text>
                    <ViewUser 
                    id={user.id}
                    name={user.name}
                    image={user.Image}
                    status={user.status}
                    />
                    </Card.Body>
                </Card>
                </Col>
                ))}
                </Row>
          </Container>
    );
}
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps, {  })(Rejected);