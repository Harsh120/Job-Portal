import React, { Component } from 'react';
import { 
    Container,
    Badge,
    Card,
    Row,
    Col,
    Tabs,
    Tab,
    Form
} from 'react-bootstrap';
import { loadUser } from '../action/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Shortlisted from './Shortlisted';
import Rejected from './Rejected';
import ViewUser from './ViewUser';

class Home extends Component {
    state = {
      search: ''
    }

    updateSearch= event => {
      this.setState({
          search: event.target.value.substr(0,20)
      });
  }

    componentDidMount() {
        this.props.loadUser();
    }

    static propTypes = {
        loadUser: PropTypes.func.isRequired,
        user: PropTypes.array.isRequired,
        error: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

  render() {
    let filteredUsersByStatus = this.props.user.filter(
      (user) => {
          return user.status === "No Action"
      }
    );
    
    let filteredUsers = filteredUsersByStatus.filter(
      (user) => {
        return user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )

  if (this.props.error!=null) {
    return <div>Error: {this.props.error}</div>;
  } else if (this.props.isLoading) {
    return <div>Loading...</div>;
  } else {
    
    return (
        <Container>
            <Form style={{padding: '1rem'}}>
            <Form.Row>
              <Form.Control type="search" placeholder="Search by name..." value={this.state.search} onChange={this.updateSearch}/>
            </Form.Row>
          </Form>
            <Tabs defaultActiveKey="home">
                <Tab eventKey="home" title="Home">
                <Row>
                  { Object.keys(filteredUsers).length === 0
                    ? <h1 paddingTop="1rem">No User available</h1>
                    :
                filteredUsers.map(user => (
                    <Col md="3" style={{paddingTop: "2rem"}}>
                <Card key={user.id}>
                    <Card.Img className="card-img-top" variant="top" src={user.Image} />
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            <Badge pill variant="info">
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
                ))
                }
                </Row>
                </Tab>
        <Tab eventKey="Shortlisted" title="Shortlisted">
          <Shortlisted 
            search={this.state.search}
            />
        </Tab>
        <Tab eventKey="Rejected" title="Rejected">
        <Rejected
          search={this.state.search}
        />
        </Tab>
      </Tabs>
      </Container>
    );

  }
}
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    error: state.user.error_msg,
    isLoading: state.user.isLoading,
    isLoaded: state.user.isLoaded,
})

export default connect(mapStateToProps, { loadUser })(Home);