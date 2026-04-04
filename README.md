<div align="center">
  <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop" alt="Aviation Project Banner" width="100%" style="border-radius:12px; margin-bottom:20px;"/>
 

  # ✈️ Aviation Tracking & Aerodrome Dashboard 
  
  *A modern, sleek, and intuitive web solution for tracking live flights, exploring advanced airport data, and monitoring real-time weather.*
</div>

---

## 🚀 What Does This Project Do?

Welcome to the **Aviation Dashboard**! The aviation world is full of complex, raw data scattered across different networks. This project takes all that heavy, complicated information and turns it into a beautiful, easy-to-read dashboard. 

Here are the cool things you can do with it:

- 🌍 **Deep Airport Exploration:** Just type in an ICAO, IATA, or local code. Instantly get precise coordinates, elevation, timezone info, and detailed runway characteristics (like surface type, lighting, and exact foot length).
- 📡 **Interactive Live Maps:** No more guessing where the airport is. We use Leaflet to drop interactive pins on a beautiful map, bringing coordinates to life right on your screen.
- ⛅ **Real-Time Weather integration:** Aviation depends on the weather. Access accurate, location-aware METAR/weather reports before you "take off."
- 📊 **Beautiful Metrics:** Say goodbye to boring spreadsheets. We display the data using modern cards, badges, and clean layouts so you can find what you need in a glance.
- ⚡ **Lightning Fast & Smart:** We cache data intelligently. If you search for the same airport twice, the results load instantly without hitting the server again, saving you time and bandwidth.

This tool is a perfect companion for **aviation enthusiasts, data analysts, pilots,** and developers wanting to see how modern web tech handles serious data payload!

---

## 🛠️ The Tech Stack (What It's Made Of)

We didn't just want it to work well; we wanted it to feel incredibly premium. Here are the amazing 3rd-party libraries and tools powering this project:

<table>
  <tr>
    <td width="50%">
      <h3>💎 UI & Styling</h3>
      <ul>
        <li><b><a href="https://tailwindcss.com/">Tailwind CSS</a>:</b> For rapid, flexible, and flawless styling, including a gorgeous dark/light mode experience.</li>
        <li><b><a href="https://ui.shadcn.com/">Shadcn/UI</a>:</b> Bringing those beautiful, accessible, and modern components (like the interactive Cards, Badges, and clean Inputs).</li>
        <li><b><a href="https://lucide.dev/">Lucide React</a>:</b> Crisp, clean, and scalable icons that make the UI feel alive.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🌍 Maps & Visuals</h3>
      <ul>
        <li><b><a href="https://leafletjs.com/">Leaflet & React-Leaflet</a>:</b> A ridiculously lightweight and powerful mapping library. It renders the dark-themed base layers, interactive circles, and those informative popups (Runway info) without a sweat!</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📡 Data Fetching & State</h3>
      <ul>
        <li><b><a href="https://tanstack.com/query/latest">TanStack Query (React Query)</a>:</b> The absolute best way to manage API calls. It handles all our loading states (<code>isLoading</code>), error boundaries, and aggressively caches data to make the app feel incredibly snappy.</li>
        <li><b><a href="https://axios-http.com/">Axios</a>:</b> Our reliable HTTP client for talking safely to all the external aviation networks.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚙️ Core Framework</h3>
      <ul>
        <li><b><a href="https://react.dev/">React & TypeScript</a>:</b> Building a rock-solid, type-safe foundation. If something is broken, we catch it before it even crashes the browser.</li>
        <li><b><a href="https://reactrouter.com/">React Router</a>:</b> For buttery-smooth page transitions without full page reloads.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🔌 The APIs Powering the Data

Pulling data from the sky straight into the app! Here are the core APIs communicating behind the scenes:

- 🛩️ **[AeroDataBox API (RapidAPI)](https://rapidapi.com/aedbx-aedbx/api/aerodatabox/):** 
  *Endpoint:* `https://aerodatabox.p.rapidapi.com/`
  The absolute backbone of our airport searches. Provides detailed runway dimensions, airport metadata, and local codes.
  
- 🛰️ **[OpenSky Network API](https://opensky-network.org/apidoc/):** 
  *Endpoint:* `https://opensky-network.org/api`
  Used for live aircraft tracking. It fetches live state vectors, trajectories, and specific aircraft telemetry (using ICAO24 addresses).

- ⛅ **[OpenWeather API](https://openweathermap.org/api):** 
  *Endpoint:* `https://api.openweathermap.org/data/2.5/`
  Delivers dynamic, localized weather data (wind, temperature, visibility) tailored perfectly to our flight management boards.

---

## ✨ Visual & Architectural Conveniences

- **Graceful Error Handling:** If an API limit is reached or an airport doesn't exist, the UI won't crash. Instead, you get a clean, friendly red alert box explaining exactly what went wrong.
- **Micro-Animations:** Enjoy the smooth pulse of the "Loading..." data states and the subtle hover effects on our interactive map elements. 
- **Sound Effects:** A fun little easter egg! When you successfully initiate a search, an airplane flyby sound plays seamlessly in the background to immerse you in the aviation experience.

<br>
<div align="center">
  <i>Where modern web architecture meets a passion for the skies. 🛩️</i>
</div>
