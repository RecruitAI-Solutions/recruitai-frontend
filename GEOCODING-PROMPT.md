## Feature: Location Search & Geocoding Integration

We are integrating a Geocoding API to enable intelligent location search and structured location selection across the application.

---

## 🎯 Core Purpose

* Convert user input text into structured location data
* Provide high-accuracy location suggestions
* Retrieve latitude and longitude for location-based features
* Normalize address data for backend processing

---

## 🔌 API Endpoints

### 1. Search Location

**GET** `/api/v1/geocoding/search`

#### Query Params:

* `text` (string, required): search keyword
* `limit` (int, optional): number of results
* `lat` (double, optional): user latitude (for distance sorting)
* `lng` (double, optional): user longitude
* `cityId` (string, optional): filter by city
* `wardId` (string, optional): filter by ward
* `displayType` (int, optional): address format (see enum below)

---

### 2. Get Location Detail

**GET** `/api/v1/geocoding/place/{refId}`

* Input: `refId`
* Output: full location detail

---

### 3. Reverse Geocoding

**GET** `/api/v1/geocoding/reverse`

#### Query Params:

* `lat` (double, required)
* `lng` (double, required)
* `radius` (int, optional)

---

## 📦 API Response Structure

```json
{
  "success": true,
  "message": "string",
  "data": [
    {
      "refId": "string",
      "fullAddress": "string",
      "display": "string",
      "location": {
        "lat": 0,
        "lng": 0
      },
      "distance": 0,
      "boundaries": [
        {
          "type": 0,
          "name": "string",
          "prefix": "string",
          "code": "string"
        }
      ],
      "formats": {
        "new": {
          "address": "string",
          "boundaries": []
        },
        "old": {
          "address": "string",
          "boundaries": []
        }
      }
    }
  ]
}
```

---

## 🧠 ENUMS

### 1. DisplayType (Address Format)

| Value | Name    | Description                              |
| ----- | ------- | ---------------------------------------- |
| 1     | NewOnly | Only new format (Ward → City)            |
| 2     | OldOnly | Only old format (Ward → District → City) |
| 6     | Both    | Return both formats (default)            |

---

### 2. BoundaryType (Administrative Levels)

| Value | Name     | Description     |
| ----- | -------- | --------------- |
| 0     | Province | City / Province |
| 1     | District | District / Town |
| 2     | Ward     | Ward / Commune  |

---

## 🧩 Frontend Responsibilities

### 1. LocationInput Component

* Debounced input (300ms)
* Suggestion dropdown
* Click outside to close
* Prevent duplicate selection
* Display selected location text
* Return `refId` on selection

---

### 2. State Management

* Use React Query for:

  * caching
  * deduplication
  * request cancellation
* Use debounce to reduce API calls

---

### 3. Data Handling Rules

* ❌ Do NOT store raw text location
* ✅ Always store `refId`
* ✅ Display `display` or `formats.new.address`

---

## 📌 Data Flow

```text
User input → debounce → API search → suggestions
→ select location → store refId → submit form
```

---

## 🎯 Use Cases

### 1. Job Creation (Recruiter)

* Select job location via LocationInput
* Store `locationRefId`

### 2. Job Filtering (Candidate)

* Filter jobs by location
* Optional: use lat/lng for distance-based filtering

### 3. Reverse Geocoding (Optional)

* Auto-detect user location
* Convert lat/lng → address

---

## ⚠️ Important Rules

* Always use `refId` for backend communication
* Avoid duplicate API calls (debounce + React Query)
* Handle empty / loading states
* Filter duplicate suggestions in UI
* Do not trust raw user input

---

## 🚀 Future Enhancements

* Auto-detect user location (browser geolocation)
* Map integration (Google Maps / Mapbox)
* Distance-based job recommendations
* Highlight matched keywords in suggestions
* Keyboard navigation (↑ ↓ Enter)

---

## ✅ Acceptance Criteria

* User can search and select location via suggestions
* Selected location returns valid `refId`
* Job form submits correct structured location
* No duplicate API calls
* Smooth UX (no flicker, no stale data)
* Works for both recruiter and candidate flows
