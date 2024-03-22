// EventForm.tsx
"use client";

import React, { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
    imageLink: "",
    participant: "", // For the dropdown menu
    discountPrice: "",
    fullPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your submit logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Event Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Event Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imageLink">Image Link:</label>
        <input
          type="url"
          id="imageLink"
          name="imageLink"
          value={formData.imageLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="participant">NFT Gating:</label>
        <select
          id="participant"
          name="participant"
          value={formData.participant}
          onChange={handleChange}
          required
        >
          <option value="">NFT</option>
          <option value="Participant 1">RiBT</option>
          <option value="Participant 2">Based Fellas</option>
          <option value="Participant 3">Basepaint</option>
        </select>
      </div>
      <div>
        <label htmlFor="discountPrice">NFT Holder Price:</label>
        <input
          type="number"
          id="discountPrice"
          name="discountPrice"
          value={formData.discountPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="fullPrice">Ticket Price:</label>
        <input
          type="number"
          id="fullPrice"
          name="fullPrice"
          value={formData.fullPrice}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Launch Event</button>
    </form>
  );
};

export default EventForm;
