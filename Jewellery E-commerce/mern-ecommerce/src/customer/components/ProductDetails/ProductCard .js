import React, { useState, useEffect } from 'react';
import './productStyle.css'; // Import CSS file
import $ from 'jquery';
const ProductCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        // Your jQuery code here
        $('#carousel ul').css('left', '0'); // Example usage
    }, []); // Empty dependency array ensures this effect runs only once

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    


    return (
        <body>
            <div id="make-3D-space">
                <div id="product-card" className={isFlipped ? 'animate' : ''}>
                    <div id="product-front">
                        <div className="shadow"></div>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt.png" alt="" />
                        <div className="image_overlay"></div>
                        <div id="view_details">View details</div>
                        <div className="stats">
                            <div className="stats-container">
                                <span className="product_price">$39</span>
                                <span className="product_name">Adidas Originals</span>
                                <p>Men's running shirt</p>

                                <div className="product-options">
                                    <strong>SIZES</strong>
                                    <span>XS, S, M, L, XL, XXL</span>
                                    <strong>COLORS</strong>
                                    <div className="colors">
                                        <div className="c-blue"><span></span></div>
                                        <div className="c-red"><span></span></div>
                                        <div className="c-white"><span></span></div>
                                        <div className="c-green"><span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="product-back">
                        <div className="shadow"></div>
                        <div id="carousel">
                            <ul>
                                <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large3.png" alt="sdhfgjghkhhk" /></li>
                                <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large3.png" alt="" /></li>
                                <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large.png" alt="" /></li>
                                <li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large2.png" alt="" /></li>



                            </ul>
                            <div className="arrows-perspective">
                                <div className="carouselPrev">
                                    <div className="y"></div>
                                    <div className="x"></div>
                                </div>
                                <div className="carouselNext">
                                    <div className="y"></div>
                                    <div className="x"></div>
                                </div>
                            </div>
                        </div>
                        <div id="flip-back" onClick={handleFlip}>
                            <div id="cy"></div>
                            <div id="cx"></div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};



$(document).ready(function () {

    // Lift card and show stats on Mouseover
    $('#product-card').hover(function () {
        $(this).addClass('animate');
        $('div.carouselNext, div.carouselPrev').addClass('visible');
    }, function () {
        $(this).removeClass('animate');
        $('div.carouselNext, div.carouselPrev').removeClass('visible');
    });

    // Flip card to the back side
    $('#view_details').click(function () {
        $('div.carouselNext, div.carouselPrev').removeClass('visible');
        $('#product-card').addClass('flip-10');
        setTimeout(function () {
            $('#product-card').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo(80, 1, function () {
                $('#product-front, #product-front div.shadow').hide();
            });
        }, 50);

        setTimeout(function () {
            $('#product-card').removeClass('flip90').addClass('flip190');
            $('#product-back').show().find('div.shadow').show().fadeTo(90, 0);
            setTimeout(function () {
                $('#product-card').removeClass('flip190').addClass('flip180').find('div.shadow').hide();
                setTimeout(function () {
                    $('#product-card').css('transition', '100ms ease-out');
                    $('#cx, #cy').addClass('s1');
                    setTimeout(function () { $('#cx, #cy').addClass('s2'); }, 100);
                    setTimeout(function () { $('#cx, #cy').addClass('s3'); }, 200);
                    $('div.carouselNext, div.carouselPrev').addClass('visible');
                }, 100);
            }, 100);
        }, 150);
    });

    // Flip card back to the front side
    $('#flip-back').click(function () {

        $('#product-card').removeClass('flip180').addClass('flip190');
        setTimeout(function () {
            $('#product-card').removeClass('flip190').addClass('flip90');

            $('#product-back div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
                $('#product-back, #product-back div.shadow').hide();
                $('#product-front, #product-front div.shadow').show();
            });
        }, 50);

        setTimeout(function () {
            $('#product-card').removeClass('flip90').addClass('flip-10');
            $('#product-front div.shadow').show().fadeTo(100, 0);
            setTimeout(function () {
                $('#product-front div.shadow').hide();
                $('#product-card').removeClass('flip-10').css('transition', '100ms ease-out');
                $('#cx, #cy').removeClass('s1 s2 s3');
            }, 100);
        }, 150);

    });


    /* ----  Image Gallery Carousel   ---- */

    var carousel = $('#carousel ul');
    var carouselSlideWidth = 335;
    var carouselWidth = 0;
    var isAnimating = false;

    // building the width of the casousel
    $('#carousel li').each(function () {
        carouselWidth += carouselSlideWidth;
    });
    $(carousel).css('width', carouselWidth);

    // Load Next Image
    $('div.carouselNext').on('click', function () {
        var currentLeft = Math.abs(parseInt($(carousel).css("left")));
        var newLeft = currentLeft + carouselSlideWidth;
        if (newLeft == carouselWidth || isAnimating === true) { return; }
        $('#carousel ul').css({
            'left': "-" + newLeft + "px",
            "transition": "300ms ease-out"
        });
        isAnimating = true;
        setTimeout(function () { isAnimating = false; }, 300);
    });

    // Load Previous Image
    $('div.carouselPrev').on('click', function () {
        var currentLeft = Math.abs(parseInt($(carousel).css("left")));
        var newLeft = currentLeft - carouselSlideWidth;
        if (newLeft < 0 || isAnimating === true) { return; }
        $('#carousel ul').css({
            'left': "-" + newLeft + "px",
            "transition": "300ms ease-out"
        });
        isAnimating = true;
        setTimeout(function () { isAnimating = false; }, 300);
    });
});

export default ProductCard;