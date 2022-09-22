const router = require('express').Router();
const { isLoggedIn } = require("./middleware");

module.exports = router;

const key = process.env.STRIPE_KEY || "sk_test_51LZy6BESE3LZBw3FGYxeLUkeN1xIPf4zPiJyzvOx3LCX5LWFNR8r1PNui5OloFVm5jKRvCjNCdQ6ybHVCTdbbLcu00XaCiGvVo";


const stripe = require("stripe")(key);
const YOUR_DOMAIN = process.env.HEROKU_DOMAIN || "http://localhost:8080";

router.post("/", isLoggedIn, async (req, res, next) => {
  try {

    const cart = await req.user.getCart()
    const lineItems = cart.lineItems;
    console.log(lineItems[0].dish.price);


    const session = await stripe.checkout.sessions.create({
      client_reference_id: cart.id,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart.lineItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.dish.name
            },
            unit_amount: parseInt(item.dish.price * 100),
          },
          quantity: item.quantity,
        };
      }),

      success_url: `${YOUR_DOMAIN}/#/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/#/cart?canceled=true`,
    });

    res.json(session.url);
  } catch (ex) {
    next(ex);
  }
});


router.get("/checkout-session", isLoggedIn, async (req, res, next) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session)
  } 
  catch (err) {
    next(err);
  }
});

