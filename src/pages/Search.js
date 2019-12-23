import React, { Component } from 'react'
import API_URL from '../config'

import banner_1 from '../img/carosel_1.jpg'
import { Parallax } from 'react-parallax'
import { Row, Col, Card, Button } from 'react-bootstrap'

import Link from 'react-router-dom/Link'

import SearchBar from '../component/SearchBar'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SearchResult:[],
            limit: 9
        }
    }

    getURL=(searchBarData)=>{
        this.props.history.push('/Search/'+searchBarData)
        window.location.reload();
    }

    
    componentDidMount(){
        const {searchQuery} = this.props.match.params
        fetch(API_URL,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req : "search",
                search_query : searchQuery,
                limit : this.state.limit
            })
        })
        .then(response => response.json())
        .then(responseJson => { 
            if(responseJson.status){
                this.setState({ SearchResult: responseJson.data }) 
                console.log(responseJson)
            }else{
                alert("Data tidak ditemukan");
            }
        });
    }
    
    renderList(item){
        let units = item;
        let listSearch = units.map(unit => 
    
            <div className="col-lg-4 col-6 my-2">
            <Link  to={{
              pathname:  '/Detail/' + unit.id_kost + '/' + unit.nama_kost,
              state: {items_id: unit.id_kost} ,
            }}>
                <Card className="border-0 shadow-sm h-100" key={unit.index}>
                  <Card.Img variant="top" src={banner_1} alt="{unit.nama_kost}" /> 
                  <Card.Body className="text-dark">
                      <div className="h6">{unit.nama_kost}</div>
                      <div className="h6 font-weight-light">{unit.lokasi}</div>
                  </Card.Body>
                </Card>
              </Link >
            </div>
            );
        return (
            <Row>
                {listSearch}
            </Row>
        );
    }      

    render() {
        
        const {searchQuery} = this.props.match.params
        return (
            <div>
                <Parallax
                bgImage={require('../img/home_banner.jpg')}
                bgImageAlt="Home Banner"
                strength={50}
                >
                    <div className="d-flex" style={{ height: '180px'}}>
                        <div className="container my-auto">
                            <SearchBar parentCallback = {this.getURL}/>
                        </div>
                    </div>
                </Parallax>
                
                <div className="container-fluid p-4">
                    <div className="d-flex justify-content-center">

                    </div>
                    <div className="row">
                        <div className="col-lg-2 col-12">
                            
                        </div>
                        <div className="col-lg-8 col-12">
                            <div className="row">
                            
                            {this.renderList(this.state.SearchResult)}

                            </div>

                        </div>
                        <div className="col-lg-2 col-12">
                            <div className="p-2 m-2 " >
                            <a href="https://pbn.roomme.id/"><img className="img-fluid w-100 h-100"
                            src="https://kostroomme.com/wp-content/uploads/2019/11/Aplikasi-Roomme.jpg" 
                            title="pbn.roomme.id" alt="pbn.roomme.id"/></a>

                            <a href="https://pbn.roomme.id/"><img 
                            src="https://via.placeholder.com/300" className="img-fluid w-100 h-100"/></a>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        );
    }
}

export default Search;
