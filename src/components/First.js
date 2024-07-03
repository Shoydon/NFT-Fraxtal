import React from 'react';
import Ar from '../assests/Ar.svg';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { TonConnectButton } from '@tonconnect/ui-react';

function First({ loading }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return (
        <div className="text-white flex flex-col md:flex-row justify-around items-center pt-15 min-h-screen bg-gray-900">
            <div className="mb-16 max-w-xl">
                <h1 className="font-semibold text-5xl mb-8">
                    Create and Watch Video <br />
                    <span className="font-thin text-sky-400">Video NFTs</span>
                </h1>
                <Slider {...settings}>
                    <div className="text-xl font-thin">
                        <span className='text-sky-400 font-bold'>Welcome to VideoTron </span>– the premier platform for digital artistry and innovation in the world of Video NFTs. Dive into an immersive experience where creativity meets blockchain technology, enabling artists and collectors alike to create, showcase, and watch unique video masterpieces.
                    </div>
                    <div className="text-xl font-thin">
                        <span className='text-sky-400 font-bold'>Create:</span> With our intuitive tools, transform your videos into one-of-a-kind NFTs. Whether it’s a captivating animation, a breathtaking short film, or an engaging motion graphic, your content is minted with a unique digital signature, ensuring authenticity and ownership.
                    </div>
                    <div className="text-xl font-thin">
                        <span className='text-sky-400 font-bold'>Watch:</span>  Explore a diverse gallery of Video NFTs created by talented artists from around the globe. Experience art in motion like never before, with each piece telling its own story and bringing a new perspective to the digital canvas.
                    </div>
                    <div className="text-xl font-thin">
                        <span className='text-sky-400 font-bold'>Connect:</span> Join a community of visionary creators and enthusiastic collectors. Participate in discussions, collaborate on projects, and be at the forefront of the Video NFT movement.
                    </div>
                    <div className="text-xl font-thin">
                        <span className='text-sky-400 font-bold'>VideoTron</span>   is more than a platform; it’s a revolution in the digital art space. Unleash your creativity, discover extraordinary art, and be part of the future of video expression today.
                    </div>
                </Slider>
            </div>
            <div>
                <img src={Ar} alt="AR Illustration" className="h-[490px]" />
            </div>
        </div>
    );
};

export default First;