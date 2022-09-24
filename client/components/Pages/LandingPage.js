import React from "react";
import { Carousel } from "./Carousel";

export const LandingPage = () => {
  return (
    <div>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div>
            <p className="uppercase tracking-loose w-full">
              Food Delivery Service
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Order your favorite food in a hurry!
            </h1>
            <div className="w-fit">
              <img src="https://www.elluminatiinc.com/wp-content/uploads/2020/07/blog/fooddeliveryinsoutheastasia.jpg" />
            </div>
            <p className="leading-normal text-2xl mb-8">
              Don't wait to have your favorite meal! Order now with Fullstack
              Food Delivery!
            </p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <Carousel />

	  <div className="list-section pt-40 pb-40">
		<div className="container">

			<div className="row">
				<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
					<div className="list-box d-flex align-items-center">
						<div className="list-icon">
							<i className="fas fa-shipping-fast"></i>
						</div>
						<div className="content">
							{/* <img src="https://cdn.dribbble.com/users/5462907/screenshots/11960844/5_4x.png"
							width="200"
							height="200"
							/> */}
							<h3>Free Delivery</h3>
							<p>When ordering over $75</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
					<div className="list-box d-flex align-items-center">
						<div className="list-icon">
							<i className="fas fa-phone-volume"></i>
						</div>
						<div className="content">
							{/* <img src="https://www.citypng.com/public/uploads/preview/call-customer-service-support-247-orange-icon-transparent-png-21635328945py9bm1fm8f.png"
							width="200"
							height="200"
							/> */}
							<h3>24/7 Support</h3>
							<p>Get support all day</p>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="list-box d-flex justify-content-start align-items-center">
						<div className="list-icon">
							<i className="fas fa-sync"></i>
						</div>
						<div className="content">
							{/* <img src="https://cdn.iconscout.com/icon/free/png-256/refund-3132162-2606390.png"
							width="200"
							height="200"
							/> */}
							<h3>Refund</h3>
							<p>Get a refund today if delivery is unsatisfactory</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

	<div className="abt-section mb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="abt-bg">
						<img src="https://about.grubhub.com/wp-content/uploads/2022/03/header-about.png" />
					</div>
				</div>
				<div className="col-lg-6 col-md-12">
					<div className="abt-text">
						<p className="top-sub">Since 2022</p>
						<h2>We are <span className="orange-text">Fullstack Foodies</span></h2>
						<p>Restaurants sit at the heart of communities. It’s our mission to strengthen their roots, deepen their connections, and increase the positive impact they have on people and society.</p>
						<p>We help restaurants grow their businesses and experiment with new concepts. We provide drivers flexible opportunities to work and earn.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
    <div className="latest-news pt-150 pb-150">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="section-title">	
						<h3><span className="orange-text">Our</span> News</h3>
						<p>Check out the latest info about your favorite restaurants!</p>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						{/* <a href="single-news.html"><div className="latest-news-bg news-bg-1"></div></a> */}
						<div className="news-text-box">
							<h3><a href="single-news.html">Check out new restaurant openings in NYC!</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
							</p>
							<p className="excerpt">The Statue of Liberty, the Brooklyn Bridge, Broadway’s flashy signs around Times Square, and the rumbling 24-hour subway are all unmistakable landmarks of New York City. Just as essential to the Big Apple’s DNA are its restaurants and bars</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						{/* <a href="single-news.html"><div className="latest-news-bg news-bg-2"></div></a> */}
						<div className="news-text-box">
							<h3><a href="single-news.html">José Andrés Opens a Manhattan Cocktail Bar With Sweeping City Views.</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
							</p>
							<p className="excerpt">New York’s hottest dining duo, chef Chintan Pandya and restaurateur Roni Mazumdar of acclaimed restaurants Dhamaka and Adda, are continuing their expansion blitz with the highly anticipated reboot of Lower East Side mainstay Masalawala, now reimagined as a restaurant and retail shop in Brooklyn.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
			<div className="col-lg-4 col-md-6">
					<div className="single-latest-news">
						{/* <a href="single-news.html"><div className="latest-news-bg news-bg-2"></div></a> */}
						<div className="news-text-box">
							<h3><a href="single-news.html">Dhamaka Team Expands Its Indian Restaurant Empire to Brooklyn.</a></h3>
							<p className="blog-meta">
								<span className="author"><i className="fas fa-user"></i> Admin</span>
							</p>
							<p className="excerpt">New York’s hottest dining duo, chef Chintan Pandya and restaurateur Roni Mazumdar of acclaimed restaurants Dhamaka and Adda, are continuing their expansion blitz with the highly anticipated reboot of Lower East Side mainstay Masalawala, now reimagined as a restaurant and retail shop in Brooklyn.</p>
							<a href="single-news.html" className="read-more-btn">read more <i className="fas fa-angle-right"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-12 text-center">
					<a href="news.html" className="boxed-btn">More News</a>
				</div>
			</div>
		</div>
	</div>
	</div>
  );
};

export default LandingPage;
