import React from 'react'

import error404 from '../img/404.png'
import { Parallax } from 'react-parallax'


import Button from 'react-bootstrap/Button'
import Link from 'react-router-dom/Link'
import { Icon } from 'react-icons-kit'
import {arrowCircleLeft} from 'react-icons-kit/fa/arrowCircleLeft'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }

    onclickHandle() {
      this.props.history.replace('/')
      window.location.reload()
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
            <div>
              <div className="d-flex align-items-center" style={{
                height:"700px",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${error404})`,
              }} >
                <div className="container d-flex justify-content-center py-5">
                  <div className="text-center">
                    <div className="h1" >404</div>
                    <div className="" >Your Requested page Not Found</div>
                    <div className="my-3">

                        <Button onclick={this.onclickHandle} className="" variant="light">
                          Back to Home</Button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
      }
  
      return this.props.children; 
    }
  }