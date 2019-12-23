import React, { Component } from 'react';
import API_URL from '../config'
import {whatsapp} from 'react-icons-kit/fa/whatsapp'
import { Icon } from 'react-icons-kit'
import CurrencyFormat from 'react-currency-format'

import banner_1 from '../img/carosel_1.jpg'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { any } from 'prop-types';

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unit: any,
            rooms: [],
            rooms_fas: [],
            fasilitas: []
        }
    }
    
    componentDidMount(){
        const {id} = this.props.match.params
        const {nama_kost} = this.props.match.params
        console.log(this.props);

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req: "detail",
                id_kost: id
            })
        }).then(response => response.json())
            .then(responseJson => {
                this.setState({data: responseJson.data})
                this.setState({unit: responseJson.data.unit})
                this.setState({rooms: responseJson.data.rooms})
                console.log(responseJson);
                
            }).catch((error) => {
                console.log(error)
            })
        
    }

    renderRooms(item){
        let rooms = item
        let roomType = rooms.map(room =>
            
            <Card bg="danger" text="light" className="border-0 p-3 my-2">
            <div className="row">
                <div className="col-lg-4">
                    <img
                    className="img d-block w-100 rounded"
                    src={banner_1}
                    alt={room.jenis_rm}
                    />
                </div>
                <div className="col-lg-4 p-4">
                    <div className="h5 ">{room.jenis_rm}</div>
                    <div className="h5 ">Fasilitas</div>
                        {room.fasilitas.map(fas => 
                            <div className="badge badge-light m-1 p-2">{fas}</div>
                        )}
                </div>
                <div className="col-lg-4 p-4">
                    <div className="h3 ">Rp.  
                    <CurrencyFormat value={room.harga} displayType={'text'} thousandSeparator={true} />
                     /Bulan</div>
                </div>
                <div className="w-100 pr-3 d-flex justify-content-end">
                    <Button className="" variant="light">Pesan Sekarang</Button>
                </div>
            </div>
        </Card>
        
        )
        return(
            <div>
                {roomType}
            </div>
        )

    }
    
    render() {

        
        return (
            <div>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <div className="h3">
                        </div>
                    </div>
                    <div className="col-lg-8 col-12">
                    <div className="card border-0 p-3 my-3 shadow">
                        <div className="row">
                            <div className="col-lg-7">
                                <Carousel className="detail_gambar shadow my-2" indicators={false} >
                                {carosel_item}
                                </Carousel>
                            </div>
                            <div className="col-lg-5">
                                <Card className="border-0 my-2 shadow">
                                    <Card.Header>
                                        <div>
                                            Informasi Kost
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                
                                            <div className="h5">{this.state.unit.nama_kost}</div>
                                            <div className="mb-4 h6 font-weight-light">{this.state.unit.lokasi}</div>
                                            <div className="my-2 h6 font-weight-light justify">{this.state.unit.deskripsi}</div>
                                        
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div>
                            <div className="h3 p-3">
                                Jenis Ruangan
                            </div>
                            
                            {this.renderRooms(this.state.rooms)}

                            
                            <div className="d-flex justify-content-center my-5">
                                <Button className="mx-2" variant="success">
                                <Icon className="mr-2" size={18} icon={whatsapp} />
                                    hubungi kami</Button>
                            </div>
                        </div>
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

var carosel_item = [];
  for (var i = 1; i <= 3; i++) {
    carosel_item.push(
      <Carousel.Item >
          <img
            className="img d-block w-100 rounded"
            src={banner_1}
            alt="First slide"
            />
          <Carousel.Caption>
            <div className="">
            </div>
          </Carousel.Caption>
        </Carousel.Item>
    );
  }

export default Detail;
