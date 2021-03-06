import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('https://api-notes-applications.herokuapp.com/api/users');
        this.setState({
            users: res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        if (this.props.match.params.id) {
            const res = await axios.get('https://api-notes-applications.herokuapp.com/api/notes/' + this.props.match.params.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            author: this.state.userSelected,
            content: this.state.content,
            date: this.state.date
        };
        if (this.state.editing) {
            await axios.put('https://api-notes-applications.herokuapp.com/api/notes/' + this.state._id, newNote);
        } else {
            await axios.post('https://api-notes-applications.herokuapp.com/api/notes', newNote);
        }
        window.location.href = '/';
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({date});
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>

                    {/*Select User*/}
                    <div className="form-group">
                        <select 
                            className="form-control" 
                            name="userSelected"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                        >
                            {
                              this.state.users.map(user =>  
                              <option key={user} value={user}>
                                  {user}
                              </option>)  
                            }
                        </select>
                    </div>

                    <div className="form-group mt-3" >
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Title" 
                            name="title"
                            onChange={this.onInputChange}
                            value={this.state.title}
                            required/>
                    </div>

                    <div className="form-group mt-3">
                        <textarea 
                            name="content"
                            className="form-control"
                            placeholder="Content"
                            onChange={this.onInputChange}
                            value={this.state.content}
                            required>

                        </textarea>
                    </div>

                    <div className="form-group mt-3">
                        <DatePicker 
                            className="form-control"
                            selected={this.state.date}
                            onChange={this.onChangeDate} />
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary mt-3">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
