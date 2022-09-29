import React from 'react'

export const Footer = () => {
  return (
    <div className="footer-area">
		<div className="container">
			<div className='row'>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box about-widget">
						<h2 className="widget-title">About us</h2>
						<p>Fullstack Foodies is simply the easiest way to order food for delivery or takeout. Whatever you’re in the mood for, wherever you’re in the mood for it, you’ve got it. No menus, no phone calls, no repeating yourself...</p>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box get-in-touch">
						<h2 className="widget-title">Get in Touch</h2>
						<ul>
							<li>New York, New York.</li>
							<li>support@fullstackfoodies.com</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box pages">
						<h2 className="widget-title">Pages</h2>
						<ul>
							<li>Home</li>
							<li>Restaurants</li>
							<li>Order</li>
							<li>Nearby</li>
							<li>Contact</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6">
					<div className="footer-box subscribe">
						<h2 className="widget-title">Subscribe</h2>
						<p>Subscribe to our mailing list to get the latest updates.</p>
						<form action="index.html">
							<input type="email" placeholder="Email"/>
							<button type="submit"><i className="fas fa-paper-plane"></i></button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
