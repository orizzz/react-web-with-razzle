import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-router-dom/NavLink';
import API_URL from '../config'

import '../css/App.css';

import { Icon } from 'react-icons-kit'
import {facebookSquare} from 'react-icons-kit/fa/facebookSquare'
import {twitterSquare} from 'react-icons-kit/fa/twitterSquare'
import {instagram} from 'react-icons-kit/fa/instagram'


class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lokasi_jakarta:[],
            lokasi_other:[]
        }
    }

    componentDidMount(){
        //fetch jakarta
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req : "location",
                spesifik : "jakarta"
            })
        })
        .then(response => response.json())
        .then(responseJson => { 
            if(responseJson.status){
                this.setState({ lokasi_jakarta: responseJson.data }) 
                console.log(responseJson)
            }else{
                alert("ERROR");
            }
        });
        //fetch other than jakarta
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req : "location",
                exclude : "jakarta"
            })
        })
        .then(response => response.json())
        .then(responseJson => { 
            if(responseJson.status){
                this.setState({ lokasi_other: responseJson.data }) 
                console.log(responseJson)
            }else{
                alert("ERROR");
            }
        });
    }

    render() {
        return (
        <div id="footerView">
            <div className="container py-3 d-flex">
                <Nav justify className="flex-column mx-auto">
                    <div className="h5 text-light">kost di jakarta</div>
                {this.state.lokasi_jakarta.map(lokasi => 
                    <NavLink className="p-1 text-lowercase" to={'/Search/'+lokasi.kategori}>{lokasi.kategori}</NavLink>
                )}
                </Nav>
                <Nav justify className="flex-column mx-auto">
                    <div className="h5 text-light">lokasi favorit</div>
                {this.state.lokasi_other.map(lokasi => 
                    <NavLink className="p-1 text-lowercase" to={'/Search/'+lokasi.kategori}>{lokasi.kategori}</NavLink>
                )}
                </Nav>
                <Nav className="flex-column ml-auto">
                    <div className="h5 text-light">Sosial Media</div>
                    <Nav.Link href="#"><Icon className="text-white mx-auto" size={24} icon={facebookSquare} /> </Nav.Link>
                    <Nav.Link href="#"><Icon className="text-white mx-auto" size={24} icon={twitterSquare} /> </Nav.Link>
                    <Nav.Link href="#"><Icon className="text-white mx-auto" size={24} icon={instagram} /> </Nav.Link>
                </Nav>
            </div>
        </div>
        );
    }
}

export default Footer;
