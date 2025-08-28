import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <header className="hero bg-base-200 min-h-120">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Latest Smartphones, Best Prices</h1>
          <p className="py-6">
          Discover the latest smartphones and mobile accessories at unbeatable prices. From flagship models to budget-friendly options, we bring you trusted brands, genuine products, and reliable service all in one place
          </p>
          <Link href="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
