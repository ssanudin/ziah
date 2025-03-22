# ziah

The Wedding of Sanudin and Nurfauziah

## Description

A simple and heartfelt wedding website created to share the joy of Sanudin and Nurfauziah's special day. The site includes essential features to keep guests informed and engaged: Events, Story, Photo Gallery, and Wishes.

Designed with simplicity and warmth, this website ensures a seamless experience for guests to celebrate and connect with the couple on their big day.

## Key Features

- Events: Clear details about the wedding date, time, and venue, accompanied by an interactive map for easy navigation.
- Story: : A touching timeline of how the couple met, their journey together, and the moments that led to their wedding.
- Photo Gallery: A collection of cherished photos showcasing their love story and memorable moments.
- Wishes: A dedicated form for guests to send heartfelt messages and blessings to the couple.

## Installation Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/ssanudin/ziah
```

2. Navigate to the project directory:

```bash
cd ziah
```

3. Open `index.html` in your browser to view the website.

## Usage

Once set up, you can navigate through the website to view event details, wishes, and browse the photo gallery. The backend server handles message submissions and retrieval using Notion integration.

## Backend server

This setup uses a Notion API to store and retrieve data. To use the backend server, you'll need:

- Create a Notion account and set up a database for storing wedding wishes.
- Install the Notion API client library for your preferred programming language.
- Configure the API client to interact with your Notion database.
- Update the `server.js` file to use your Notion API credentials and database ID.
- Run the server using `node server.js` to enable backend functionality.
- Make sure to handle CORS and security considerations when integrating the Notion API with your frontend.
- Test the backend server to ensure it's working correctly.
- Update the `js/main.js` file to include the Notion API endpoint for submitting and retrieving wishes

You can clone the repository and follow the instructions to set up the project locally. Make sure to update the `server.js` file with your Notion API credentials and database ID.

Backend repo: [notion-integrations](https://github.com/ssanudin/notion-integrations)
