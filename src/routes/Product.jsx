import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Backdrop } from "@mui/material";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import Navbar from "../components/Navbar";
import { AddCircle, Star, SubtractCircle } from "../components/Icons";
import "../styles/Product.css";
import ReviewItem from "../components/product/ReviewItem";
import Footer from "../components/Footer";
import Facilities from "../components/product/Facilities";

export default function Product() {
  const { rid } = useParams();
  const [imageOpen, setImageOpen] = useState([false, ""]);
  const [guestNumber, setGuestNumber] = useState(1);
  const [room, setRoom] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    async function getRoomInfo() {
      try {
        const res = await axios.get(`http://localhost:8080/api/rooms/getroombyid=${rid}`);
        if (res.data.roomOwner) {
          setRoom(res.data);
          const ownerDataRes = await axios.get(`http://localhost:8080/api/owners/getownerbyid=${res.data.roomOwner}`);
          setOwner(ownerDataRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getRoomInfo();
  }, [rid]);

  return (
    <main>
      <Navbar />
      <section className="product-nav-section">
        <div id="heroBG" className="hero-bg search-hero-bg"></div>
      </section>
      <section className="product-hero-section">
        <h1>{room?.roomName}</h1>
        <div className="product-hero-img">
          <div
            onClick={() => setImageOpen([true, "https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200"])}
            className="product-main-img"
            style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}
          ></div>
          <Backdrop className="product-backdrop" sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={imageOpen[0]} onClick={() => setImageOpen((prev) => prev.with(0, false))}>
            <img className="product-zoomed-img" src={imageOpen[1]} alt="room" />
          </Backdrop>
          <div className="product-other-img">
            <div
              onClick={() => setImageOpen([true, "https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200"])}
              style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}
            ></div>
            <div
              onClick={() => setImageOpen([true, "https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200"])}
              style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}
            ></div>
          </div>
          <div className="product-other-img">
            <div
              onClick={() => setImageOpen([true, "https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200"])}
              style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}
            ></div>
            <div
              onClick={() => setImageOpen([true, "https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200"])}
              style={{ backgroundImage: "url('https://a0.muscache.com/im/pictures/7fa55ecc-3c87-4347-a0d0-6c8485a0b632.jpg?im_w=1200')" }}
            ></div>
          </div>
        </div>
      </section>
      <section className="product-details-section">
        <section className="product-details-container">
          <div className="product-heading">
            <div>
              <h2>Room in {room?.roomAddress}</h2>
              <p>
                {room?.roomRooms} Bedroom{room?.roomRooms > 1 && "s"}. {room?.roomBathroom} Bathroom{room?.roomBathroom > 1 && "s"}.
              </p>
            </div>
            <div className="product-heading-rating">
              <Star />
              <p>
                <NumericFormat displayType="text" value={room?.roomRating} decimalScale={1} fixedDecimalScale />
              </p>
            </div>
          </div>
          <div className="product-owner-details">
            <Avatar alt={owner?.ownerName} src="/static/images/avatar/1.jpg" />
            <div>
              <h3>{owner?.ownerName}</h3>
              <p>
                <NumericFormat displayType="text" value={owner?.ownerRating} decimalScale={2} fixedDecimalScale /> Rating
              </p>
            </div>
          </div>
          <Facilities rid={rid} />
          <div className="product-about">
            <h3>About this place</h3>
            <p>
              {room?.roomDescription}
              Cozy room, fully stocked in a bungalow with garden view. Ideal ONLY for single travelers seeking safe and comfortable short/long-term stay. Green view, well designed, warm yet bright
              space, includes attached bath, basic pantry, clean linen, A/C, high-speed WiFi. Key to your room & the main door provided for convenience.
            </p>
          </div>
        </section>
        <section className="product-reserve-container">
          <div className="reserve">
            <h3>
              ₹<NumericFormat className="reserve-cost" displayType="text" value={room?.roomPrice} thousandsGroupStyle="lakh" thousandSeparator="," /> <span>monthly</span>
            </h3>
            <div>
              <p>
                {guestNumber} Guest{guestNumber > 1 && "s"}
              </p>
              <div>
                <SubtractCircle onClick={() => setGuestNumber((prev) => (prev > 1 ? prev - 1 : prev))} />
                <AddCircle onClick={() => setGuestNumber((prev) => (prev < room?.roomGuests ? prev + 1 : prev))} />
              </div>
            </div>
            <button className="btn">Reserve</button>
          </div>
        </section>
      </section>
      <section className="product-review-section">
        <h1>Guest reviews</h1>
        <div>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </section>
      <Footer />
    </main>
  );
}
