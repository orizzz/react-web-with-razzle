import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Link from 'react-router-dom/Link'
import { generatePath } from 'react-router';



export class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.props.parentCallback(this.state.value);
        event.preventDefault();
    }

    render() {

        return (
            <div>
                <Form className="mx-auto" onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            name="search"
                            placeholder="Cari yang lain?"
                            value={this.state.value} 
                            onChange={this.handleChange}
                            />
                        <InputGroup.Append>
                            <Button variant="dark" type="submit">Cari</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}

export default SearchBar;
