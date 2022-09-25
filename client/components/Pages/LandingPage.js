import React from "react";
import { Carousel } from "./Carousel";

export const LandingPage = () => {
  return (
    <div>

		<div className="breadcrumb-section breadcrumb-bg">
			<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
				<div className="breadcrumb-text">
					<p>Order your favorites</p>
					<h1>Food Delivery Service</h1>
				</div>
				</div>
			</div>
			</div>
      	</div>

      <div className="pt-24">
      <div className="hero-area hero-bg">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 offset-lg-2 text-center">
					<div className="hero-text">
						<div className="hero-text-tablecell">
							<img src="https://afar.brightspotcdn.com/dims4/default/3aa6f3c/2147483647/strip/true/crop/1440x720+0+0/resize/1440x720!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.amazonaws.com%2Fbrightspot%2F5f%2F8e%2F2d27f7aa47c58e210b626d30b59f%2Ffood-neighborhoods-01-lede-champys-chicken-chattanooga-new.jpg"
							/>
							<p className="subtitle">Really Good Food</p>
							<h1>Order Now</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
      </div>

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

	<Carousel />

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
    <div className="latest-news pt-40 pb-40">
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
					<br></br>
				</div>
			</div>
		</div>
	</div>
	</div>
  );
};

export default LandingPage;
