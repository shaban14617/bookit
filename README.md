# Bookit

**Bookit** is an hourly room booking application where users can browse, book, and manage rooms. Each room comes with unique features like amenities, square footage, pricing, and an image, providing users with a detailed view of available spaces. Users can add new rooms, book available rooms, and track their bookings easily.

## Features

- **Room Listings**: Browse rooms with specific details, including amenities, size, price per hour, and images.
- **Room Management**: Add new rooms with custom features to the platform.
- **Bookings**: Book rooms for specific times, with easy management of your booking history.
- **User Dashboard**: View and manage your added rooms and past bookings.

## Tech Stack

- **Frontend**: Next.js
- **Backend & Database**: Appwrite
- **Image Storage**: Appwrite Buckets

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shaban14617/bookit.git
   cd bookit
2. **Clone the repository**:
   ```bash
   Set up Appwrite:

- Create an Appwrite account.
Set up your database and add collections for User, Room, and Booking with the necessary attributes.

2. **Configure environment variables**:
   ```bash
   
- Add your Appwrite endpoint and project ID in .env as per Appwrite configuration.

  ## Usage Instructions
  
1.Login: Create an account or log in to access the application.
2.Browse Rooms: Explore available rooms with details about amenities, size, and hourly price.
3.Add a Room: Use the “Add Room” feature to create new listings with images and detailed specifications.
4.Book a Room: Reserve a room for any available time.
5.Manage Bookings: View and manage your bookings and added rooms in the user dashboard.
