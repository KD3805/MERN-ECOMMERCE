import React from 'react'

const Footer = () => {
  return (
    <div className="footer bg-black text-white px-10">
        {/* <!-- footer section starts --> */}

        <footer class="footer_widgets footer_black">
            <div class="container">
                <div class="footer_top">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <div class="widgets_container contact_us">
                                <h3>About Gayatri</h3>
                                <div class="footer_contact">
                                    <p>Address : Gayatri palace, Surat, Gujarat</p>
                                    <p>Phone : <a href="tel:(+91)888888885555">(+91)888888885555</a></p>
                                    <p>Email : gayatrijewlers@gmail.com</p>
                                    <ul>
                                        <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa-solid fa-rss"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-google-plus-g"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                            <div class="widgets_container widget_menu">
                                <h3>Information</h3>
                                <div class="footer_menu">
                                    <ul>
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Contact</a></li>
                                        <li><a href="#">Services</a></li>
                                        <li><a href="#">Collection</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 col-sm-5 col-6">
                            <div class="widgets_container widget_menu">
                                <h3>My Account</h3>
                                <div class="footer_menu">
                                    <ul>
                                        <li><a href="#">My Account</a></li>
                                        <li><a href="#">Contact</a></li>
                                        <li><a href="#">Wishlist</a></li>
                                        <li><a href="#">Portfolio</a></li>
                                        <li><a href="#">Checkout</a></li>
                                        <li><a href="#">Frequently Questions</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-7">
                            <div class="widgets_container product_widget">
                                {/* <h3>Top Rated Products</h3> */}
                                <div class="simple_product">

                                    {/* <img src="assets/images/banner/gayatri_eng.jpg" className='py-3 mx-5' width={350} alt="" /> */}
                                    <div class="simple_product_items">
                                        <div class="simple_product_thumb">
                                            <a href="#"><img src="assets/images/product/38.jpg" alt="" /></a>
                                        </div>
                                        <div class="simple_product_content">
                                            <div class="tag_cate">
                                                <a href="#">Women,</a>
                                                <a href="#">Earrings</a>
                                            </div>
                                            <div class="product_name">
                                                <h3><a href="#">Bracelet</a></h3>
                                            </div>
                                            <div class="product_price">
                                                <span class="old_price">Rs. 45612.54</span>
                                                <span class="current_price">Rs. 41612.54</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="simple_product_items">
                                        <div class="simple_product_thumb">
                                            <a href="#"><img src="assets/images/product/48.jpg" alt="" /></a>
                                        </div>
                                        <div class="simple_product_content">
                                            <div class="tag_cate">
                                                <a href="#">Women,</a>
                                                <a href="#">Earrings</a>
                                            </div>
                                            <div class="product_name">
                                                <h3><a href="#">Ring</a></h3>
                                            </div>
                                            <div class="product_price">
                                                <span class="old_price">Rs. 75612.54</span>
                                                <span class="current_price">Rs. 71612.54</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer_bottom">
                    <div class="row">
                        <div class="col-12">
                            <div class="copyright_area">
                                <p>Copyright &copy; 2020 <a href="#">Gayatri</a> All rights Reserved.</p>
                                <img src="images/icon/papyel2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>

    {/* <!-- footer section ends --> */}

    {/* <!-- modal section starts --> */}

    <div class="modal fade" id="modal_box" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal_body">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-12">
                                <div class="modal_tab">
                                    <div class="tab-content product-details-large">
                                        <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                                            <div class="modal_tab_img">
                                                <a href="#"><img src="images/product/70.jpg" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="tab2" role="tabpanel">
                                            <div class="modal_tab_img">
                                                <a href="#"><img src="images/product/71.jpg" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="tab3" role="tabpanel">
                                            <div class="modal_tab_img">
                                                <a href="#"><img src="images/product/72.jpg" alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="tab4" role="tabpanel">
                                            <div class="modal_tab_img">
                                                <a href="#"><img src="images/product/73.jpg" alt="" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal_tab_button">
                                        <ul class="nav product_navactive owl-carousel" role="tablist">
                                            <li>
                                                <a href="#tab1" class="nav-link active" data-toggle="tab" role="tab"
                                                    aria-controls="tab1" aria-selected="false"><img
                                                        src="images/product/70.jpg" alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#tab2" class="nav-link" data-toggle="tab" role="tab"
                                                    aria-controls="tab2" aria-selected="false"><img
                                                        src="images/product/71.jpg" alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#tab3" class="nav-link button_three" data-toggle="tab"
                                                    role="tab" aria-controls="tab3" aria-selected="false"><img
                                                        src="images/product/72.jpg" alt="" /></a>
                                            </li>
                                            <li>
                                                <a href="#tab4" class="nav-link" data-toggle="tab" role="tab"
                                                    aria-controls="tab4" aria-selected="false"><img
                                                        src="images/product/73.jpg" alt="" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-12">
                                <div class="modal_right">
                                    <div class="modal_title mb-10">
                                        <h2>Women's Necklace</h2>
                                    </div>
                                    <div class="modal_price mb-10">
                                        <span class="new_price">Rs. 51164</span>
                                        <span class="old_price">Rs. 54164</span>
                                    </div>
                                    <div class="see_all">
                                        <a href="#">See All Features</a>
                                    </div>
                                    <div class="modal_add_to_cart mb-15">
                                        <form action="#">
                                            <input type="number" min="0" max="100" step="1" />
                                            <button type="submit">Add To Cart</button>
                                        </form>
                                    </div>
                                    <div class="modal_description mb-15">
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus quibusdam
                                            nisi voluptas consequatur tempora, recusandae nemo blanditiis eaque odit
                                            voluptatibus voluptatem, ipsa incidunt fugiat a.</p>
                                    </div>
                                    <div class="modal_social">
                                        <h2>Share this Product</h2>
                                        <ul>
                                            <li><a href="#"><i class="ion-social-facebook"></i></a></li>
                                            <li><a href="#"><i class="ion-social-twitter"></i></a></li>
                                            <li><a href="#"><i class="ion-social-rss"></i></a></li>
                                            <li><a href="#"><i class="ion-social-googleplus"></i></a></li>
                                            <li><a href="#"><i class="ion-social-youtube"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- modal section ends --> */}
    </div>
  )
}

export default Footer
