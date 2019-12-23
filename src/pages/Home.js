import React, {Component} from 'react'
import API_URL from '../config'

import {Helmet} from "react-helmet"
import banner_1 from '../img/carosel_1.jpg'
import wifi from '../img/facility/wifi.png'
import ac from '../img/facility/ac.png'
import service from '../img/facility/24.png'
import parking from '../img/facility/parking.png'
import shower from '../img/facility/shower.png'
import furniture from '../img/facility/couch.png'
import like from '../img/facility/like.png'
import quality from '../img/facility/quality.png'
import pay from '../img/facility/pay.png'

import SearchBar from '../component/SearchBar';

import { Carousel, Row, Col, Card } from 'react-bootstrap';
import { Parallax } from 'react-parallax'
import Link from 'react-router-dom/Link'

  var carosel_item = [];
  for (var i = 1; i <= 3; i++) {
    carosel_item.push(
      <Carousel.Item>
          <img
            className="img d-block w-100 rounded"
            src={banner_1}
            alt="First slide"
            />
          <Carousel.Caption>
            <div className="p-2">
              <div className="h3">slide {i}</div>
              <div className="h6">Nulla vitae elit libero, a pharetra augue mollis interdum.</div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
    );
  }

  
  class Main extends Component{

    constructor(props) {
      super(props);

      this.state = {
          lokasi: [],
          rekomendasi:[],
          terbaru:[]
      }
      this.renderWilayah = this.renderWilayah.bind(this);
      this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    fetch(API_URL,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            req: "location"
        })
    })
    .then(response => response.json())
    .then(responseJson => { 
        if(responseJson.status){
            this.setState({ lokasi: responseJson.data }) 
        }else{
            alert("ERROR");
        }
    });
    fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req:"recommended",
                limit: 6
            })
    }).then(response => response.json())
    .then(responseJson => {
        if(responseJson.status){
            this.setState({rekomendasi: responseJson.data});
        }else{
            alert(responseJson.message);
        }
        console.log(this.state.rekomendasi);
        }).catch((error) => {
        console.log(error)
    });
    fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                req:"newest",
                limit: 6
            })
    }).then(response => response.json())
    .then(responseJson => {
        if(responseJson.status){
            this.setState({terbaru: responseJson.data});
        }else{
            alert(responseJson.message);
        }
        console.log(this.state.terbaru);
        }).catch((error) => {
        console.log(error)
    });
}

  getURL= (searchBarData)=>{
    this.props.history.push('/Search/'+searchBarData)
  }

  renderWilayah(){
    let wilayah = this.state.lokasi;
    let listWilayah = wilayah.map(kota => 
        <Col md={3} key={kota.id_cat}>
            <Link to={'/wilayah/'+kota.id_cat}>
                {/* <img src={require('../img/wilayah/'+kota.gambar)} style={{ width: '100%', height: '150px', borderRadius: '10px' }} alt={kota.gambar} /> */}
            </Link>
            <h5>{kota.kategori}</h5>
        </Col>
        );
    return (
        <Row>
            {listWilayah}
        </Row>
    );
}

renderList(item){
    let units = item;
    let listRekomendasi = units.map(unit => 

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
            {listRekomendasi}
        </Row>
    );
}
  
  render(){
    console.log(this.props)
    return(
        <div>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Webkosan - Sewa kosan jabodetabek</title>
                <link rel="canonical" href="/" />
          </Helmet>
        <Parallax
            bgImage={require('../img/home_banner.jpg')}
            bgImageAlt="Home Banner"
            contentClassName="container py-5"
            strength={500}
            >  
          <div className="row">
            <div className="col-lg-4">
              <div className="card p-3 border-0 shadow">
                <div className="h4 mx-auto mt-2">Cari Kost Dimana?</div>
                <div className="my-3">
                  <SearchBar parentCallback = {this.getURL}/>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card p-2 border-0 shadow">
                <Carousel indicators={false} >
                  {carosel_item}
                </Carousel>
              </div>
            </div>
          </div>
        </Parallax>
        <div className="container py-3 px-5">
          <div className="d-flex pt-5 pb-3">
            <div className="h3 font-weight-bold mx-auto my-auto">Kost Rekomendasi Kammi</div>
          </div>
            {this.renderList(this.state.rekomendasi)}
          <div className="d-flex pt-5 pb-3">
            <div className="h3 font-weight-bold mx-auto my-auto">Kost Pilihan kami</div>
          </div>
            {this.renderList(this.state.terbaru)}
        </div>
        <div className="container-fluid bg-white border-0 shadow">
          <Card className="p-3 border-0">
            <div className="h3 font-weight-bold mx-auto my-auto">Fasilitas Kami</div>
          </Card>
          <div className="container">

            <div className="row bg-white px-5 pb-5">
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={wifi} className="img-fluid" alt="" />
                  <div className="h5 text-center">Free Wifi</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={ac} className="img-fluid" alt="" />
                  <div className="h5 text-center">Full AC</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={service} className="img-fluid" alt="" />
                  <div className="h5 text-center">24 Jam</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={parking} className="img-fluid" alt="" />
                  <div className="h5 text-center">Parking Lot</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={shower} className="img-fluid" alt="" />
                  <div className="h5 text-center">Free Toiletry</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-6">
                <div className="p-1">
                  <img src={furniture} className="img-fluid" alt="" />
                  <div className="h5 text-center">Full Furniture</div>
                </div>
              </div>

          </div>
          
          </div>
        </div>       

            <Parallax
            blur={8}
            bgImage={require('../img/home_banner_2.jpg')}
            bgImageAlt="Home Banner"
            strength={500}
            
            >
              <div className="container">

              <div>
                <div className="text-light">
                  <div className="h1 text-center mt-4">Cari Kostmu di sini Sekarang</div>
                  <div className="row text-center p-5 mb-3">
                    <div className="col-4">
                      <img src={like} alt="" className="img-fluid"/>
                      <div className="h4 py-3">Kenyamanan Terjamin</div>
                    </div>
                    <div className="col-4">
                      <img src={quality} alt="" className="img-fluid"/>
                      <div className="h4 py-3">Kualitas Terbaik</div>
                    </div>
                    <div className="col-4">
                      <img src={pay} alt="" className="img-fluid"/>
                      <div className="h4 py-3">Pembayaran Mudah</div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </Parallax>

      </div>
    );
  }
}


export default Main