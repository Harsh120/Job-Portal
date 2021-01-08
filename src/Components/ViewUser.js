import React, { Component } from 'react';
import {
    Button,
    Modal,
    Badge,
    Card
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { ShortlistUser, RejectUser } from "./../action/userActions";
import PropTypes from 'prop-types';

class ViewUser extends Component {
    state = {
        modal: false,
        id: this.props.id,
        image:this.props.image,
        name: this.props.name,
        status: this.props.status
    };

    static propTypes = {
        ShortlistUser: PropTypes.func.isRequired,
        RejectUser: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onUpdateClickShortlist = () => {

        this.props.ShortlistUser(this.props.id);

        this.toggle();
    }

    onUpdateClickReject = () => {

        this.props.RejectUser(this.props.id);

        this.toggle();
    }

    renderSwitch(param) {
        switch (param) {
            case "Shortlisted":
                return "success";
            case "Rejected":
                return "danger";
            default:
                return "info";
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} variant="primary">View User</Button>

                <Modal
                 show={this.state.modal}
                 toggle={this.toggle}
                 >
                <Modal.Header toggle={this.toggle}>User Details</Modal.Header>
                     <Modal.Body>
                     <Card>
                    <Card.Img variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            <Badge variant={this.renderSwitch(this.props.status)}>
                            {this.props.status}
                            </Badge>
                            <Button variant="dark" onClick={this.toggle} style={{float: 'right', marginTop: '2rem', marginRight: '0.5rem'}}>Close</Button>
                                    <Button variant="danger" onClick={this.onUpdateClickReject} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Reject
                                    </Button>
                                    <Button variant="success" onClick={this.onUpdateClickShortlist} style={{float: 'right', marginTop: '2rem', marginRight: '1rem'}}>
                                            Shortlist
                                    </Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                     </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default connect(null, { ShortlistUser, RejectUser })(ViewUser);