import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }

    onChangeUserName = (e) => {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form>
                            <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                onChange={this.onChangeUserName} />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(users => (
                                <li className="list-group-item list-group-item-action" key={users._id}>
                                    {users.username}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
