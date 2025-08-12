import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const name = localStorage.getItem("email") || "User";

  // const slides = [
  //   { id: 1, img: "/images/burger.jpg", title: "Delicious Burgers", desc: "Juicy, cheesy, and fresh." },
  //   { id: 2, img: "/images/pizza.jpg", title: "Hot Pizzas", desc: "Stone-baked perfection." },
  //   { id: 3, img: "/images/salad.jpg", title: "Healthy Salads", desc: "Fresh & crunchy goodness." },
  //   { id: 4, img: "/images/dessert.jpg", title: "Sweet Desserts", desc: "Treat yourself today." },
  //   { id: 5, img: "/images/drinks.jpg", title: "Refreshing Drinks", desc: "Cool down with style." }
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="dashboard-container">
      <h2 className="welcome">Welcome to User Dashboard</h2>
      <p className="hello">Hello, {name}</p>

      {/* Slider */}
      <div className="slider">
        <img src={slides[currentIndex].img} alt={slides[currentIndex].title} />
        <div className="slider-text">
          <h3>{slides[currentIndex].title}</h3>
          <p>{slides[currentIndex].desc}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="sections">
        {slides.map((slide) => (
          <div className="section-card" key={slide.id}>
            <img src={slide.img} alt={slide.title} />
            <h4>{slide.title}</h4>
            <p>{slide.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
