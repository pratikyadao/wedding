/**
 * WEDDING CONFIGURATION DATA
 * ==========================
 */

export const weddingConfig = {
  // -----------------------------------------------------
  // 1. COUPLE INFORMATION
  // -----------------------------------------------------
  couple: {
    groomName: "Shantanu Sawant",
    brideName: "Diptiksha Tapase",
    groomFullName: "Shantanu Sunil Sawant",
    brideFullName: "Diptiksha Harish Tapase",
  },

  familyNames: "The Tapase & Sawant Families",
  
  welcomeMessage: "With the blessings of our families and the grace of the Almighty, we joyfully invite you to be a part of our wedding celebrations. As two families come together and two hearts begin a beautiful journey of togetherness, your presence and blessings will make our special moments truly memorable. Join us as we celebrate love, laughter, traditions, and the beginning of our forever. We look forward to celebrating this beautiful occasion with you. With love and warm regards, Dipti & Shantanu",

  // -----------------------------------------------------
  // 2. MAIN WEDDING DETAILS
  // -----------------------------------------------------
  wedding: {
    weddingDate: "December 28, 2026",
    weddingTime: "11:00 AM",
    targetDateISO: "2026-12-28T11:00:00+05:30", // Strict ISO format for accurate countdown
    weddingVenue: "Dhawan Celebrations",
    venueAddress: "Gorewada Ring Road, Nagpur, Maharashtra 440013",
    googleMapsUrl: "https://maps.google.com/?q=Dhawan+Celebrations+Gorewada+Ring+Road+Nagpur",
  },

  // -----------------------------------------------------
  // 3. SCHEDULE OF EVENTS
  // -----------------------------------------------------
  events: {
    carnival: {
      eventName: "Carnival & Flower Haldi",
      date: "December 27, 2026",
      time: "12:00 PM",
      venue: "Dhawan Celebrations", // Assumed same venue, but user left address blank. Using main venue.
      description: "Let the celebrations begin! A joyful carnival filled with exciting games, laughter, colors, and our beautiful Flower Haldi ceremony. Come celebrate, play, and make unforgettable memories with us!",
      icon: "Sun", 
    },
    sangeet: {
      eventName: "Sangeet",
      date: "December 27, 2026",
      time: "7:00 PM",
      venue: "Dhawan Celebrations",
      description: "An evening of music, dance, laughter, and unforgettable celebrations! Join us as our families come together for a night filled with lively performances, joyful beats, and cherished moments. Let’s dance, sing, and celebrate the beautiful beginning of our forever together.",
      icon: "Music",
    },
    wedding: {
      eventName: "Wedding",
      date: "December 28, 2026",
      time: "11:00 AM",
      venue: "Dhawan Celebrations",
      description: "The moment we’ve been waiting for has finally arrived! With the blessings of our families and the love of those who mean the most to us, we invite you to join us as we begin our beautiful journey of togetherness. Come celebrate the sacred union of two hearts, surrounded by love, laughter, traditions, and cherished moments. Your presence and blessings will make our special day truly unforgettable.",
      icon: "Heart",
    },
    reception: {
      eventName: "Reception",
      date: "December 28, 2026",
      time: "7:00 PM",
      venue: "Dhawan Celebrations",
      description: "The celebrations continue with an evening filled with love, laughter, and togetherness. Join us as we come together to celebrate the newlyweds and the beautiful journey that lies ahead. Let’s raise a toast to love, share wonderful moments, and make this evening a cherished memory for everyone. Your presence will make our celebration complete.",
      icon: "Wine",
    },
  },

  // -----------------------------------------------------
  // 4. COUPLE'S STORY
  // -----------------------------------------------------
  // User did not provide a story, so this is disabled.
  coupleStory: [],

  // -----------------------------------------------------
  // 5. FAMILY BLESSINGS
  // -----------------------------------------------------
  families: {
    brideSide: {
      title: "Bride's Family",
      parents: [
        { relation: "Proud Parents", names: "Mr. Harish Tapase & Mrs. Yogita Tapase" }
      ],
    },
    groomSide: {
      title: "Groom's Family",
      parents: [
        { relation: "Proud Parents", names: "Mr. Sunil Sawant & Mrs. Nilima Sawant" }
      ],
    }
  },

  // -----------------------------------------------------
  // 6. PHOTO GALLERY
  // -----------------------------------------------------
  gallery: [
    { url: "/couple-04.jpg", caption: "Perfect match" },
    { url: "/couple-05.jpg", caption: "Joyful moments" },
    { url: "/couple-01.jpg", caption: "Our adventure begins" },
    { url: "/gallery-01.jpg", caption: "Beautiful memories" },
    { url: "/gallery-02.jpg", caption: "Together forever" },
    { url: "/gallery-03.jpg", caption: "Cherished times" },
    { url: "/gallery-04.jpg", caption: "Smiles and laughter" },
    { url: "/gallery-05.jpg", caption: "Precious moments" },
    { url: "/gallery-06.jpg", caption: "Endless love" },
    { url: "/gallery-07.jpg", caption: "A beautiful day" },
    { url: "/gallery-08.jpg", caption: "Making memories" },
    { url: "/gallery-09.jpg", caption: "Love is in the air" },
    { url: "/gallery-10.jpg", caption: "Togetherness" },
    { url: "/gallery-11.jpg", caption: "A walk to remember" },
    { url: "/gallery-12.jpg", caption: "Happy times" },
    { url: "/gallery-13.jpg", caption: "Pure joy" },
    { url: "/gallery-14.jpg", caption: "Perfectly imperfect" },
    { url: "/gallery-15.jpg", caption: "To infinity" },
    { url: "/gallery-16.jpg", caption: "Soulmates" },
    { url: "/gallery-17.jpg", caption: "Candid moments" },
    { url: "/gallery-18.jpg", caption: "Love and light" },
    { url: "/gallery-19.jpg", caption: "Our story continues" },
  ],

  // -----------------------------------------------------
  // 7. RSVP & CONTACT INFORMATION
  // -----------------------------------------------------
  rsvp: {
    enabled: false,
    deadline: "",
    message: "",
  },

  contactNumbers: {
    groomSide: "",
    brideSide: "",
  },

  // -----------------------------------------------------
  // 8. AUDIO / BACKGROUND MUSIC
  // -----------------------------------------------------
  audio: {
    musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
  },

  // -----------------------------------------------------
  // 9. SOCIAL SHARING
  // -----------------------------------------------------
  socialSharing: {
    hashtag: "#DiptiWedsShantanu",
    text: "Join us in celebrating the wedding of Diptiksha and Shantanu!",
    url: "https://our-wedding-invite.vercel.app", 
  },
};
