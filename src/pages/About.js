import React, { Component } from 'react';

import { Parallax } from 'react-parallax'

class About extends Component {
    render() {
        return (
            <div>
                <Parallax
                    bgImage={require('../img/home_banner.jpg')}
                    bgImageAlt="Home Banner"
                    contentClassName="container py-5"
                    strength={500}
                >  
                <div className="row" style={{ height: '480px' }}>
                    <div className="col-lg-12">
                    <div className="card p-3 border-0 shadow">
                        <div className="h4 mx-auto my-3">Cari Kost Dimana?</div>
                        <div className="my-3">
                        <p class="text-justify">-- adalah website informasi yang berisikan informasi mengenai kosan didaerah Jakarta, segala bentuk informasi yang ada pada website ini diambil dari berbagai sumber dan merupakan hak cipta dari masing-masing pemilik. Kami tidak bertanggung jawab atas perubahan yang dilakukan oleh website-website terkait.</p>
                        </div>
                    </div>
                    </div>
                </div>
                </Parallax>
            </div>
        );
    }
}

export default About;
