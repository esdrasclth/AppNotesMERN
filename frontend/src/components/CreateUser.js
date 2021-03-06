import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }

    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users)
    }

    getUsers = async () => {
        const res = await axios.get('https://api-notes-applications.herokuapp.com/api/users');
        this.setState({ users: res.data });
    }

    onChangeUserName = (e) => {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('https://api-notes-applications.herokuapp.com/api/users', {
            username: this.state.username
        })
        this.setState({username:''});
        this.getUsers();
    }

    deleteUser = async (id) => {
        await axios.delete('https://api-notes-applications.herokuapp.com/api/users/' + id);
        this.getUsers();
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className="form-control" 
                                value={this.state.username}
                                onChange={this.onChangeUserName} />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(users => (
                                <li 
                                    className="list-group-item list-group-item-action" 
                                    key={users._id}
                                    onDoubleClick={() => this.deleteUser(users._id)}
                                    >
                                    {users.username}
                                </li>))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
