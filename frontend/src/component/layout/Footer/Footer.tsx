import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"
const Footer = () => {
    return (
        <>
            <footer id="footer">
                <div className="leftFooter">
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download App for Android and IOS</p>
                    <img src={playStore} alt="playstore" />
                    <img src={appStore} alt="appstore" />

                </div>
                <div className="midFooter">
                    <h1>ECOMMERCE.</h1>
                    <p>High Quality is our first priority</p>
                    <p>Copyrights 2021 &copy; Amansh</p>
                </div>
                <div className="rightFooter">
                    <a href="https://www.youtube.com/"><i className="fab fa-youtube">Youtube</i></a>
                    <a href="https://instagram.com/"><i className="fab fa-instagram">Insta</i></a>
                    <a href="https://twitter.com/"><i className="fab fa-twitter">Twitter</i></a>
                </div>
            </footer>

        </>
    )
}

export default Footer