import React from 'react'
import Header from './Header';
import main from '../image/main.png';
import { withRouter } from 'react-router-dom';
import Webchat from './WebChat';


const Index = () => {
    const textStyle = {
        fontFamily: "Gill Sans",
        fontSize: "180%",
        color: "white",
       

      };
      const headerStyle = {
        fontFamily: "Gill Sans",
        fontSize: "250%",
        color: "white",
        fontWeight:"400"
      

      };
    return (
        <div>
            <Header />

            <section id="hero" className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                       
                        <div className="col-lg-4 order-2  hero-img"  >
                            <img src={main}  alt="text" />
                        </div>
                        <div className="col-lg-8 d-flex flex-column justify-content-center">
                           <b> <h2 style={textStyle}>"A country without a strong Air Force is at the mercy of any aggressor. Pakistan must build up her Air Force as quickly as possible. It must be an efficient Air Force, Second To None." - </h2></b><b><h2 style={headerStyle}>Quaid-e-Azam Muhammad Ali Jinnah</h2></b>
                        </div>
                    </div>
                </div>
            </section>

           
          
            <footer id="footer">
                <div className="container footer-bottom clearfix">
               
                    <div className="credits">
                        Designed and Developed by <b>Osama Ahmed Tahir</b>
                    </div>
                </div>
            </footer>
            <Webchat />

        </div>
    )
    
}

export default withRouter(Index);